import Link from "next/link";
import { notFound } from "next/navigation";

import { logout } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

import { deleteRecipe } from "./actions";
type RecipeDetail = {
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

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipeId = Number(id);

  if (!Number.isFinite(recipeId)) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id,title,description,time,difficulty,calories,author,likes,tag,servings,ingredients,steps,user_id"
    )
    .eq("id", recipeId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      notFound();
    }
    throw new Error(`レシピの取得に失敗しました: ${error.message}`);
  }

  const recipe = data as RecipeDetail;

  if (!recipe) {
    notFound();
  }

  const ingredients =
    recipe.ingredients === null
      ? []
      : Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : recipe.ingredients
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

  const steps =
    recipe.steps === null
      ? []
      : Array.isArray(recipe.steps)
      ? recipe.steps
      : recipe.steps
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;
  const isOwner = user?.id && user.id === recipe.user_id;

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-stone-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-amber-300/40 blur-[120px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-rose-300/40 blur-[140px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                Recipe Detail
              </p>
              <h1 className="text-3xl font-semibold text-stone-900">
                {recipe.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-stone-200 bg-white/70 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur"
              >
                一覧に戻る
              </Link>
              {user ? (
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-stone-50 shadow-lg shadow-stone-900/20"
                  >
                    ログアウト
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-stone-50 shadow-lg shadow-stone-900/20"
                >
                  ログイン
                </Link>
              )}
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-stone-900/10 backdrop-blur">
              <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
                <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50">
                  {recipe.tag}
                </span>
                <span>調理時間 {recipe.time}</span>
                <span>難易度 {recipe.difficulty}</span>
                <span>{recipe.calories}</span>
              </div>
              <p className="text-base leading-7 text-stone-600">
                {recipe.description ?? "レシピの説明が未登録です。"}
              </p>
              <div className="rounded-2xl bg-stone-50 p-6">
                <p className="text-sm font-semibold text-stone-500">
                  このレシピについて
                </p>
                <div className="mt-3 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Author
                    </p>
                    <p className="font-semibold text-stone-900">
                      {recipe.author ?? "匿名"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Likes
                    </p>
                    <p className="font-semibold text-stone-900">
                      {recipe.likes ?? "0"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Servings
                    </p>
                    <p className="font-semibold text-stone-900">
                      {recipe.servings ?? "未設定"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Style
                    </p>
                    <p className="font-semibold text-stone-900">
                      シェフのおすすめ
                    </p>
                  </div>
                </div>
              </div>
              {isOwner ? (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
                  >
                    編集
                  </Link>
                  <form action={deleteRecipe}>
                    <input type="hidden" name="id" value={recipe.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                    >
                      削除
                    </button>
                  </form>
                </div>
              ) : null}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-stone-900/10 backdrop-blur">
                <h2 className="text-lg font-semibold text-stone-900">
                  材料
                </h2>
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {recipe.servings ?? "未設定"}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {ingredients.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-stone-200 bg-white px-4 py-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-stone-900/10 backdrop-blur">
                <h2 className="text-lg font-semibold text-stone-900">
                  作り方
                </h2>
                <ol className="mt-4 space-y-3 text-sm text-stone-700">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="rounded-xl border border-stone-200 bg-white px-4 py-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                        Step {index + 1}
                      </span>
                      <p className="mt-2 text-sm leading-6 text-stone-700">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
