import { getSupabaseClient } from "@/lib/supabase";

type RecipeSummary = {
  id: number;
  title: string;
  description: string;
  time: string | null;
  difficulty: string | null;
  calories: string | null;
  author: string | null;
  likes: string | null;
  tag: string | null;
};

export default async function Home() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id,title,description,time,difficulty,calories,author,likes,tag"
    )
    .order("id");

  if (error) {
    throw new Error(`レシピの取得に失敗しました: ${error.message}`);
  }

  const recipes = (data ?? []) as RecipeSummary[];

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-stone-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-amber-300/40 blur-[120px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-rose-300/40 blur-[140px]" />
          <div className="absolute left-1/3 top-[420px] h-[280px] w-[280px] rounded-full bg-emerald-300/30 blur-[120px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-lg font-semibold text-stone-50">
                食
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                  Recipe Atelier
                </p>
                <h1 className="text-2xl font-semibold text-stone-900">
                  レシピアトリエ
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/recipes/new"
                className="rounded-full border border-stone-300/80 bg-white/70 px-5 py-2 text-sm font-medium text-stone-700 backdrop-blur"
              >
                レシピを登録
              </a>
              <button className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-stone-50 shadow-lg shadow-stone-900/20">
                ログイン
              </button>
            </div>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-8">
              <div className="space-y-5">
                <p className="text-sm font-medium text-stone-600">
                  今日のおすすめ・季節の食材・人気レシピをまとめて
                </p>
                <h2 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
                  気分と食材から探せる、
                  <br />
                  洗練された料理レシピのギャラリー
                </h2>
                <p className="max-w-xl text-base leading-7 text-stone-600">
                  次は Supabase
                  連携で保存・検索できるようにする想定のため、まずはハードコードの
                  レシピを並べています。気になるレシピは詳細ページへ遷移する想定です。
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
                    className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <aside className="relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-stone-900/10 backdrop-blur">
              <div className="absolute right-6 top-6 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-stone-50">
                FEATURE
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-stone-500">
                  今週の特集
                </p>
                <h3 className="text-2xl font-semibold text-stone-900">
                  低糖質でも満足感がある夕食コース
                </h3>
                <p className="text-sm leading-6 text-stone-600">
                  鶏むね肉、豆腐、きのこを使った 3 品構成。食後の眠気を抑えつつ、
                  香りと彩りで満足度を上げる設計。
                </p>
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  <span>全 3 品 / 合計 40 分</span>
                  <span className="font-semibold text-stone-900">詳細を見る</span>
                </div>
              </div>
            </aside>
          </section>

          <section className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-stone-500">
                  最新のレシピコレクション
                </p>
                <h3 className="text-2xl font-semibold text-stone-900">
                  料理レシピをチェック
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm text-stone-600 shadow-sm backdrop-blur">
                <span className="text-stone-400">検索</span>
                <span className="font-medium text-stone-900">
                  キーワードを入力
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-stone-900/10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/15"
                >
                  <div className="absolute right-6 top-6 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-stone-50">
                    {recipe.tag}
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 w-full rounded-2xl bg-[radial-gradient(circle_at_top,_#fbd8a2,_#f4f0ea_60%)] p-4">
                      <div className="flex h-full items-end justify-between text-xs font-semibold text-stone-600">
                        <span>{recipe.time ?? "調理時間未設定"}</span>
                        <span>{recipe.difficulty ?? "難易度未設定"}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-stone-900">
                        {recipe.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {recipe.description ?? "説明がまだ登録されていません。"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-stone-500">
                    <div className="space-y-1">
                      <p>
                        {recipe.author ?? "匿名"} ・{" "}
                        {recipe.calories ?? "カロリー未設定"}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-stone-400">
                        Like {recipe.likes ?? "0"}
                      </p>
                    </div>
                    <a
                      href={`/recipes/${recipe.id}`}
                      className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition group-hover:border-stone-900 group-hover:text-stone-900"
                    >
                      レシピを見る
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
