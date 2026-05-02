"use server";

import { start } from "workflow/api";
import { maritimeAgentWorkflow } from "@/app/workflows/maritime-agent";

// Server Action — trigger the maritime workflow from any component
export async function triggerMaritimeWorkflow(formData?: FormData) {
  const locationId = formData?.get("locationId") as string | null;
  const action = formData?.get("action") as string | null;

  const run = await start(maritimeAgentWorkflow, [
    {
      locationId: locationId ?? undefined,
      action: action ?? undefined,
    },
  ]);

  return { success: true, runId: run.runId };
}
