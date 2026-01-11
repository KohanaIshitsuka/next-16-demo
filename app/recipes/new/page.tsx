import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase";

import { createRecipe } from "./actions";

export default async function RecipeNewPage() {
  const supabase = await createSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
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
                New Recipe
              </p>
              <h1 className="text-3xl font-semibold text-zinc-100">
                レシピを登録する
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-zinc-700 bg-white/10 px-5 py-2 text-sm font-medium text-zinc-100 shadow-sm backdrop-blur"
              >
                一覧に戻る
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg shadow-black/30"
                >
                  ログアウト
                </button>
              </form>
            </div>
          </header>

          <form
            action={createRecipe}
            encType="multipart/form-data"
            className="space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/40 backdrop-blur"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                レシピ名
                <input
                  name="title"
                  required
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
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                タグ
                <input
                  name="tag"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                調理時間
                <input
                  name="time"
                  placeholder="例: 25分"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                難易度
                <input
                  name="difficulty"
                  placeholder="例: 初級"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                カロリー
                <input
                  name="calories"
                  placeholder="例: 420kcal"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                分量
                <input
                  name="servings"
                  placeholder="例: 2人分"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                作成者
                <input
                  name="author"
                  placeholder="例: Yui"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-zinc-200">
              説明
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                材料（1行に1つ）
                <textarea
                  name="ingredients"
                  rows={6}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-zinc-200">
                作り方（1行に1つ）
                <textarea
                  name="steps"
                  rows={6}
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Supabase に保存されます
              </p>
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/30"
              >
                レシピを保存
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
