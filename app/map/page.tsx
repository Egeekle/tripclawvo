"use client";

import Link from "next/link";

const CITY_NODES = [
  { id: "paris", name: "Paris (Eiffel Tower)", top: "30%", left: "48%" },
  { id: "tokyo", name: "Tokyo (Shibuya)", top: "40%", left: "84%" },
  { id: "rome", name: "Rome (Colosseum)", top: "35%", left: "52%" },
  { id: "santorini", name: "Santorini (Oia)", top: "38%", left: "56%" },
  { id: "newyork", name: "New York (Times Square)", top: "32%", left: "25%" },
];

export default function MapPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.75),rgba(24,24,27,0.9))]" />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <div>
          <h1 className="text-xl font-bold">Global Tourist Hubs</h1>
          <p className="text-xs uppercase tracking-wider text-rose-600">TripAI Explorer</p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Back to Dashboard
        </Link>
      </header>

      <section className="relative z-10 mx-auto mt-10 h-[70vh] w-full max-w-5xl rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
        {CITY_NODES.map((city) => (
          <button
            key={city.id}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: city.top, left: city.left }}
          >
            <div className="rounded-full bg-rose-600 p-2 text-xs font-bold text-white shadow-lg shadow-rose-600/40">
              ●
            </div>
            <span className="mt-2 inline-block rounded bg-white px-2 py-1 text-[10px] font-semibold text-zinc-800 shadow dark:bg-zinc-800 dark:text-zinc-100">
              {city.name}
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
