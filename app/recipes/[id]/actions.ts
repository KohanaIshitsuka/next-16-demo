"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { createSupabaseActionClient } from "@/lib/supabase";

export async function deleteRecipe(formData: FormData) {
  const rawId = String(formData.get("id") ?? "");
  const recipeId = Number(rawId);

  if (!Number.isFinite(recipeId)) {
    notFound();
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

  const { error: deleteError } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);

  if (deleteError) {
    throw new Error(`レシピの削除に失敗しました: ${deleteError.message}`);
  }

  revalidatePath("/");
  redirect("/");
}
