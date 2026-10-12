"use client";

import { useEffect, useRef, useState } from "react";

// "Bit": a small robot help agent that walks down the side as you scroll, drops a tip per section,
// and opens a quick-answer chat. Scripted answers only — no API, no cost.
const TIPS: Record<string, string> = {
  top: "Hey, I'm Bit — Yashh's help agent. Tap me for quick answers.",
  agents: "These 3 agents find Yashh's clients every day. Real ones!",
  catalog: "Developer agent, sales agent… which one would save you time?",
  services: "AI agents start at $800. Websites at $300.",
  saas: "Press “Run agent” — it actually works 👀",
  "ai-agent": "Try the WhatsApp demo, it books a table!",
  work: "Relay is a real SaaS you can open and play with.",
  experience: "That's Yashh — agentic AI + frontend craft.",
  faq: "Still curious? Tap me, I'll answer.",
  contact: "Say hi! Yashh replies within a day.",
};
const SECTIONS = Object.keys(TIPS).filter((k) => k !== "top");

const QA: { q: string; a: string; href?: string; cta?: string }[] = [
  { q: "What does an AI agent cost?", a: "Custom AI agents start at $800 setup + $100/month. SaaS MVPs from $2,500, websites from $300. AI usage is billed to your own account — no markup." },
  { q: "What can an agent do for me?", a: "Answer customers and book appointments, follow up with leads, review code, chase invoices, write reports… If someone does it the same way every day, an agent can usually help.", href: "#catalog", cta: "See agent types" },
  { q: "How long does it take?", a: "A focused agent usually takes 1–3 weeks: free call → agent design → build & test on your data → launch." },
  { q: "Is it safe?", a: "Every agent has guardrails: send limits, no invented facts or prices, full logs, and a human approves anything important." },
  { q: "Show me a live demo", a: "Relay is a CRM with 3 agents inside — open it and press “Run all agents”.", href: "https://relay-vert-eight.vercel.app/app", cta: "Open Relay ↗" },
  { q: "I want to talk to Yashh", a: "Great! Leave a message in the contact form — Yashh replies within a day.", href: "#contact", cta: "Go to contact" },
];

