// ─── Maritime Agent Workflow ──────────────────────────────────────
// Durable workflow that orchestrates the maritime swarm agent cycle:
//   1. Fetch current simulation status from MiroFish
//   2. Poll active agents
//   3. Process and analyze swarm interactions
//   4. Send Telegram notification with summary
// ──────────────────────────────────────────────────────────────────

const MIROFISH_API_URL =
  process.env.MIROFISH_API_URL ||
  "https://maritime.sh/api/agents/a092ba19-76c9-4bc6-8dfa-b35a3f1baaeb";
const AGENT_AI_PROVIDER = process.env.AGENT_AI_PROVIDER || "workflow-local";
const AGENT_AI_MODEL = process.env.AGENT_AI_MODEL || "maritime-v1";

interface SimulationStatus {
  active: boolean;
  simulationCycle: number;
  agentsCount: number;
  confidence: number;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  networkCentrality: number;
  status: string;
}

interface SwarmReport {
  timestamp: string;
  ai: {
    provider: string;
    model: string;
  };
  status: SimulationStatus;
  agents: Agent[];
  topAgent: Agent | null;
  summary: string;
}

// ─── Main Workflow ────────────────────────────────────────────────
export async function maritimeAgentWorkflow(input: {
  locationId?: string;
  action?: string;
}) {
  "use workflow";

  // Step 1: Get simulation status
  const status = await fetchSimulationStatus();

  // Step 2: Get active agents
  const agents = await fetchActiveAgents();

  // Step 3: Process an interaction if provided
  if (input.locationId && input.action) {
    await sendMaritimeInteraction(input.locationId, input.action);
  }

  // Step 4: Build swarm report
  const report = await buildSwarmReport(status, agents);

  // Step 5: Send Telegram notification
  await sendTelegramNotification(report);

  return report;
}

// ─── Steps ────────────────────────────────────────────────────────

async function fetchSimulationStatus(): Promise<SimulationStatus> {
  "use step";

  const response = await fetch(`${MIROFISH_API_URL}/status`);

  if (!response.ok) {
    throw new Error(
      `MiroFish status check failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function fetchActiveAgents(): Promise<Agent[]> {
  "use step";

  const response = await fetch(`${MIROFISH_API_URL}/agents`);

  if (!response.ok) {
    throw new Error(
      `MiroFish agents fetch failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function sendMaritimeInteraction(
  locationId: string,
  action: string
): Promise<void> {
  "use step";

  const response = await fetch(`${MIROFISH_API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role: "user",
      content: `Event at ${locationId}: ${action}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Maritime interaction failed: ${response.status} ${response.statusText}`
    );
  }
}

async function buildSwarmReport(
  status: SimulationStatus,
  agents: Agent[]
): Promise<SwarmReport> {
  "use step";

  const topAgent =
    agents.length > 0
      ? agents.reduce((top, agent) =>
          agent.networkCentrality > (top?.networkCentrality ?? 0) ? agent : top
        )
      : null;

  return {
    timestamp: new Date().toISOString(),
    ai: {
      provider: AGENT_AI_PROVIDER,
      model: AGENT_AI_MODEL,
    },
    status,
    agents,
    topAgent,
    summary: [
      `🌊 Maritime Swarm Report — Cycle ${status.simulationCycle}`,
      `AI: ${AGENT_AI_PROVIDER} / ${AGENT_AI_MODEL}`,
      `Status: ${status.active ? "✅ Active" : "⚠️ Inactive"}`,
      `Agents: ${agents.length} active`,
      `Confidence: ${status.confidence ?? "N/A"}%`,
      topAgent
        ? `Top Node: ${topAgent.name} (centrality: ${topAgent.networkCentrality})`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

async function sendTelegramNotification(report: SwarmReport): Promise<void> {
  "use step";

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId || botToken === "your_bot_token_here") {
    console.warn("Telegram not configured — skipping notification");
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: report.summary,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Telegram notification failed: ${response.status} ${response.statusText}`
    );
  }
}
