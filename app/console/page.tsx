"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "chat" | "events" | "skills";

type Message = { role: "user" | "assistant"; content: string };

const SKILLS = [
  { name: "trip_analyzer", description: "Analyzes destinations for safety, cost, and sentiment." },
  { name: "weather_forecast", description: "Fetches weather data for travel planning." },
  { name: "local_recommender", description: "Suggests local food, culture, and hidden gems." },
];

export default function ConsolePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const events = useMemo(
    () => [
      { id: 1, type: "tool_call", content: "trip_analyzer called for Paris", time: "just now" },
      { id: 2, type: "tool_result", content: "weather_forecast returned mild rain", time: "1m ago" },
    ],
    []
  );

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "OpenClaw demo response: connected UI for Vercel deploy." },
    ]);
    setInput("");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col bg-background px-4 pb-8 pt-6 sm:px-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">OpenClaw Console</h1>
          <p className="text-xs uppercase tracking-wide text-violet-600">TripClaw style</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard" className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700">
            Dashboard
          </Link>
          <Link href="/map" className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            Map
          </Link>
        </div>
      </header>

      <div className="mt-6 flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
        {(["chat", "events", "skills"] as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-t-lg px-4 py-2 text-xs font-bold uppercase tracking-wide ${
              activeTab === tab
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-zinc-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "chat" ? (
        <section className="mt-4 flex flex-1 flex-col">
          <div className="flex-1 space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            {messages.length === 0 ? (
              <p className="text-sm text-zinc-500">Send a message to start demo chat.</p>
            ) : (
              messages.map((message, idx) => (
                <div key={idx} className={message.role === "user" ? "text-right" : "text-left"}>
                  <span
                    className={`inline-block rounded-xl px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Message OpenClaw agent..."
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button onClick={sendMessage} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white">
              Send
            </button>
          </div>
        </section>
      ) : null}

      {activeTab === "events" ? (
        <section className="mt-4 space-y-3">
          {events.map((event) => (
            <article key={event.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-xs font-bold uppercase text-violet-600">{event.type}</p>
              <p className="mt-1 text-sm">{event.content}</p>
              <p className="mt-1 text-xs text-zinc-500">{event.time}</p>
            </article>
          ))}
        </section>
      ) : null}

      {activeTab === "skills" ? (
        <section className="mt-4 space-y-3">
          {SKILLS.map((skill) => (
            <article key={skill.name} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm font-bold font-mono">{skill.name}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{skill.description}</p>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
