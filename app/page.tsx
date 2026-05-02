"use client";

import { FormEvent, useState } from "react";

type WorkflowStatus = "pending" | "running" | "completed" | "failed" | "cancelled";

type WorkflowStatusResponse = {
  id: string;
  status: WorkflowStatus;
  output: unknown;
};

export default function Home() {
  const [locationId, setLocationId] = useState("");
  const [action, setAction] = useState("");
  const [runId, setRunId] = useState("");
  const [statusData, setStatusData] = useState<WorkflowStatusResponse | null>(null);
  const [isTriggering, setIsTriggering] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTrigger(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatusData(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsTriggering(false);
    }
  }

  async function checkStatus() {
    if (!runId.trim()) {
      setError("Enter a run ID first.");
      return;
    }

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
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold">Maritime Workflow Console</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Trigger your agent workflow and monitor run status from one page.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium">1) Trigger Workflow</h2>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleTrigger}>
          <input
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
            placeholder="locationId (optional)"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <input
            value={action}
            onChange={(event) => setAction(event.target.value)}
            placeholder="action (optional)"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            disabled={isTriggering}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-black"
          >
            {isTriggering ? "Starting..." : "Start Workflow"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium">2) Check Status</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={runId}
            onChange={(event) => setRunId(event.target.value)}
            placeholder="runId"
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="button"
            onClick={checkStatus}
            disabled={isChecking}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {isChecking ? "Checking..." : "Check"}
          </button>
        </div>
      </section>

      {error ? (
        <section className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </section>
      ) : null}

      {statusData ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-medium">Run Result</h2>
          <p className="mt-3 text-sm">
            <span className="font-semibold">Run ID:</span> {statusData.id}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Status:</span> {statusData.status}
          </p>
          <pre className="mt-4 overflow-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">
            {JSON.stringify(statusData.output, null, 2)}
          </pre>
        </section>
      ) : null}
    </main>
  );
}
