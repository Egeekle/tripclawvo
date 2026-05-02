"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type WorkflowStatus = "pending" | "running" | "completed" | "failed" | "cancelled";

type WorkflowStatusResponse = {
  id: string;
  status: WorkflowStatus;
  output: unknown;
};

export default function DashboardPage() {
  const [locationId, setLocationId] = useState("Harbor-7");
  const [action, setAction] = useState("Investigate anomaly");
  const [runId, setRunId] = useState("");
  const [statusData, setStatusData] = useState<WorkflowStatusResponse | null>(null);
  const [isTriggering, setIsTriggering] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statusPillClass = useMemo(() => {
    if (!statusData) return "bg-zinc-100 text-zinc-700";
    if (statusData.status === "completed") return "bg-green-100 text-green-700";
    if (statusData.status === "failed") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  }, [statusData]);

  async function handleTrigger(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsTriggering(true);

    try {
      const response = await fetch("/api/workflow/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId: locationId.trim() || undefined,
          action: action.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { runId?: string; error?: string };
      if (!response.ok || !data.runId) {
        throw new Error(data.error ?? "Could not start workflow");
      }

      setRunId(data.runId);
      setStatusData(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsTriggering(false);
    }
  }

  async function checkStatus() {
    if (!runId.trim()) return;

    setError(null);
    setIsChecking(true);

    try {
      const response = await fetch(`/api/workflow/status/${runId.trim()}`);
      const data = (await response.json()) as WorkflowStatusResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not fetch workflow status");
      }

      setStatusData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-8 sm:px-6">
      <header className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">TripClaw Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              OpenClaw-themed flow adapted for Next.js + Vercel.
            </p>
          </div>
          <Link href="/map" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            View Swarm Map
          </Link>
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">Trigger OpenClaw Workflow</h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={handleTrigger}>
          <input
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
            placeholder="Location ID"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            value={action}
            onChange={(event) => setAction(event.target.value)}
            placeholder="Action"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            disabled={isTriggering}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {isTriggering ? "Starting..." : "Start"}
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">Run Status</h2>
        <p className="mt-1 text-xs text-zinc-500">This mirrors TripClaw dashboard controls using your local workflow routes.</p>
        <div className="mt-4 flex gap-2">
          <input
            value={runId}
            onChange={(event) => setRunId(event.target.value)}
            placeholder="Run ID"
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="button"
            disabled={isChecking}
            onClick={checkStatus}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {isChecking ? "Checking..." : "Check"}
          </button>
        </div>

        {statusData ? (
          <div className="mt-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-xs text-zinc-500">Run ID</p>
            <p className="text-sm font-mono">{statusData.id}</p>
            <div className="mt-3">
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${statusPillClass}`}>
                {statusData.status}
              </span>
            </div>
            <pre className="mt-4 overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
              {JSON.stringify(statusData.output, null, 2)}
            </pre>
          </div>
        ) : null}

        {error ? (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}
      </section>
    </main>
  );
}
