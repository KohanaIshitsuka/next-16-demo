"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseClient } from "@/lib/supabase";

function splitLines(value: FormDataEntryValue | null): string[] {
  if (!value) {
    return [];
  }

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createRecipe(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    throw new Error("レシピ名は必須です。");
  }

  const payload = {
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    time: String(formData.get("time") ?? "").trim() || null,
    difficulty: String(formData.get("difficulty") ?? "").trim() || null,
    calories: String(formData.get("calories") ?? "").trim() || null,
    author: String(formData.get("author") ?? "").trim() || null,
    likes: String(formData.get("likes") ?? "").trim() || null,
    tag: String(formData.get("tag") ?? "").trim() || null,
    servings: String(formData.get("servings") ?? "").trim() || null,
    ingredients: splitLines(formData.get("ingredients")),
    steps: splitLines(formData.get("steps")),
  };

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("recipes")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`レシピの保存に失敗しました: ${error.message}`);
  }

  revalidatePath("/");
  redirect(`/recipes/${data.id}`);
}
