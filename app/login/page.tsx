import { signIn } from "./actions";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-[#f6f1ea] text-stone-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-[-120px] h-[380px] w-[380px] rounded-full bg-amber-300/40 blur-[120px]" />
          <div className="absolute right-[-80px] top-24 h-[420px] w-[420px] rounded-full bg-rose-300/40 blur-[140px]" />
        </div>
        <main className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col gap-8 px-6 pb-24 pt-16 sm:px-10">
          <header className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
              Welcome Back
            </p>
            <h1 className="text-3xl font-semibold text-stone-900">
              ログイン
            </h1>
            <p className="text-sm text-stone-600">
              レシピの登録や編集をするにはログインが必要です。
            </p>
          </header>

          <form
            action={signIn}
            className="space-y-6 rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl shadow-stone-900/10 backdrop-blur"
          >
            {searchParams?.error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {searchParams.error}
              </p>
            ) : null}
            <label className="space-y-2 text-sm font-medium text-stone-700">
              メールアドレス
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-stone-700">
              パスワード
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-stone-900 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 shadow-lg shadow-stone-900/20"
            >
              ログイン
            </button>
          </form>

          <div className="text-center text-sm text-stone-600">
            アカウントがない場合は{" "}
            <a href="/signup" className="font-semibold text-stone-900">
              新規登録
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
