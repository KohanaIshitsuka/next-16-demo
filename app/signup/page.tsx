import Link from "next/link";

import { signUp } from "./actions";

type SignupPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function SignupPage({ searchParams }: SignupPageProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-zinc-800/40 blur-[160px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-zinc-700/40 blur-[180px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-6 pb-24 pt-16 sm:px-10">
          <header className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
              Create Account
            </p>
            <h1 className="text-3xl font-semibold text-zinc-100 font-[var(--font-display)]">
              新規登録
            </h1>
            <p className="text-sm text-zinc-400">
              アカウントを作成してレシピを登録しましょう。
            </p>
          </header>

          <form
            action={signUp}
            className="space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/40 backdrop-blur"
          >
            {searchParams?.error ? (
              <p className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-200">
                {searchParams.error}
              </p>
            ) : null}
            <label className="space-y-2 text-sm font-medium text-zinc-200">
              メールアドレス
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-200">
              パスワード
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 shadow-sm focus:border-white focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/30"
            >
              アカウントを作成
            </button>
          </form>

          <div className="text-center text-sm text-zinc-400">
            すでにアカウントがある場合は{" "}
            <Link href="/login" className="font-semibold text-zinc-100">
              ログイン
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
