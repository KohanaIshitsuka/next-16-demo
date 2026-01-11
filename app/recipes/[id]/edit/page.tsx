import Link from "next/link";
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
  image_url: string | null;
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
      "id,title,description,image_url,time,difficulty,calories,author,likes,tag,servings,ingredients,steps,user_id"
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
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-zinc-800/40 blur-[160px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-zinc-700/40 blur-[180px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                Edit Recipe
              </p>
              <h1 className="text-3xl font-semibold text-zinc-100">
                レシピを編集する
              </h1>
            </div>
            <Link
              href={`/recipes/${recipe.id}`}
              className="rounded-full border border-zinc-700 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 shadow-sm backdrop-blur"
            >
              詳細に戻る
            </Link>
          </header>

          <form
            action={updateRecipe}
            encType="multipart/form-data"
            className="space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/40 backdrop-blur"
          >
            <input type="hidden" name="id" value={recipe.id} />
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                レシピ名
                <input
                  name="title"
                  required
                  defaultValue={recipe.title}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                画像ファイル
                <input
                  type="file"
                  name="image_file"
                  accept="image/*"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black focus:border-white focus:outline-none"
                />
                <span className="block text-xs text-zinc-500">
                  画像を差し替える場合のみ選択してください。
                </span>
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                タグ
                <input
                  name="tag"
                  defaultValue={recipe.tag ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                調理時間
                <input
                  name="time"
                  defaultValue={recipe.time ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                難易度
                <input
                  name="difficulty"
                  defaultValue={recipe.difficulty ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                カロリー
                <input
                  name="calories"
                  defaultValue={recipe.calories ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                分量
                <input
                  name="servings"
                  defaultValue={recipe.servings ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                作成者
                <input
                  name="author"
                  defaultValue={recipe.author ?? ""}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-zinc-200">
              説明
              <textarea
                name="description"
                rows={3}
                defaultValue={recipe.description ?? ""}
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                材料（1行に1つ）
                <textarea
                  name="ingredients"
                  rows={6}
                  defaultValue={joinLines(recipe.ingredients)}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                作り方（1行に1つ）
                <textarea
                  name="steps"
                  rows={6}
                  defaultValue={joinLines(recipe.steps)}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                変更内容を保存します
              </p>
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/30"
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
