import Link from "next/link";
import { notFound } from "next/navigation";

import { logout } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

import { deleteRecipe, likeRecipe } from "./actions";
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
  image_url: string | null;
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
      "id,title,description,time,difficulty,calories,author,likes,tag,image_url,servings,ingredients,steps,user_id"
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

  const imageUrl = recipe.image_url?.trim();
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
  const likesCount = Number(recipe.likes ?? 0);
  const displayLikes = Number.isFinite(likesCount) ? likesCount : 0;

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-zinc-800/40 blur-[160px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-zinc-700/40 blur-[180px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                Recipe Detail
              </p>
              <h1 className="text-3xl font-semibold text-zinc-100">
                {recipe.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-zinc-700 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 shadow-sm backdrop-blur"
              >
                一覧に戻る
              </Link>
              {user ? (
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg shadow-black/30"
                  >
                    ログアウト
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg shadow-black/30"
                >
                  ログイン
                </Link>
              )}
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/40 backdrop-blur">
              <div
                className="h-48 w-full rounded-2xl bg-[radial-gradient(circle_at_top,_#3a3a42,_#0b0b0d_65%)] bg-cover bg-center"
                style={
                  imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined
                }
              />
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                  {recipe.tag}
                </span>
                <span>調理時間 {recipe.time}</span>
                <span>難易度 {recipe.difficulty}</span>
                <span>{recipe.calories}</span>
              </div>
              <p className="text-base leading-7 text-zinc-400">
                {recipe.description ?? "レシピの説明が未登録です。"}
              </p>
              <div className="rounded-2xl bg-black/70 p-6">
                <p className="text-sm font-semibold text-zinc-400">
                  このレシピについて
                </p>
                <div className="mt-3 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Author
                    </p>
                    <p className="font-semibold text-zinc-100">
                      {recipe.author ?? "匿名"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Likes
                    </p>
                    <p className="font-semibold text-zinc-100">
                      {displayLikes}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Servings
                    </p>
                    <p className="font-semibold text-zinc-100">
                      {recipe.servings ?? "未設定"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Style
                    </p>
                    <p className="font-semibold text-zinc-100">
                      シェフのおすすめ
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {isOwner ? (
                  <>
                    <Link
                      href={`/recipes/${recipe.id}/edit`}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100"
                    >
                      編集
                    </Link>
                    <form action={deleteRecipe}>
                      <input type="hidden" name="id" value={recipe.id} />
                      <button
                        type="submit"
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100"
                      >
                        削除
                      </button>
                    </form>
                  </>
                ) : (
                  <form action={likeRecipe}>
                    <input type="hidden" name="id" value={recipe.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100"
                    >
                      いいねする
                    </button>
                  </form>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/40 backdrop-blur">
                <h2 className="text-lg font-semibold text-zinc-100">
                  材料
                </h2>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  {recipe.servings ?? "未設定"}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {ingredients.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/40 backdrop-blur">
                <h2 className="text-lg font-semibold text-zinc-100">
                  作り方
                </h2>
                <ol className="mt-4 space-y-3 text-sm text-zinc-300">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="rounded-xl border border-zinc-700 bg-black/50 px-4 py-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        Step {index + 1}
                      </span>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
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
