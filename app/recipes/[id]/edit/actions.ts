"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { createSupabaseActionClient } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

function splitLines(value: FormDataEntryValue | null): string[] {
  if (!value) {
    return [];
  }

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function uploadRecipeImage(
  file: File,
  supabase: SupabaseClient
) {
  const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `${randomUUID()}.${fileExtension}`;
  const filePath = `recipes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("recipes")
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`画像のアップロードに失敗しました: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("recipes").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function updateRecipe(formData: FormData) {
  const rawId = String(formData.get("id") ?? "");
  const recipeId = Number(rawId);

  if (!Number.isFinite(recipeId)) {
    notFound();
  }

  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    throw new Error("レシピ名は必須です。");
  }

  const supabase = await createSupabaseActionClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    redirect("/login");
  }

  const { data: recipe, error: fetchError } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  if (fetchError || !recipe) {
    notFound();
  }

  if (recipe.user_id !== authData.user.id) {
    notFound();
  }

  const imageFile = formData.get("image_file");
  const imageUrl =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadRecipeImage(imageFile, supabase)
      : null;

  const payload: Record<string, string | string[] | null> = {
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    time: String(formData.get("time") ?? "").trim() || null,
    difficulty: String(formData.get("difficulty") ?? "").trim() || null,
    calories: String(formData.get("calories") ?? "").trim() || null,
    author: String(formData.get("author") ?? "").trim() || null,
    tag: String(formData.get("tag") ?? "").trim() || null,
    servings: String(formData.get("servings") ?? "").trim() || null,
    ingredients: splitLines(formData.get("ingredients")),
    steps: splitLines(formData.get("steps")),
  };

  if (imageUrl) {
    payload.image_url = imageUrl;
  }

  const { error: updateError } = await supabase
    .from("recipes")
    .update(payload)
    .eq("id", recipeId);

  if (updateError) {
    throw new Error(`レシピの更新に失敗しました: ${updateError.message}`);
  }

  revalidatePath("/");
  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${recipeId}`);
}
