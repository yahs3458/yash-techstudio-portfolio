import Image from "next/image";
import AgentConsole from "./AgentConsole";
import Contact from "./Contact";
import SaasDemo from "./SaasDemo";
import TeddyHelper from "./TeddyHelper";
import WhatsAppDemo from "./WhatsAppDemo";

const LINKEDIN = "https://www.linkedin.com/in/yashh-sharma-a39718232";
const X_URL = "https://x.com/yashtechstudio";
// Yash's WhatsApp number, digits only with country code (e.g. 9198xxxxxxxx). Falls back to the contact form.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP;
const BOT_CTA = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Yashh, I saw the WhatsApp AI agent demo. I'd like one for my business.")}`
  : "#contact";

const BOT_FEATURES = [
  "Answers menu, prices & hours 24/7",
  "Takes bookings and pickup orders",
  "Sends reminders so fewer no-shows",
  "Asks happy customers for a Google review",
];

// The outreach system we run for ourselves, every day.
const PIPELINE = [
  {
    name: "Lead Hunter",
    when: "Every evening",
    does: ["Finds small businesses in a niche + city", "Audits each website for real problems", "Writes a personal email & runs safety checks"],
  },
  {
    name: "X Scout",
    when: "Every night",
    does: ["Scans X for people asking for help", "Scores each post for fit", "Drafts a reply for a human to approve"],
  },
  {
    name: "Inbox Manager",
    when: "Every morning",
    does: ["Reads replies, flags the hot ones", "Sends follow-ups, drafts answers", "Writes a 5-line report"],
  },
];

// Agents we build for clients — each one does a real job and knows when to ask a human.
const AGENT_TYPES = [
  { icon: "◎", name: "Sales agent", job: "Qualifies new leads, follows up when they go quiet and books calls on your calendar." },
  { icon: "✉", name: "Support agent", job: "Answers customers from your own docs and policies, and hands tricky cases to your team." },
  { icon: "</>", name: "Developer agent", job: "Reviews pull requests, writes tests, triages bugs and drafts fixes for your engineers to approve." },
  { icon: "⌕", name: "Research agent", job: "Finds and qualifies prospects, competitors or suppliers and turns it into a clean brief." },
  { icon: "▤", name: "Ops & reporting agent", job: "Pulls numbers from your tools, updates the CRM and sends the weekly report on its own." },
  { icon: "₹$", name: "Finance agent", job: "Chases unpaid invoices politely, matches payments and flags anything that looks off." },
  { icon: "✎", name: "Content agent", job: "Turns your updates into posts, emails and product copy in your voice — you approve before it goes out." },
  { icon: "☺", name: "Hiring agent", job: "Screens applications against your criteria, schedules interviews and keeps candidates updated." },
];

const GUARDRAILS = [
  "Hard daily send caps",
  "Never invents facts or prices",
  "Humans approve every real conversation",
  "Shared memory in plain files you can read",
];

// Live URLs — swap to the yashtechstudio.com subdomains once their DNS is set up.
// Relay live demo (Vercel).
const RELAY_URL = "https://relay-vert-eight.vercel.app/app";

