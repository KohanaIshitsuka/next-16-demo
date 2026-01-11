import Link from "next/link";

import { logout } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

type RecipeSummary = {
  id: number;
  title: string;
  description: string;
  time: string | null;
  difficulty: string | null;
  calories: string | null;
  author: string | null;
  likes: string | number | null;
  tag: string | null;
  image_url: string | null;
};

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id,title,description,time,difficulty,calories,author,likes,tag,image_url"
    )
    .order("id");

  if (error) {
    throw new Error(`レシピの取得に失敗しました: ${error.message}`);
  }

  const recipes = (data ?? []) as RecipeSummary[];
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-zinc-800/40 blur-[160px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-zinc-700/40 blur-[180px]" />
          <div className="absolute left-1/3 top-[420px] h-[280px] w-[280px] rounded-full bg-zinc-900/50 blur-[160px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-black">
                食
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                  Recipe Atelier
                </p>
                <h1 className="text-2xl font-semibold text-zinc-100">
                  レシピアトリエ
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/recipes/new"
                    className="rounded-full border border-zinc-700/80 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 backdrop-blur"
                  >
                    レシピを登録
                  </Link>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg shadow-black/30"
                    >
                      ログアウト
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-zinc-700/80 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 backdrop-blur"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg shadow-black/30"
                  >
                    新規登録
                  </Link>
                </>
              )}
            </div>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-8">
              <div className="space-y-5">
                <p className="text-sm font-medium text-zinc-400">
                  今日のおすすめ・旬の食材・人気レシピをまとめて
                </p>
                <h2 className="text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl">
                  気分と食材から探せる、
                  <br />
                  洗練された料理レシピのギャラリー
                </h2>
                <p className="max-w-xl text-base leading-7 text-zinc-400">
                  暮らしを豊かにする、ちょっと頑張りたい日のレシピ。
                  旬の食材を使って、心も身体も元気に。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "簡単 15分以内",
                  "季節のおすすめ",
                  "スープ・鍋",
                  "おもてなし",
                  "作り置き",
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 shadow-sm backdrop-blur"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <aside className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-black/40 backdrop-blur">
              <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-black">
                FEATURE
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-zinc-400">旬の食材特集</p>
                <h3 className="text-2xl font-semibold text-zinc-100">
                  冬大根の甘みを活かす、体を温める献立
                </h3>
                <p className="text-sm leading-6 text-zinc-400">
                  みずみずしい大根を主役に、香りだしと合わせた 3 品を紹介。
                  煮物・スープ・浅漬けで旨味を引き出します。
                </p>
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-zinc-200">
                  <div className="flex items-center justify-between">
                    <span>旬の食材</span>
                    <span className="font-semibold text-zinc-100">大根</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>おすすめレシピ</span>
                    <span className="font-semibold text-zinc-100">
                      出汁香る大根と鶏の炊き合わせ
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>所要時間</span>
                    <span className="font-semibold text-zinc-100">合計 45 分</span>
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-400">
                  最新のレシピコレクション
                </p>
                <h3 className="text-2xl font-semibold text-zinc-100">
                  料理レシピをチェック
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm text-zinc-300 shadow-sm backdrop-blur">
                <span className="text-zinc-500">検索</span>
                <span className="font-medium text-zinc-100">
                  キーワードを入力
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recipes.map((recipe) => {
                const imageUrl = recipe.image_url?.trim();
                const imageClass = imageUrl
                  ? "h-32 w-full rounded-2xl bg-zinc-950/60 bg-cover bg-center p-4"
                  : "h-32 w-full rounded-2xl bg-[radial-gradient(circle_at_top,_#3a3a42,_#0b0b0d_65%)] p-4";

                return (
                  <article
                    key={recipe.id}
                    className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                  >
                  <div className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    {recipe.tag}
                  </div>
                  <div className="space-y-4">
                    <div
                      className={imageClass}
                      style={
                        imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined
                      }
                    >
                      <div className="flex h-full items-end justify-between text-xs font-semibold text-zinc-300">
                        <span>{recipe.time ?? "調理時間未設定"}</span>
                        <span>{recipe.difficulty ?? "難易度未設定"}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-zinc-100">
                        {recipe.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {recipe.description ?? "説明がまだ登録されていません。"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
                    <div className="space-y-1">
                      <p>
                        {recipe.author ?? "匿名"} ・{" "}
                        {recipe.calories ?? "カロリー未設定"}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-zinc-500">
                        Like {Number(recipe.likes ?? 0)}
                      </p>
                    </div>
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-zinc-100 transition group-hover:border-white group-hover:text-white"
                    >
                      レシピを見る
                    </Link>
                  </div>
                </article>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
