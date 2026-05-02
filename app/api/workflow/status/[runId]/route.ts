import { inspect } from "workflow";
import { NextResponse } from "next/server";

// GET /api/workflow/status/[runId]
// Check the status of a workflow run
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const run = await inspect(runId);

    return NextResponse.json({
      id: run.id,
      status: run.status,
      output: run.output ?? null,
      steps: run.steps ?? [],
    });
  } catch (error) {
    console.error("Failed to inspect workflow run:", error);
    return NextResponse.json(
      { error: "Failed to inspect workflow run" },
      { status: 500 }
    );
  }
}