const WORK = [
  {
    name: "Relay",
    tag: "CRM with 3 AI agents built in",
    kind: "SaaS product · AI agents",
    shot: "/work/relay.png",
    live: RELAY_URL,
    summary: "A working SaaS dashboard where agents score leads, chase the quiet ones and book calls — and a human approves every message. Try it live.",
    built: ["Dashboard with KPIs & pipeline chart", "Follow-up, lead-scoring & meeting-booker agents", "Approvals queue (human-in-the-loop)", "“Ask Relay” — chat with your pipeline"],
    stack: ["Next.js", "AI via OpenRouter", "Agent guardrails"],
    theme: "bg-orbit text-paper",
    accent: "text-orbit-accent",
  },
  {
    name: "NOIR",
    tag: "Coffee & Kitchen",
    kind: "Café & restaurant",
    shot: "/work/noir.png",
    live: "https://noir-cafe-weld.vercel.app",
    summary: "A warm, photo-led site for a specialty café — built to turn Instagram browsers into reservations.",
    built: ["Tabbed menu with prices", "Table-booking form", "Gallery with lightbox", "Scroll animations & map"],
    stack: ["Next.js", "Tailwind", "CSS scroll animations"],
    theme: "bg-noir text-paper",
    accent: "text-noir-accent",
  },
  {
    name: "Orbit AI",
    tag: "AI sales agent",
    kind: "SaaS waitlist launch",
    shot: "/work/orbit.png",
    live: "https://orbit-ai-ivory-iota.vercel.app",
    summary: "A futuristic launch page for an AI sales agent — the product is shown working, not just described.",
    built: ["Animated orbit hero (hand-built SVG)", "Live agent activity feed", "Bento feature grid", "Waitlist capture + FAQ"],
    stack: ["Next.js", "Tailwind", "SVG animation"],
    theme: "bg-orbit text-paper",
    accent: "text-orbit-accent",
  },
  {
    name: "NOVA Estates",
    tag: "Miami luxury homes",
    kind: "Real estate",
    shot: "/work/nova.png",
    live: "https://nova-estates-eta.vercel.app",
    summary: "A quiet-luxury brokerage site — every section built to book a private viewing.",
    built: ["Filterable listings", "Featured-home story with parallax", "Neighbourhood slider", "Viewing request form"],
    stack: ["Next.js", "Tailwind", "Scroll-driven motion"],
    theme: "bg-nova text-ink",
    accent: "text-nova-accent",
  },
  {
    name: "RYŌIKI",
    tag: "Jujutsu Kaisen fan archive",
    kind: "Anime fan site",
    shot: "/work/ryoiki.png",
    live: "https://ryoiki-jjk.vercel.app",
    summary: "A loud, animated fan site — press a button and a full-screen Domain Expansion takes over, with sound.",
    built: ["3 full-screen Domain Expansions", "Synthesised sound & voice lines", "Spoiler-safe fight cards", "Hand-built CSS & SVG effects"],
    stack: ["Next.js", "Web Audio", "CSS animation"],
    theme: "bg-ryoiki text-paper",
    accent: "text-ryoiki-accent",
  },
];

const SERVICES = [
  {
    title: "Custom AI agents",
    from: "$800",
    note: "+ $100/mo support",
    body: "Agents that do real work inside your business — and hand off to a human when it matters.",
    items: ["Sales agents: qualify leads, follow up, book calls", "Support agents that answer from your own docs", "Ops & developer agents: reports, CRM, code reviews", "Guardrails, logs and human approval built in", "WhatsApp & chat assistants that take bookings"],
  },
  {
    title: "SaaS & web app MVPs",
    from: "$2,500",
    note: "fixed scope",
    body: "A small, focused product you can put in front of users — with AI features where they actually help.",
    items: ["Dashboards, booking & internal tools", "Auth, database and payments", "AI features on Claude / OpenAI", "Shipped on Next.js + Vercel"],
  },
  {
    title: "Websites & landing pages",
    from: "$300",
    note: "landing page",
    body: "The front door for your product or business — fast, custom and built to convert.",
    items: ["Custom design, no templates", "Mobile-first & SEO-ready", "Booking, enquiry or waitlist forms", "Business site $800 · redesign $500"],
  },
];

const EXPERIENCE = [
  {
    when: "Now",
    role: "AI orchestration & agentic AI",
    body: "I design and run multi-agent systems day to day — agents that research, write, review and hand work to each other, with clear checkpoints where a human decides.",
    tags: ["Paperclip", "Claude Code", "MCP", "Claude API", "Multi-agent workflows", "Human-in-the-loop"],
  },
  {
    when: "3+ years",
    role: "Frontend engineering & product design",
    body: "Web and mobile apps for real users: design systems, motion, performance on cheap phones, and interfaces people actually enjoy using.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Motion & SVG"],
  },
  {
    when: "Studio",
    role: "Yashh Techstudio",
    body: "Where the two meet: AI agents and small SaaS products with a front end that looks as good as the agent works. Remote, for clients worldwide.",
    tags: ["AI agents", "SaaS MVPs", "Websites", "Remote"],
  },
];

