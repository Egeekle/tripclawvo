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
        <h1 className="text-3xl font-bold tracking-tight">Verify your identity</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          CampaignAI uses verification to keep the volunteer network trusted and safe.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-bold">Voter Registration and ID</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Scan your ID or voter registration card to join the campaign.
        </p>
        <div className="mt-4 space-y-2">
          <button className="w-full rounded-lg bg-rose-600 px-4 py-3 text-sm font-bold text-white">
            Scan ID Document
          </button>
          <button className="w-full rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
            Link Voter Record
          </button>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-bold">How do you want to help?</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Choose skills to personalize your tasks.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {["Canvassing", "Phone Banking", "Fundraising", "Social Media"].map(
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
          className="block w-full rounded-xl bg-rose-600 px-4 py-3 text-center text-base font-bold text-white"
        >
          Continue
        </Link>
      </div>
    </main>
  );
}