export default function TeddyHelper() {
  const [progress, setProgress] = useState(0);
  const [walking, setWalking] = useState(false);
  const [tip, setTip] = useState(TIPS.top);
  const [showTip, setShowTip] = useState(true);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<(typeof QA)[number] | null>(null);
  const [hidden, setHidden] = useState(false);
  const stopTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setHidden(localStorage.getItem("teddy-hidden") === "1");
      } catch {}
    });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
      setWalking(true);
      clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => setWalking(false), 250);
    };
    addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) {
          setTip(TIPS[hit.target.id] ?? TIPS.top);
          setShowTip(true);
        }
      },
      { threshold: [0.25, 0.5] },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
      clearTimeout(stopTimer.current);
    };
  }, []);

  function hide() {
    setHidden(true);
    setOpen(false);
    try {
      localStorage.setItem("teddy-hidden", "1");
    } catch {}
  }

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => {
          setHidden(false);
          try {
            localStorage.removeItem("teddy-hidden");
          } catch {}
        }}
        className="fixed right-3 bottom-3 z-40 rounded-full border-2 border-ink bg-paper px-3 py-1.5 text-xs font-bold shadow-[3px_3px_0_var(--color-ink)]"
      >
        🤖 Bit
      </button>
    );
  }

  return (
    <div
      className="teddy-track fixed right-2 z-40 flex flex-col items-end sm:right-5"
      style={{ "--p": progress } as React.CSSProperties}
    >
      {open ? (
        <div role="dialog" aria-label="Bit help" className="mb-3 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[5px_5px_0_var(--color-ink)]">
          <div className="flex items-center justify-between bg-ink px-4 py-2.5 text-paper">
            <p className="text-sm font-bold">Bit · help agent</p>
            <button type="button" onClick={() => { setOpen(false); setAnswer(null); }} aria-label="Close help" className="text-paper/70 hover:text-paper">✕</button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto p-4 text-sm">
            <p className="rounded-xl bg-paper-2 px-3 py-2">Hey! I&rsquo;m Bit 🤖 What would you like to know?</p>
            {answer && (
              <div className="mt-3 space-y-2">
                <p className="ml-auto w-fit rounded-xl bg-accent px-3 py-2 font-semibold">{answer.q}</p>
                <p className="rounded-xl bg-paper-2 px-3 py-2 leading-relaxed">{answer.a}</p>
                {answer.href && (
                  <a
                    href={answer.href}
                    {...(answer.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    onClick={() => !answer.href!.startsWith("http") && setOpen(false)}
                    className="inline-block font-semibold text-accent underline underline-offset-4"
                  >
                    {answer.cta}
                  </a>
                )}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {QA.filter((x) => x !== answer).map((x) => (
                <button key={x.q} type="button" onClick={() => setAnswer(x)} className="rounded-full border border-ink/30 px-3 py-1 text-xs hover:border-accent hover:text-accent">
                  {x.q}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={hide} className="w-full border-t border-rule py-2 text-xs text-muted hover:text-ink">Hide Bit</button>
        </div>
      ) : (
        showTip && (
          <p className="pop relative mb-2 max-w-[13rem] rounded-2xl border-2 border-ink bg-paper px-3 py-2 text-xs font-semibold shadow-[3px_3px_0_var(--color-ink)]">
            {tip}
            <button type="button" onClick={() => setShowTip(false)} aria-label="Dismiss tip" className="ml-1 text-muted hover:text-ink">✕</button>
          </p>
        )
      )}

      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setShowTip(false); }}
        aria-label={open ? "Close Bit help" : "Open Bit, the help agent"}
        aria-expanded={open}
        className={`teddy group relative size-20 sm:size-24 ${walking ? "teddy-walk" : "teddy-idle"}`}
      >
        <Teddy />
      </button>
    </div>
  );
}

function Teddy() {
  // Bit: a small robot agent in brand colours.
  return (
    <svg viewBox="0 0 120 130" className="size-full drop-shadow-[3px_4px_0_rgba(0,0,0,0.3)]" aria-hidden>
      <line x1="60" y1="20" x2="60" y2="8" stroke="#1c1714" strokeWidth="4" strokeLinecap="round" />
      <circle className="bit-led" cx="60" cy="7" r="5" fill="#14100d" stroke="#1c1714" strokeWidth="2.5" />
      <rect x="12" y="40" width="10" height="22" rx="4" fill="#e2621a" stroke="#1c1714" strokeWidth="3" />
      <rect x="98" y="40" width="10" height="22" rx="4" fill="#e2621a" stroke="#1c1714" strokeWidth="3" />
      <rect x="20" y="20" width="80" height="62" rx="20" fill="#ff7a30" stroke="#1c1714" strokeWidth="3" />
      <rect x="30" y="34" width="60" height="30" rx="12" fill="#fff3e8" />
      <g className="teddy-eyes">
        <rect x="40" y="42" width="12" height="12" rx="4" fill="#14100d" />
        <rect x="68" y="42" width="12" height="12" rx="4" fill="#14100d" />
      </g>
      <path d="M50 72 h20" stroke="#14100d" strokeWidth="3" strokeLinecap="round" />
      <rect x="50" y="82" width="20" height="6" fill="#e2621a" stroke="#1c1714" strokeWidth="2.5" />
      <rect x="30" y="88" width="60" height="30" rx="12" fill="#ff7a30" stroke="#1c1714" strokeWidth="3" />
      <circle cx="60" cy="103" r="6" fill="#14100d" stroke="#1c1714" strokeWidth="2.5" />
      <rect x="36" y="116" width="16" height="10" rx="4" fill="#e2621a" stroke="#1c1714" strokeWidth="3" />
      <rect x="68" y="116" width="16" height="10" rx="4" fill="#e2621a" stroke="#1c1714" strokeWidth="3" />
    </svg>
  );
}
