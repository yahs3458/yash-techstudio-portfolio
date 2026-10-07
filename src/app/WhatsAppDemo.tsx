"use client";

import { useEffect, useRef, useState } from "react";

// Scripted demo flows: what a real WhatsApp AI agent would say. No API, no cost.
type Step = { bot: string[]; options: [label: string, next: string][] };
type Flow = { name: string; business: string; start: string; steps: Record<string, Step> };

const FLOWS: Flow[] = [
  {
    name: "Café & restaurant",
    business: "NOIR Coffee & Kitchen",
    start: "hi",
    steps: {
      hi: { bot: ["Hi! 👋 Welcome to NOIR Coffee & Kitchen.", "What can I help you with?"], options: [["☕ See the menu", "menu"], ["📅 Book a table", "book"], ["🕐 Opening hours", "hours"]] },
      menu: { bot: ["Today’s favourites:\n• Flat white — $4.50\n• Iced cortado — $5\n• Avocado toast — $11\n• Breakfast burrito — $12"], options: [["🛍️ Order for pickup", "order"], ["📅 Book a table", "book"]] },
      order: { bot: ["Great choice! Your pickup order:\n1 × Flat white\n1 × Avocado toast\nTotal: $15.50", "Ready in 15 minutes. Pay at the counter. ✅"], options: [["👍 Thanks!", "bye"]] },
      book: { bot: ["How many people?"], options: [["2 people", "time"], ["4 people", "time"], ["6+ people", "time"]] },
      time: { bot: ["Which time works today?"], options: [["12:30 pm", "booked"], ["6:00 pm", "booked"], ["7:30 pm", "booked"]] },
      booked: { bot: ["You’re booked! ✅ See you today.", "I’ll send a reminder 1 hour before. Reply CANCEL anytime to free the table."], options: [["👍 Perfect", "bye"]] },
      hours: { bot: ["Mon–Fri 7 am – 9 pm\nSat–Sun 8 am – 10 pm", "📍 214 Main St (tap for directions)"], options: [["📅 Book a table", "book"], ["☕ See the menu", "menu"]] },
      bye: { bot: ["Thanks for choosing NOIR! ☕"], options: [] },
    },
  },
  {
    name: "Clinic, salon & spa",
    business: "Bright Smile Dental",
    start: "hi",
    steps: {
      hi: { bot: ["Hi! 😊 This is Bright Smile Dental.", "I can book you in 30 seconds — what do you need?"], options: [["🦷 Cleaning & check-up", "new"], ["⚡ Tooth pain (urgent)", "urgent"], ["💬 Ask a question", "faq"]] },
      new: { bot: ["Are you a new patient?"], options: [["Yes, first visit", "slot"], ["No, I’ve been before", "slot"]] },
      urgent: { bot: ["Sorry you’re in pain. 😟 We keep same-day slots for emergencies.", "Earliest today:"], options: [["Today 2:15 pm", "booked"], ["Today 4:40 pm", "booked"]] },
      slot: { bot: ["Here are the next open slots:"], options: [["Thu 9:00 am", "booked"], ["Thu 3:30 pm", "booked"], ["Sat 10:00 am", "booked"]] },
      booked: { bot: ["Booked! ✅ We’ve saved your slot.", "📋 New-patient form (2 min, on your phone): brightsmile.com/form", "I’ll remind you the day before."], options: [["⏩ Show the reminder", "remind"]] },
      remind: { bot: ["⏰ Reminder: your appointment is tomorrow at 9:00 am.\nReply 1 to confirm, 2 to reschedule."], options: [["1 — Confirm", "after"]] },
      after: { bot: ["Confirmed, see you tomorrow! 👋", "— after the visit —", "Thanks for coming in today! If we took good care of you, a quick Google review helps a lot ⭐ g.page/brightsmile"], options: [["🔁 Start over", "hi"]] },
      faq: { bot: ["Popular questions:"], options: [["Do you take insurance?", "ins"], ["How much is a cleaning?", "price"]] },
      ins: { bot: ["Yes — we accept most PPO plans, including Delta Dental, Cigna and Aetna. Want to book?"], options: [["📅 Book now", "new"]] },
      price: { bot: ["A cleaning & check-up starts at $95 without insurance. Want to book?"], options: [["📅 Book now", "new"]] },
    },
  },
];

