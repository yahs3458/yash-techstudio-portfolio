import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pay an invoice — Yashh Techstudio",
  description: "Pay a Yashh Techstudio invoice securely by card from anywhere in the world, via Razorpay.",
  alternates: { canonical: "/pay" },
};

// Razorpay Payment Page URL (e.g. https://rzp.io/rzp/yashhtechstudio). Set it in Vercel env; until then clients are asked to email for a link.
const RAZORPAY_URL = process.env.NEXT_PUBLIC_RAZORPAY_URL;
const EMAIL = "hello@yashtechstudio.com";

const STEPS = [
  "Click “Pay securely” below.",
  "Enter the amount on your invoice and your invoice number (e.g. YT-2026-001).",
  "Pay by card — Visa, Mastercard, Amex, in your own currency.",
  "You get an instant receipt by email; I confirm within a day.",
];

export default function PayPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-10 md:py-20">
      <Link href="/" className="text-lg font-extrabold tracking-tight">
        Yashh<span className="text-accent">.</span>Techstudio
      </Link>
      <p className="mt-14 font-mono text-xs text-muted">Secure payment · Razorpay · 100+ currencies</p>
      <h1 className="mt-3 text-[clamp(2.8rem,7vw,5rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
        Pay an <span className="text-accent">invoice.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Clients anywhere in the world can pay here by card. Payments are processed by Razorpay, a licensed payment
        gateway — your card details never touch this site.
      </p>

      <ol className="mt-10 space-y-3">
        {STEPS.map((s, i) => (
          <li key={s} className="flex gap-4 rounded-xl border-2 border-ink bg-paper-2 px-4 py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        {RAZORPAY_URL ? (
          <a
            href={RAZORPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap rounded-full border-2 border-ink bg-accent px-7 py-3.5 text-center text-lg font-extrabold shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
          >
            Pay securely ↗
          </a>
        ) : (
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Payment link request")}`}
            className="inline-block whitespace-nowrap rounded-full border-2 border-ink bg-accent px-7 py-3.5 text-center text-lg font-extrabold shadow-[4px_4px_0_var(--color-ink)]"
          >
            Email me for a payment link
          </a>
        )}
        <p className="text-sm text-muted">
          Prefer bank transfer or need a different invoice? <a href={`mailto:${EMAIL}`} className="font-semibold text-ink underline underline-offset-4">{EMAIL}</a>
        </p>
      </div>

      <p className="mt-14 border-t border-rule pt-6 font-mono text-xs leading-relaxed text-muted">
        Yashh Techstudio · Sector 14, Vasundhara, Ghaziabad, Uttar Pradesh 201012, India. Refunds for unstarted work are
        issued to the original card within 7 business days.
      </p>
    </main>
  );
}
