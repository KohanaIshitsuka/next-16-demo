import { notFound } from "next/navigation";

const recipes = [
  {
    id: "1",
    title: "焦がしバターのきのこリゾット",
    description: "白ワインと出汁でゆっくり炊いて、香りを立たせる一皿。",
    time: "35分",
    difficulty: "中級",
    calories: "520kcal",
    author: "Yui",
    likes: "1.2k",
    tag: "濃厚",
    servings: "2人分",
    ingredients: [
      "米 1合",
      "ブラウンマッシュルーム 120g",
      "白ワイン 大さじ2",
      "バター 15g",
      "チキンブロス 500ml",
      "粉チーズ 大さじ2",
    ],
    steps: [
      "きのこを薄切りにして、フライパンでバターと一緒に香ばしく炒める。",
      "米を加えて透明感が出るまで炒め、白ワインを回し入れる。",
      "温めたブロスを少しずつ加え、弱火で20分ほど炊く。",
      "仕上げに粉チーズを混ぜ、塩で味を整える。",
    ],
  },
  {
    id: "2",
    title: "レモン香るサーモンのロースト",
    description: "ハーブと柑橘の香りで爽やかに仕上げるオーブン料理。",
    time: "25分",
    difficulty: "初級",
    calories: "430kcal",
    author: "Ren",
    likes: "980",
    tag: "ヘルシー",
    servings: "2人分",
    ingredients: [
      "生鮭 2切れ",
      "レモン 1/2個",
      "オリーブオイル 大さじ1",
      "タイム 適量",
      "塩 小さじ1/3",
      "こしょう 少々",
    ],
    steps: [
      "サーモンに塩こしょうをし、オリーブオイルを回しかける。",
      "レモンの輪切りとタイムをのせ、200℃のオーブンで12分焼く。",
      "仕上げにレモン汁を軽く絞って香りを立たせる。",
    ],
  },
  {
    id: "3",
    title: "黒ごま担々スープ",
    description: "豆乳ベースでまろやか、スパイスで奥行きを作る。",
    time: "20分",
    difficulty: "初級",
    calories: "390kcal",
    author: "Mao",
    likes: "860",
    tag: "温活",
    servings: "2人分",
    ingredients: [
      "豆乳 400ml",
      "鶏ひき肉 120g",
      "黒すりごま 大さじ2",
      "味噌 大さじ1",
      "豆板醤 小さじ1",
      "にんにく 1片",
    ],
    steps: [
      "にんにくを炒め、香りが立ったら鶏ひき肉を加えて炒める。",
      "豆板醤と味噌を加え、香りが出たら豆乳を注ぐ。",
      "黒すりごまを混ぜ、弱火で温めて仕上げる。",
    ],
  },
  {
    id: "4",
    title: "自家製トマトソースのラザニア",
    description: "低温で煮詰めたソースが主役のごちそうレシピ。",
    time: "60分",
    difficulty: "上級",
    calories: "640kcal",
    author: "Sora",
    likes: "1.6k",
    tag: "おもてなし",
    servings: "4人分",
    ingredients: [
      "ラザニアシート 6枚",
      "トマト缶 1缶",
      "合いびき肉 200g",
      "玉ねぎ 1/2個",
      "赤ワイン 50ml",
      "モッツァレラ 100g",
    ],
    steps: [
      "玉ねぎを炒め、合いびき肉を加えて色が変わるまで炒める。",
      "トマト缶と赤ワインを加え、弱火で30分煮詰める。",
      "耐熱皿にソース、ラザニアシート、チーズを重ねる。",
      "200℃のオーブンで20分焼く。",
    ],
  },
  {
    id: "5",
    title: "焼きねぎと鶏つくねの小鍋",
    description: "甘いねぎと生姜の香りで、やさしく整う味わい。",
    time: "30分",
    difficulty: "中級",
    calories: "480kcal",
    author: "Kiko",
    likes: "1.1k",
    tag: "ほっとする",
    servings: "2人分",
    ingredients: [
      "鶏ひき肉 200g",
      "長ねぎ 1本",
      "生姜 1片",
      "醤油 大さじ1",
      "だし 500ml",
      "みりん 大さじ1",
    ],
    steps: [
      "長ねぎを焼き色がつくまで焼き、香ばしさを出す。",
      "鶏ひき肉に生姜と醤油を混ぜ、つくねを成形する。",
      "だしとみりんを温め、焼いたねぎとつくねを煮る。",
    ],
  },
  {
    id: "6",
    title: "バジル香る冷製パスタ",
    description: "トマトとモッツァレラで、軽やかな昼のご褒美。",
    time: "15分",
    difficulty: "初級",
    calories: "360kcal",
    author: "Haru",
    likes: "740",
    tag: "夏向き",
    servings: "2人分",
    ingredients: [
      "カッペリーニ 160g",
      "トマト 2個",
      "モッツァレラ 80g",
      "バジル 適量",
      "オリーブオイル 大さじ2",
      "塩 小さじ1/2",
    ],
    steps: [
      "トマトを角切りにし、塩とオリーブオイルで和える。",
      "カッペリーニを茹でて冷水で冷やし、水気を切る。",
      "トマトとモッツァレラを合わせ、バジルを散らす。",
    ],
  },
];

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    notFound();
  }

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
            <a
              href="/"
              className="rounded-full border border-stone-200 bg-white/70 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur"
            >
              一覧に戻る
            </a>
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
                {recipe.description}
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
                      {recipe.author}
                    </p>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Likes
                    </p>
                    <p className="font-semibold text-stone-900">
                      {recipe.likes}
                    </p>
                  </div>
                  <div className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      Servings
                    </p>
                    <p className="font-semibold text-stone-900">
                      {recipe.servings}
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
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-stone-900/10 backdrop-blur">
                <h2 className="text-lg font-semibold text-stone-900">
                  材料
                </h2>
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  {recipe.servings}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {recipe.ingredients.map((item) => (
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
                  {recipe.steps.map((step, index) => (
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