type Msg = { from: "bot" | "me"; text: string };

export default function WhatsAppDemo() {
  const [flowIdx, setFlowIdx] = useState(0);
  const flow = FLOWS[flowIdx];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(flow.start);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0); // bumps on restart so the same step replays
  const scroller = useRef<HTMLDivElement>(null);

  // play a step's bot messages one by one with a short "typing…" pause
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const text of flow.steps[step].bot) {
        setTyping(true);
        await new Promise((r) => setTimeout(r, 650));
        if (cancelled) return;
        setTyping(false);
        setMsgs((m) => [...m, { from: "bot", text }]);
      }
    })();
    return () => {
      cancelled = true;
      setTyping(false);
    };
  }, [flow, step, run]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function pick(label: string, next: string) {
    setMsgs((m) => [...m, { from: "me", text: label }]);
    setStep(next);
  }

  function switchFlow(i: number) {
    setFlowIdx(i);
    setMsgs([]);
    setStep(FLOWS[i].start);
    setRun((r) => r + 1);
  }

  const options = typing ? [] : flow.steps[step].options;

  return (
    <div>
      <div role="tablist" aria-label="Choose a demo" className="mb-5 flex flex-wrap gap-2">
        {FLOWS.map((f, i) => (
          <button
            key={f.name}
            role="tab"
            aria-selected={i === flowIdx}
            onClick={() => switchFlow(i)}
            className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold transition-colors ${i === flowIdx ? "bg-ink text-paper" : "bg-paper hover:bg-paper-2"}`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* phone */}
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2.2rem] border-[6px] border-ink bg-ink shadow-[8px_8px_0_var(--color-accent)]">
        <div className="flex items-center gap-3 bg-wa-dark px-4 py-3 text-white">
          <span className="grid size-9 place-items-center rounded-full bg-white/20 text-sm font-bold" aria-hidden>
            {flow.business[0]}
          </span>
          <div className="leading-tight">
            <p className="font-semibold">{flow.business}</p>
            <p className="text-xs text-white/70">{typing ? "typing…" : "online"}</p>
          </div>
        </div>

        <div ref={scroller} className="flex h-[26rem] flex-col gap-2 overflow-y-auto bg-wa-bg p-3" aria-live="polite">
          {msgs.map((m, i) => (
            <p
              key={i}
              className={`fade max-w-[85%] rounded-xl px-3 py-2 text-[0.92rem] leading-snug whitespace-pre-line text-ink shadow-sm ${
                m.from === "me" ? "self-end rounded-tr-sm bg-wa-me" : "self-start rounded-tl-sm bg-white"
              }`}
            >
              {m.text}
            </p>
          ))}
          {typing && (
            <p className="self-start rounded-xl rounded-tl-sm bg-white px-3 py-2 text-muted" aria-label="typing">
              <span className="pulse">•••</span>
            </p>
          )}
        </div>

        <div className="flex min-h-[4.5rem] flex-wrap content-start gap-2 bg-wa-bg px-3 pt-1 pb-4">
          {options.map(([label, next]) => (
            <button
              key={label}
              onClick={() => pick(label, next)}
              className="rounded-full border border-wa-dark/30 bg-white px-3 py-1.5 text-sm font-medium text-wa-dark transition-colors hover:bg-wa-me"
            >
              {label}
            </button>
          ))}
          {!typing && options.length === 0 && (
            <button onClick={() => switchFlow(flowIdx)} className="rounded-full bg-wa-dark px-4 py-1.5 text-sm font-medium text-white">
              🔁 Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
