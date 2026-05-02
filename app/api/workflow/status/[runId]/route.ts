import { getRun } from "workflow/api";
import { NextResponse } from "next/server";

// GET /api/workflow/status/[runId]
// Check the status of a workflow run
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const run = getRun(runId);
    const status = await run.status;
    const output = status === "completed" ? await run.returnValue : null;

    return NextResponse.json({
      id: run.runId,
      status,
      output,
    });
  } catch (error) {
    console.error("Failed to inspect workflow run:", error);
    return NextResponse.json(
      { error: "Failed to inspect workflow run" },
      { status: 500 }
    );
  }
}