const STEPS = [
  ["Free call", "30 minutes on your workflow — where time leaks, what a good outcome looks like."],
  ["Agent design", "We map the job step by step, decide what the agent may do alone and where a human approves."],
  ["Build & test", "Built on your real data and tools, tested on real cases before anyone relies on it."],
  ["Launch & support", "Deployed with logs you can read, then tuned month by month as your business changes."],
];

const TICKER = ["AI agents", "Multi-agent workflows", "WhatsApp & chat assistants", "SaaS MVPs", "Claude & OpenAI", "Human-in-the-loop", "Next.js", "Websites that convert"];

const h2 = "text-[clamp(2.6rem,5vw+1rem,5rem)] leading-[0.95] font-extrabold tracking-[-0.045em]";

// Plain answers to what clients (and AI answer engines) ask most. Also emitted as FAQPage JSON-LD.
const FAQ = [
  {
    q: "What is a custom AI agent?",
    a: "An AI agent is software that does a real job end to end — like following up with leads, answering customers or reviewing code — using an AI model plus your tools and rules. Unlike a basic chatbot, it takes actions, keeps a log, and asks a human before anything important.",
  },
  {
    q: "How much does an AI agent cost?",
    a: "Our custom AI agents start at $800 for setup plus $100/month for support and tuning (from ₹40,000 in India). AI and messaging usage is billed to your own accounts with no markup. SaaS MVPs with agents start at $2,500, and websites at $300.",
  },
  {
    q: "How long does it take to build an AI agent?",
    a: "A focused agent (for example a lead follow-up or support agent) usually takes 1–3 weeks: a free call, agent design, building and testing on your real data, then launch with monitoring.",
  },
  {
    q: "Is it safe to let an AI agent talk to my customers?",
    a: "We design every agent with guardrails: hard limits on what it can send, no invented prices or facts, full logs you can read, and human approval for important conversations. If the agent isn't sure, it hands off to you.",
  },
  {
    q: "Which AI models and tools do you use?",
    a: "We build on Claude and OpenAI models, use the Model Context Protocol (MCP) and multi-agent orchestration (Paperclip, Claude Code), and ship web apps on Next.js and Vercel. The agent connects to your existing tools — email, WhatsApp, CRM, sheets or your codebase.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. Yashh Techstudio is based in Ghaziabad (Delhi NCR), India and works remotely with clients in the US, UK, Europe and India.",
  },
];

