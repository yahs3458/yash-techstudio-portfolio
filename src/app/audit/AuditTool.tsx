"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { Finding } from "@/lib/audit";

type Result = { url: string; score: number; speed: number | null; findings: Finding[] };
type State = { kind: "idle" } | { kind: "loading"; url: string } | { kind: "error"; msg: string } | { kind: "done"; r: Result };

async function check(url: string): Promise<State> {
  try {
    const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    return res.ok ? { kind: "done", r: json } : { kind: "error", msg: json.error };
  } catch {
    return { kind: "error", msg: "Something went wrong. Please try again." };
  }
}

const tone =(s: number) => (s >= 90 ? "text-ok" : s >= 60 ? "text-accent" : "text-error");

export default function AuditTool({ initial }: { initial?: string }) {
  // a shared link (/audit?url=example.com) starts checking straight away
  const [state, setState] = useState<State>(initial ? { kind: "loading", url: initial } : { kind: "idle" });

  function run(url: string) {
    setState({ kind: "loading", url });
    history.replaceState(null, "", `?url=${encodeURIComponent(url)}`);
    check(url).then(setState);
  }

  useEffect(() => {
    if (initial) check(initial).then(setState);
  }, [initial]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = String(new FormData(e.currentTarget).get("url") ?? "").trim();
    if (url) run(url);
  }

  return (
    <div className="grid gap-10">
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-3xl border-2 border-ink bg-paper p-3 shadow-[6px_6px_0_var(--color-ink)] sm:flex-row">
        <label className="sr-only" htmlFor="url">Your website address</label>
        <input
          id="url"
          name="url"
          required
          defaultValue={initial}
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.com"
          className="min-w-0 flex-1 rounded-2xl bg-paper px-5 py-4 text-lg placeholder:text-muted/60 focus:outline-none"
        />
        <button
          disabled={state.kind === "loading"}
          className="rounded-2xl bg-accent px-7 py-4 font-semibold whitespace-nowrap text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {state.kind === "loading" ? "Checking…" : "Check my site →"}
        </button>
      </form>

      {state.kind === "loading" && (
        <p role="status" className="fade font-mono text-sm text-muted">
          <span className="pulse mr-2 inline-block size-2 rounded-full bg-accent" aria-hidden />
          Opening {state.url} and running Google’s speed test on a phone… this takes about 20–40 seconds.
        </p>
      )}

      {state.kind === "error" && (
        <p role="alert" className="fade rounded-2xl bg-paper-2 p-5 text-error">{state.msg}</p>
      )}

      {state.kind === "done" && (
        <section className="fade grid gap-8" aria-live="polite">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-2">
            <p className={`text-[clamp(4.5rem,12vw,8rem)] leading-none font-extrabold tracking-[-0.05em] ${tone(state.r.score)}`}>
              {state.r.score}<span className="text-2xl text-muted">/100</span>
            </p>
            <div className="pb-3">
              <p className="font-mono text-xs text-muted">{state.r.url}</p>
              <p className="text-lg font-semibold">
                {state.r.findings.length === 0 ? "Nice — nothing obvious to fix." : `${state.r.findings.length} things costing you customers`}
              </p>
              {state.r.speed === null && <p className="text-sm text-muted">Google’s speed test didn’t answer this time, so speed isn’t scored.</p>}
            </div>
          </div>

          <ol className="grid gap-3">
            {state.r.findings.map((f, i) => (
              <li key={f.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-rule bg-paper-2 p-5">
                <span className="grid size-9 place-items-center rounded-full bg-ink font-mono text-sm text-paper">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="mt-1 text-muted">{f.why}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-3xl bg-ink p-8 text-paper">
            <p className="text-2xl font-bold tracking-tight">Want these fixed?</p>
            <p className="mt-2 max-w-xl text-paper/75">
              I fix exactly these problems at a fixed price — redesigns from $500. Send me this report and I’ll reply with a plan.
            </p>
            <Link href="/#contact" className="mt-6 inline-block rounded-full bg-accent px-7 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5">
              Get a fixed quote →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
