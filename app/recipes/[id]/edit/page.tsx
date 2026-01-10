import { notFound, redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase";

import { updateRecipe } from "./actions";

type RecipeEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type RecipeEditData = {
  id: number;
  title: string;
  description: string | null;
  time: string | null;
  difficulty: string | null;
  calories: string | null;
  author: string | null;
  likes: string | null;
  tag: string | null;
  servings: string | null;
  ingredients: string[] | string | null;
  steps: string[] | string | null;
  user_id: string | null;
};

function joinLines(value: string[] | string | null) {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join("\n") : value;
}

export default async function RecipeEditPage({ params }: RecipeEditPageProps) {
  const { id } = await params;
  const recipeId = Number(id);

  if (!Number.isFinite(recipeId)) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id,title,description,time,difficulty,calories,author,likes,tag,servings,ingredients,steps,user_id"
    )
    .eq("id", recipeId)
    .single();

  if (error || !data) {
    notFound();
  }

  const recipe = data as RecipeEditData;

  if (recipe.user_id !== authData.user.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-stone-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-amber-300/40 blur-[120px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-rose-300/40 blur-[140px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                Edit Recipe
              </p>
              <h1 className="text-3xl font-semibold text-stone-900">
                レシピを編集する
              </h1>
            </div>
            <a
              href={`/recipes/${recipe.id}`}
              className="rounded-full border border-stone-200 bg-white/70 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur"
            >
              詳細に戻る
            </a>
          </header>

          <form
            action={updateRecipe}
            className="space-y-6 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-stone-900/10 backdrop-blur"
          >
            <input type="hidden" name="id" value={recipe.id} />
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-stone-700">
                レシピ名
                <input
                  name="title"
                  required
                  defaultValue={recipe.title}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                タグ
                <input
                  name="tag"
                  defaultValue={recipe.tag ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                調理時間
                <input
                  name="time"
                  defaultValue={recipe.time ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                難易度
                <input
                  name="difficulty"
                  defaultValue={recipe.difficulty ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                カロリー
                <input
                  name="calories"
                  defaultValue={recipe.calories ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                分量
                <input
                  name="servings"
                  defaultValue={recipe.servings ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                作成者
                <input
                  name="author"
                  defaultValue={recipe.author ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                Like 数
                <input
                  name="likes"
                  defaultValue={recipe.likes ?? ""}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-stone-700">
              説明
              <textarea
                name="description"
                rows={3}
                defaultValue={recipe.description ?? ""}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-stone-700">
                材料（1行に1つ）
                <textarea
                  name="ingredients"
                  rows={6}
                  defaultValue={joinLines(recipe.ingredients)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-stone-700">
                作り方（1行に1つ）
                <textarea
                  name="steps"
                  rows={6}
                  defaultValue={joinLines(recipe.steps)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-widest text-stone-400">
                変更内容を保存します
              </p>
              <button
                type="submit"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 shadow-lg shadow-stone-900/20"
              >
                変更を保存
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
