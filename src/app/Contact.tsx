"use client";

import { useState, type FormEvent } from "react";

// Free key from web3forms.com (enter your email, it mails you the key). It is public by design.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const field =
  "w-full rounded-xl border border-rule bg-paper px-4 py-3.5 text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-ink focus:outline-none";
const label = "font-mono text-xs text-muted";

type Status = "idle" | "sending" | "done" | "error";

export default function Contact({ linkedin }: { linkedin: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!KEY) return setStatus("error");
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, access_key: KEY, subject: `New project enquiry from ${data.name}` }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="fade rounded-3xl bg-ink p-8 text-paper sm:p-10">
        <p className="text-3xl font-bold tracking-tight">Message sent — thank you!</p>
        <p className="mt-3 max-w-md text-paper/75">
          I&rsquo;ll read it today and reply with a few questions and next steps.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-accent underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-rule bg-paper-2 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-8">
      <label className="grid gap-2">
        <span className={label}>Your name</span>
        <input name="name" required autoComplete="name" placeholder="Sam Tan" className={field} />
      </label>
      <label className="grid gap-2">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="sam@company.com" className={field} />
      </label>
      <label className="grid gap-2">
        <span className={label}>What do you need?</span>
        <select name="project" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          <option>Landing page</option>
          <option>Business website</option>
          <option>Website redesign</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className={label}>Budget</span>
        <select name="budget" required defaultValue="" className={field}>
          <option value="" disabled>Choose a range</option>
          <option>Under $500</option>
          <option>$500 – $1,000</option>
          <option>$1,000 – $3,000</option>
          <option>$3,000+</option>
        </select>
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className={label}>Tell me about the project</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What does your business do, and what should the site help you achieve?"
          className={`${field} resize-y`}
        />
      </label>
      {/* honeypot: bots fill it, humans never see it */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-ink px-8 py-4 font-semibold whitespace-nowrap text-paper transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-ink active:translate-y-0 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" ? (
          <p role="alert" className="text-sm text-error">
            That didn&rsquo;t go through.{" "}
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="underline">
              Message me on LinkedIn
            </a>{" "}
            instead.
          </p>
        ) : (
          <p className="text-sm text-muted">I reply within one business day.</p>
        )}
      </div>
    </form>
  );
}
