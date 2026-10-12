"use client";

import { useRef, useState } from "react";

// Concept SaaS ("Pipeline") with an AI agent built in: one click and the agent works the lead list.
type Lead = { name: string; company: string; last: string; status: "New" | "Stale" | "Drafted" | "Booked" };

const START: Lead[] = [
  { name: "Maria L.", company: "Sunrise Dental", last: "9 days ago", status: "Stale" },
  { name: "Tom R.", company: "Ridge Roofing", last: "2 hours ago", status: "New" },
  { name: "Priya S.", company: "Bloom Studio", last: "14 days ago", status: "Stale" },
  { name: "Jake W.", company: "Harbor Realty", last: "5 days ago", status: "Stale" },
];

const STEPS: { log: string; lead?: number; to?: Lead["status"] }[] = [
  { log: "Reading pipeline… 3 leads went quiet" },
  { log: "Maria · checked last call notes → wants Saturday slots", lead: 0, to: "Drafted" },
  { log: "Priya · pricing question unanswered → drafted reply", lead: 2, to: "Drafted" },
  { log: "Jake · asked for a demo → offered 2 calendar slots", lead: 3, to: "Booked" },
  { log: "Tom · new lead → added to tomorrow’s call list" },
  { log: "Done. 2 drafts await your approval ✓" },
];

const PILL: Record<Lead["status"], string> = {
  New: "bg-orbit-accent/25 text-ink",
  Stale: "bg-rule text-muted",
  Drafted: "bg-accent/25 text-ink",
  Booked: "bg-ok/25 text-ink",
};

export default function SaasDemo() {
  const [leads, setLeads] = useState(START);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  function run() {
    timers.current.forEach(clearTimeout);
    setLeads(START);
    setLog([]);
    setRunning(true);
    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    STEPS.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setLog((l) => [...l, s.log]);
          if (s.lead !== undefined) setLeads((ls) => ls.map((x, j) => (j === s.lead ? { ...x, status: s.to! } : x)));
          if (i === STEPS.length - 1) setRunning(false);
        }, fast ? 0 : 700 * (i + 1)),
      );
    });
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper text-ink shadow-[10px_10px_0_var(--color-ink)]">
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
        <p className="font-extrabold tracking-tight">
          Pipeline<span className="text-accent">.</span> <span className="font-mono text-xs font-normal text-paper/60">CRM · concept product</span>
        </p>
        <span className="font-mono text-xs text-paper/60">acme-sales</span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="p-4 sm:p-5">
          <p className="font-mono text-xs text-muted">Leads · {leads.length}</p>
          <ul className="mt-3 divide-y divide-rule rounded-xl border border-rule">
            {leads.map((l) => (
              <li key={l.name} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{l.name}</span>
                  <span className="block truncate text-sm text-muted">{l.company} · {l.last}</span>
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.7rem] transition-colors duration-300 ${PILL[l.status]}`}>{l.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col border-t-2 border-ink bg-paper-2 p-4 sm:p-5 md:border-t-0 md:border-l-2">
          <p className="flex items-center gap-2 font-mono text-xs">
            <span className={`size-2 rounded-full ${running ? "pulse bg-accent" : "bg-ok"}`} aria-hidden />
            Follow-up agent
          </p>
          <ol className="mt-3 min-h-40 flex-1 space-y-2 font-mono text-[0.72rem] leading-relaxed" aria-live="polite">
            {log.length === 0 && <li className="text-muted">Idle. Finds leads that went quiet and drafts the right next message.</li>}
            {log.map((l, i) => (
              <li key={i} className="fade">› {l}</li>
            ))}
          </ol>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="mt-4 rounded-full bg-accent px-5 py-2.5 font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {running ? "Agent working…" : log.length ? "Run again ↻" : "Run agent ▸"}
          </button>
        </aside>
      </div>
    </div>
  );
}
