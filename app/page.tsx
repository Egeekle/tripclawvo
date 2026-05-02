import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 pb-24 pt-8">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium">Step 1 of 3</p>
          <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">
            Secure
          </span>
        </div>
        <div className="rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div className="h-2 w-1/3 rounded-full bg-rose-600" />
        </div>
        <p className="text-sm text-zinc-500">Security and identity verification</p>
      </section>

      <section className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight">Connect to ZeroClaw</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          TripClaw connects to your local ZeroClaw agent for autonomous planning and intelligence.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-bold">Agent Pairing</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Enter the pairing code from your ZeroClaw terminal to connect localhost gateway.
        </p>
        <div className="mt-4 space-y-2">
          <button className="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-bold text-white">
            Pair Agent
          </button>
          <button className="w-full rounded-lg border border-violet-300 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300">
            Continue in Demo Mode
          </button>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-bold">What are you exploring?</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Choose interests to help your agent personalize recommendations.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {["Food & Dining", "Nature & Hiking", "Museums & Culture", "Photography"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-300 px-3 py-1 dark:border-zinc-700"
              >
                {item}
              </span>
            )
          )}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-gradient-to-t from-background via-background p-4">
        <Link
          href="/dashboard"
          className="block w-full rounded-xl bg-violet-600 px-4 py-3 text-center text-base font-bold text-white"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
