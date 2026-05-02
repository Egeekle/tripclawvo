import { start } from "workflow/api";
import { maritimeAgentWorkflow } from "@/app/workflows/maritime-agent";
import { NextResponse } from "next/server";

// POST /api/workflow/trigger
// Starts a maritime agent workflow run (non-blocking)
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const run = await start(maritimeAgentWorkflow, [
      {
        locationId: body.locationId ?? undefined,
        action: body.action ?? undefined,
      },
    ]);

    return NextResponse.json(
      {
        message: "Maritime workflow started",
        runId: run.runId,
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("Failed to start workflow:", error);
    return NextResponse.json(
      { error: "Failed to start workflow" },
      { status: 500 }
    );
  }
}