// Structured data so search engines understand who we are and what we sell.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.yashtechstudio.com/#studio",
      name: "Yashh Techstudio",
      url: "https://www.yashtechstudio.com",
      logo: "https://www.yashtechstudio.com/icon.svg",
      description: "AI agent development studio: custom AI agents, SaaS MVPs and websites.",
      founder: { "@id": "https://www.yashtechstudio.com/#yash" },
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      sameAs: [X_URL, LINKEDIN],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.body },
          priceSpecification: { "@type": "PriceSpecification", price: s.from.replace(/[^0-9]/g, ""), priceCurrency: "USD", minPrice: s.from.replace(/[^0-9]/g, "") },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.yashtechstudio.com/#yash",
      name: "Yashh Sharma",
      jobTitle: "AI orchestration engineer & founder",
      url: "https://www.yashtechstudio.com",
      sameAs: [LINKEDIN, X_URL],
      knowsAbout: ["AI agents", "Agentic AI", "Multi-agent orchestration", "Claude", "Next.js", "Frontend design"],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
      <header className="sticky top-0 z-30 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
          <a href="#" className="text-lg font-extrabold tracking-tight whitespace-nowrap">
            Yashh<span className="text-accent">.</span>Techstudio
          </a>
          <div className="flex items-center gap-6 text-sm sm:gap-8">
            <a href="#agents" className="hidden transition-colors hover:text-accent sm:inline">Agents</a>
            <a href="#catalog" className="hidden transition-colors hover:text-accent sm:inline">Services</a>
            <a href="#saas" className="hidden transition-colors hover:text-accent lg:inline">SaaS</a>
            <a href="#work" className="hidden transition-colors hover:text-accent md:inline">Work</a>
            <a href="#experience" className="hidden transition-colors hover:text-accent md:inline">Experience</a>
            <a
              href="#contact"
              className="rounded-full bg-ink px-5 py-2.5 font-semibold whitespace-nowrap text-paper transition-colors duration-200 hover:bg-accent hover:text-ink"
            >
              Let&rsquo;s talk
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <p
            aria-hidden
            className="pointer-events-none absolute -bottom-[1.5vw] left-1/2 -translate-x-1/2 text-[15vw] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--color-rule)] select-none"
          >
            TECHSTUDIO
          </p>
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pt-14 pb-24 sm:px-10 md:pt-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:pb-32">
            <div>
              <p className="rise inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-3 py-1.5 font-mono text-xs">
                <span className="pulse size-2 rounded-full bg-ok" aria-hidden />
                AI agent studio · taking new projects
              </p>
              <h1
                className="rise mt-6 text-[clamp(3rem,5.5vw+0.5rem,5.75rem)] leading-[0.9] font-extrabold tracking-[-0.06em] [overflow-wrap:anywhere]"
                style={{ animationDelay: "100ms" }}
              >
                AI agents that{" "}
                <span className="relative inline-block text-accent">
                  do the work.
                  <svg viewBox="0 0 300 30" className="absolute -bottom-[0.12em] left-0 h-[0.2em] w-full text-ink" preserveAspectRatio="none" aria-hidden>
                    <path className="draw" d="M4 22 C 60 6, 120 28, 170 14 S 260 8, 296 18" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="rise mt-9 max-w-xl text-xl leading-relaxed text-muted" style={{ animationDelay: "200ms" }}>
                We build custom AI agents and small SaaS products for businesses — agents that answer customers, follow up
                on leads and run the busywork, with a human in the loop where it counts. And the website around them, too.
              </p>
              <div className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "300ms" }}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-7 font-semibold whitespace-nowrap text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Build an agent with us
                  <span className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
                </a>
                <a href="#agents" className="font-semibold whitespace-nowrap underline decoration-2 underline-offset-[6px] hover:text-accent">
                  See agents running ↓
                </a>
              </div>
            </div>

            <div className="rise" style={{ animationDelay: "250ms" }}>
              <AgentConsole />
              <p className="mt-5 text-center font-mono text-xs text-muted">↑ a replay of the 3-agent system we run every day to find our own clients</p>
            </div>
          </div>
        </section>

        <div className="-rotate-1 overflow-hidden border-y-2 border-ink bg-accent py-4 text-ink" aria-hidden>
          <ul className="marquee flex w-max gap-10 text-xl font-extrabold whitespace-nowrap">
            {[...TICKER, ...TICKER].map((t, i) => (
              <li key={i} className="flex items-center gap-10">
                {t} <span className="text-ink/40">✦</span>
              </li>
            ))}
          </ul>
        </div>

        {/* case study: our own agents */}
        <section id="agents" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className={h2}>
              We run on <span className="text-accent">our own agents</span>
            </h2>
            <p className="max-w-md text-muted">
              Before we build agents for you, we built them for ourselves. Three agents find, qualify and follow up with
              our clients every day — about 10 minutes of human time.
            </p>
          </div>

          <ol className="mt-16 grid gap-5 md:grid-cols-3">
            {PIPELINE.map((a, i) => (
              <li key={a.name} className="reveal relative rounded-3xl border-2 border-ink bg-paper p-8 shadow-[6px_6px_0_var(--color-ink)]">
                <p className="font-mono text-xs text-muted">0{i + 1} · {a.when}</p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">{a.name}</h3>
                <ul className="mt-6 grid gap-2.5">
                  {a.does.map((d) => (
                    <li key={d} className="flex items-baseline gap-3">
                      <span className="text-accent" aria-hidden>→</span>
                      {d}
                    </li>
                  ))}
                </ul>
                {i < PIPELINE.length - 1 && (
                  <span aria-hidden className="absolute top-1/2 -right-4 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-accent font-bold md:grid">→</span>
                )}
              </li>
            ))}
          </ol>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3 rounded-3xl bg-ink p-6 text-paper sm:p-8">
            <span className="mr-2 font-mono text-xs text-paper/60">guardrails we ship with every agent</span>
            {GUARDRAILS.map((g) => (
              <span key={g} className="rounded-full border border-paper/20 px-4 py-2 text-sm">✓ {g}</span>
            ))}
          </div>
        </section>

        <section id="catalog" className="scroll-mt-20 border-y border-rule bg-paper-2">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-32">
            <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
              <h2 className={h2}>
                Agents we <span className="text-accent">build for you</span>
              </h2>
              <p className="max-w-md text-muted">
                If a person on your team does it the same way every day, an agent can probably do most of it — and hand
                the rest back to them.
              </p>
            </div>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AGENT_TYPES.map((a) => (
                <li key={a.name} className="reveal group rounded-3xl border border-rule bg-paper p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:border-ink">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink font-mono text-sm font-bold text-accent transition-transform duration-300 group-hover:rotate-[-6deg]" aria-hidden>
                    {a.icon}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">{a.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{a.job}</p>
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 text-center font-mono text-xs text-muted">Don&rsquo;t see yours? <a href="#contact" className="underline hover:text-accent">Tell us the job</a> — most agents are custom.</p>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-ink text-paper">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-32">
            <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className={h2}>
                What we <span className="text-accent">build</span>
              </h2>
              <p className="max-w-sm text-paper/70">Clear scope, fixed price, no agency overhead. You talk directly to the person building it.</p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <article
                  key={s.title}
                  className={`reveal flex flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
                    i === 0 ? "rotate-[-1deg] bg-accent text-ink" : "border border-paper/15 bg-paper/5"
                  }`}
                >
                  {i === 0 && <span className="mb-4 self-start rounded-full bg-ink px-3 py-1 font-mono text-[0.7rem] text-paper">Our main thing</span>}
                  <h3 className="text-2xl font-extrabold tracking-tight">{s.title}</h3>
                  <p className={`mt-3 ${i === 0 ? "text-ink/80" : "text-paper/70"}`}>{s.body}</p>
                  <ul className="mt-6 grid gap-2.5 text-[0.95rem]">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-baseline gap-3">
                        <span aria-hidden>✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-10">
                    <span className={`font-mono text-xs ${i === 0 ? "text-ink/70" : "text-paper/60"}`}>from</span>{" "}
                    <span className="text-5xl font-extrabold tracking-tight">{s.from}</span>{" "}
                    <span className={`font-mono text-xs ${i === 0 ? "text-ink/70" : "text-paper/60"}`}>{s.note}</span>
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-paper/60">AI and messaging usage is billed to your own accounts — no markup from us.</p>
          </div>
        </section>

        <section id="saas" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="reveal">
              <p className="font-mono text-xs text-muted">SaaS with an agent inside · press &ldquo;Run agent&rdquo; →</p>
              <h2 className={`mt-3 ${h2}`}>
                Products where the <span className="text-accent">agent does the work</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                We build small SaaS products with agents built in, not bolted on. In this concept CRM, one click and a
                follow-up agent reads the pipeline, finds who went quiet and drafts the right next message — then waits
                for a human to approve.
              </p>
              <ul className="mt-6 grid gap-2">
                {["Next.js app with auth, database & payments", "Agent runs on Claude or OpenAI, with your rules", "Every action logged; humans approve what matters"].map((f) => (
                  <li key={f} className="flex items-baseline gap-3">
                    <span className="text-accent" aria-hidden>✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <span className="text-muted">SaaS MVP with agent ·</span> <span className="text-4xl font-extrabold tracking-tight">from $2,500</span>
              </p>
            </div>
            <div className="reveal">
              <SaasDemo />
            </div>
          </div>
        </section>

        <section id="ai-agent" className="scroll-mt-20 border-y border-rule bg-paper-2">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-10 md:py-32 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div className="reveal">
              <p className="font-mono text-xs text-muted">Customer-facing agent · try the demo →</p>
              <h2 className={`mt-3 ${h2}`}>
                A WhatsApp agent that <span className="text-accent">books customers</span> while you work
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                Your customers already live on WhatsApp. The agent replies instantly, takes bookings and orders, and
                follows up — so no message waits until you&rsquo;re free. Anything unusual goes straight to you.
              </p>
              <ul className="mt-6 grid gap-2">
                {BOT_FEATURES.map((f) => (
                  <li key={f} className="flex items-baseline gap-3">
                    <span className="text-accent" aria-hidden>✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <span className="text-muted">part of our AI agent package ·</span>{" "}
                <span className="text-4xl font-extrabold tracking-tight">from $800</span>
              </p>
              <a
                href={BOT_CTA}
                {...(WHATSAPP && { target: "_blank", rel: "noopener noreferrer" })}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-wa-dark px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Get this for your business →
              </a>
            </div>
            <div className="reveal">
              <WhatsAppDemo />
            </div>
          </div>
        </section>

        {/* work: stacking cards — each project sticks and the next slides over it */}
        <section id="work" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={h2}>
              Products we&rsquo;ve <span className="text-accent">built</span>
            </h2>
            <p className="max-w-sm text-muted">
              A SaaS product with agents inside, plus the front ends we design. Concept projects built end-to-end — design, code and copy.
            </p>
          </div>

          <div className="mt-16 grid gap-8">
            {WORK.map((w, i) => (
              <article
                key={w.name}
                className={`rounded-[2rem] p-6 shadow-[0_-20px_60px_-30px_oklch(19%_0.015_50/0.5)] sm:p-10 lg:sticky lg:p-12 ${w.theme}`}
                style={{ top: `calc(6rem + ${i * 1.75}rem)` }}
              >
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                  <div>
                    <p className={`font-mono text-xs ${w.accent}`}>
                      0{i + 1} / 0{WORK.length} · {w.kind}
                    </p>
                    <h3 className="mt-4 text-[clamp(2.4rem,4vw,3.75rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">{w.name}</h3>
                    <p className="mt-1 text-lg opacity-70">{w.tag}</p>
                    <p className="mt-6 text-lg leading-relaxed opacity-85">{w.summary}</p>
                    <ul className="mt-6 grid gap-2 text-[0.95rem]">
                      {w.built.map((b) => (
                        <li key={b} className="flex items-baseline gap-3">
                          <span className={w.accent} aria-hidden>✦</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {w.stack.map((s) => (
                        <span key={s} className="rounded-full border border-current/25 px-3 py-1 font-mono text-xs opacity-80">{s}</span>
                      ))}
                    </div>
                    {w.live ? (
                      <a href={w.live} target="_blank" rel="noopener noreferrer" className={`mt-8 inline-block font-semibold underline decoration-2 underline-offset-[6px] ${w.accent}`}>
                        {w.name === "Relay" ? "Try the live app ↗" : "Visit live site ↗"}
                      </a>
                    ) : (
                      <p className="mt-8 font-mono text-xs opacity-60">Live demo coming soon</p>
                    )}
                  </div>
                  <a href={w.live || "#contact"} {...(w.live && { target: "_blank", rel: "noopener noreferrer" })} className="group block">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-current/15 shadow-2xl transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-1.5 group-hover:rotate-[-0.6deg]">
                      <Image
                        src={w.shot}
                        alt={`Homepage of ${w.name}`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-top transition-transform duration-[1200ms] ease-(--ease-out) group-hover:scale-[1.04]"
                      />
                    </div>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 border-y border-rule bg-paper-2">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-32">
            <div className="reveal grid items-end gap-10 md:grid-cols-[auto_minmax(0,1fr)]">
              <div className="relative mx-auto size-40 sm:size-48">
                <div className="absolute -inset-2 rotate-[4deg] rounded-[2rem] bg-accent" aria-hidden />
                <div className="relative size-full overflow-hidden rounded-[1.75rem] border-4 border-ink">
                  <Image src="/yash.jpg" alt="Yashh Sharma, founder of Yashh Techstudio" fill sizes="12rem" className="object-cover object-top" />
                </div>
              </div>
              <div>
                <p className="font-mono text-xs text-muted">Who you&rsquo;ll work with</p>
                <h2 className={`mt-3 ${h2}`}>
                  Agentic AI <span className="text-accent">+</span> frontend craft
                </h2>
                <p className="mt-5 max-w-2xl text-lg text-muted">
                  I&rsquo;m Yashh Sharma. My day job is AI orchestration — building systems where many agents work together.
                  Before that, years of frontend and product design. Yashh Techstudio is where I put both to work for you.
                </p>
              </div>
            </div>

            <ol className="mt-16 grid gap-5 lg:grid-cols-3">
              {EXPERIENCE.map((e) => (
                <li key={e.role} className="reveal flex flex-col rounded-3xl border border-rule bg-paper p-8">
                  <p className="font-mono text-xs text-accent">{e.when}</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{e.role}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{e.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2 pt-2">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full border border-rule px-3 py-1 font-mono text-xs">{t}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <h2 className={`reveal ${h2}`}>
            How we&rsquo;ll <span className="text-accent">work</span>
          </h2>
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute top-6 right-[12%] left-[12%] hidden h-0.5 bg-rule lg:block">
              <span className="fill block h-full bg-accent" />
            </span>
            {STEPS.map(([t, b], i) => (
              <li key={t} className="reveal relative">
                <span className="relative grid size-12 place-items-center rounded-full border-2 border-ink bg-paper font-mono font-bold shadow-[3px_3px_0_var(--color-ink)]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-rule bg-paper-2">
          <div className="reveal mx-auto max-w-4xl px-5 py-24 sm:px-10 md:py-28">
            <p className="text-[clamp(1.8rem,2.5vw+1rem,2.75rem)] leading-[1.2] font-semibold tracking-[-0.02em]">
              A good agent isn&rsquo;t the one that does the most. It&rsquo;s the one you can{" "}
              <span className="bg-accent px-1">trust to stop</span> and ask a human when it should.
            </p>
            <p className="mt-8 font-mono text-sm text-muted">— Yashh Sharma, Yashh Techstudio</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-10 md:pt-32">
          <a href="/audit" className="reveal group flex flex-col gap-6 rounded-[2rem] border-2 border-ink bg-accent p-8 text-ink shadow-[8px_8px_0_var(--color-ink)] transition-transform hover:-translate-y-1 sm:p-12 md:flex-row md:items-center md:justify-between">
            <span>
              <span className="font-mono text-xs">Free · 30 seconds · no signup</span>
              <span className="mt-2 block text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
                Is your website losing customers?
              </span>
              <span className="mt-3 block max-w-xl text-ink/80">Get a plain-English check of speed, mobile layout and booking buttons.</span>
            </span>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-ink text-2xl text-paper transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
          </a>
        </section>

        <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 pt-24 sm:px-10 md:pt-32">
          <h2 className={`reveal ${h2}`}>
            Questions, <span className="text-accent">answered</span>
          </h2>
          <div className="mt-12 divide-y divide-rule border-y border-rule">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold tracking-tight [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="reveal">
              <h2 className={h2}>
                Got a workflow to automate? <span className="text-accent">Let&rsquo;s talk.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Tell us what eats your team&rsquo;s time, or what you want to launch. We&rsquo;ll come back with questions,
                a plan and a fixed quote.
              </p>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-ink px-5 py-3 font-semibold whitespace-nowrap shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                  <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
            <div className="reveal">
              <Contact linkedin={LINKEDIN} />
            </div>
          </div>
        </section>

        {/* big CTA banner */}
        <a href="#contact" className="group block overflow-hidden border-y-2 border-ink bg-accent py-8 text-ink" aria-label="Let’s build your agent — go to contact">
          <span className="marquee flex w-max gap-12 text-[clamp(3rem,8vw,7rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="flex items-center gap-12">
                Let&rsquo;s build your agent <span className="transition-transform duration-500 group-hover:rotate-90">✦</span>
              </span>
            ))}
          </span>
        </a>
      </main>

      <TeddyHelper />

      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10">
          <p className="text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-extrabold tracking-[-0.06em]">
            Yashh<span className="text-accent">.</span>Techstudio
          </p>
          <div className="mt-10 flex flex-col gap-3 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
            <p>AI agents · SaaS MVPs · Websites · Remote, worldwide</p>
            <div className="flex gap-6">
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">X</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
              <a href="/audit" className="hover:text-paper">Free audit</a>
              <a href="#contact" className="hover:text-paper">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
