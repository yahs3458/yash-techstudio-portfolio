"use client";

import { useEffect, useState } from "react";

// A replay of the outreach system we actually run: three agents handing work to each other.
// Scripted lines (no API), businesses anonymised.
type Line = { agent: 0 | 1 | 2; text: string; tag?: string };

const AGENTS = [
  { name: "lead-hunter", time: "18:30" },
  { name: "x-scout", time: "20:00" },
  { name: "inbox-manager", time: "09:00" },
];

const SCRIPT: Line[] = [
  { agent: 0, text: "searching: independent dental clinics · Boise, ID" },
  { agent: 0, text: "found 14 businesses · auditing websites…" },
  { agent: 0, text: "clinic #3: no online booking, 'call us' only", tag: "opportunity" },
  { agent: 0, text: "drafted email: AI receptionist that books 24/7" },
  { agent: 0, text: "safety check ✓ english ✓ opt-out ✓ cap 7/12", tag: "sent" },
  { agent: 1, text: "scanning X: \"need an ai agent\" · last 48h" },
  { agent: 1, text: "match 8/10: founder needs lead follow-up automation", tag: "hot" },
  { agent: 1, text: "reply drafted → waiting for human approval" },
  { agent: 2, text: "reading 3 new replies overnight…" },
  { agent: 2, text: "\"Interested, what would it cost?\" → draft ready", tag: "hot" },
  { agent: 2, text: "follow-up due: 4 leads · sent", tag: "sent" },
  { agent: 2, text: "report → 5 lines to Yashh ☕" },
];

const TAG: Record<string, string> = {
  opportunity: "bg-accent/20 text-accent",
  sent: "bg-ok/20 text-ok",
  hot: "bg-error/20 text-[oklch(72%_0.17_25)]",
};

export default function AgentConsole() {
  const [n, setN] = useState(SCRIPT.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % (SCRIPT.length + 3); // short pause on the full log before replaying
      setN(Math.min(i, SCRIPT.length));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const shown = SCRIPT.slice(0, n);
  const active = shown.length ? shown[shown.length - 1].agent : 0;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-ink text-paper shadow-[10px_10px_0_var(--color-accent)]">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-paper/20" />
          <span className="size-3 rounded-full bg-paper/20" />
          <span className="size-3 rounded-full bg-paper/20" />
        </div>
        <p className="font-mono text-xs text-paper/60">agents.run — our outreach system</p>
        <span className="flex items-center gap-2 font-mono text-xs text-ok">
          <span className="pulse size-2 rounded-full bg-ok" aria-hidden /> live
        </span>
      </div>

      <div className="grid grid-cols-3 border-b border-paper/10 font-mono text-[0.7rem] sm:text-xs">
        {AGENTS.map((a, i) => (
          <div
            key={a.name}
            className={`px-3 py-2.5 transition-colors duration-300 sm:px-4 ${i === active ? "bg-accent text-ink" : "text-paper/55"}`}
          >
            <span className="block truncate font-semibold">{a.name}</span>
            <span className="opacity-70">{a.time} IST</span>
          </div>
        ))}
      </div>

      <ol className="h-[22rem] space-y-2.5 overflow-hidden px-5 py-5 font-mono text-[0.78rem] leading-relaxed sm:text-[0.82rem]" aria-label="Agent activity log">
        {shown.map((l, i) => (
          <li key={i} className="fade flex items-start gap-3">
            <span className="shrink-0 text-accent">{AGENTS[l.agent].name.split("-")[0]}›</span>
            <span className="text-paper/85">
              {l.text}
              {l.tag && <span className={`ml-2 rounded px-1.5 py-0.5 text-[0.65rem] uppercase ${TAG[l.tag]}`}>{l.tag}</span>}
            </span>
          </li>
        ))}
        {n < SCRIPT.length && <li className="pulse text-accent" aria-hidden>▍</li>}
      </ol>
    </div>
  );
}
