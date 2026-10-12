import type { Metadata } from "next";
import Link from "next/link";
import AuditTool from "./AuditTool";

export const metadata: Metadata = {
  title: "Free website check — Yashh Techstudio",
  description: "Paste your website address and see, in plain English, what’s costing you customers: speed, mobile, booking buttons and more.",
};

export default async function AuditPage({ searchParams }: PageProps<"/audit">) {
  const { url } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-10 md:py-20">
      <Link href="/" className="text-lg font-extrabold tracking-tight">
        Yashh<span className="text-accent">.</span>Techstudio
      </Link>
      <p className="mt-14 font-mono text-xs text-muted">Free · no signup · 30 seconds</p>
      <h1 className="mt-3 text-[clamp(2.8rem,7vw,5rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
        Is your website <span className="text-accent">losing customers?</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Paste your address. I’ll check it the way a customer on a phone sees it — speed, mobile layout, booking
        buttons, out-of-date details — and tell you what to fix, in plain English.
      </p>
      <div className="mt-10">
        <AuditTool initial={typeof url === "string" ? url : undefined} />
      </div>
    </main>
  );
}
