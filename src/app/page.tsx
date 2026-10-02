import Image from "next/image";
import type { CSSProperties } from "react";
import Contact from "./Contact";

const LINKEDIN = "https://www.linkedin.com/in/yash-sharma-a39718232/";

// Live URLs — swap to the yashtechstudio.com subdomains once their DNS is set up.
const WORK = [
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
    title: "Landing page",
    from: "$300",
    body: "One focused page that sells one thing — a launch, an offer, a waitlist.",
    items: ["Custom design, no templates", "Mobile-first & fast", "Contact or signup form", "Delivered in about a week"],
  },
  {
    title: "Business website",
    from: "$800",
    body: "A complete site for your brand: home, services, about, contact — and room to grow.",
    items: ["Up to 5 pages", "SEO basics & analytics", "Booking or enquiry forms", "Easy updates after launch"],
  },
  {
    title: "Website redesign",
    from: "$500",
    body: "Your current site, rebuilt to look current and load fast — content kept, conversion fixed.",
    items: ["Audit of what’s not working", "Fresh design on your brand", "Speed & mobile fixes", "Launch with zero downtime"],
  },
];

const STEPS = [
  ["Free call", "15 minutes on your business, your customers and what the site needs to do."],
  ["Design", "A first look within a few days. You comment, I refine — no surprises."],
  ["Build", "Hand-coded in Next.js: fast, responsive and accessible on every screen."],
  ["Launch", "Deployed on your domain, with a short video walkthrough of how it all works."],
];

const TICKER = ["Landing pages", "Business websites", "Redesigns", "Next.js", "Mobile-first", "Fast by default", "Scroll animations", "Contact & booking forms"];
const CHIPS: [string, string, string][] = [
  ["top-[8%] -left-4 sm:-left-10", "-6deg", "✦ Fast by default"],
  ["top-[42%] -right-3 sm:-right-8", "5deg", "◐ Mobile-first"],
  ["bottom-[22%] -left-3 sm:-left-12", "4deg", "▲ Next.js"],
];

const h2 = "text-[clamp(2.6rem,5vw+1rem,5rem)] leading-[0.95] font-extrabold tracking-[-0.045em]";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
          <a href="#" className="text-lg font-extrabold tracking-tight whitespace-nowrap">
            Yash<span className="text-accent">.</span>Techstudio
          </a>
          <div className="flex items-center gap-6 text-sm sm:gap-8">
            <a href="#work" className="hidden transition-colors hover:text-accent sm:inline">Work</a>
            <a href="#services" className="hidden transition-colors hover:text-accent sm:inline">Services</a>
            <a href="#process" className="hidden transition-colors hover:text-accent md:inline">Process</a>
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
            className="pointer-events-none absolute -bottom-[4vw] left-1/2 -translate-x-1/2 text-[34vw] leading-none font-extrabold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-rule)] select-none"
          >
            YASH
          </p>
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pt-14 pb-24 sm:px-10 md:pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pb-32">
            <div>
              <p className="rise inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-3 py-1.5 font-mono text-xs">
                <span className="pulse size-2 rounded-full bg-ok" aria-hidden />
                Available for new projects · Remote
              </p>
              <h1
                className="rise mt-6 text-[clamp(3.4rem,9vw+0.5rem,8rem)] leading-[0.88] font-extrabold tracking-[-0.06em] [overflow-wrap:anywhere]"
                style={{ animationDelay: "100ms" }}
              >
                Websites
                <br />
                that{" "}
                <span className="relative inline-block text-accent">
                  sell.
                  <svg viewBox="0 0 300 30" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full text-ink" preserveAspectRatio="none" aria-hidden>
                    <path className="draw" d="M4 22 C 60 6, 120 28, 170 14 S 260 8, 296 18" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="rise mt-9 max-w-xl text-xl leading-relaxed text-muted" style={{ animationDelay: "200ms" }}>
                I&rsquo;m Yash. I design and build fast, good-looking landing pages and websites for
                small businesses and startups — so your site brings in customers, not just compliments.
              </p>
              <div className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "300ms" }}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-7 font-semibold whitespace-nowrap text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Start a project
                  <span className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-[-45deg]">→</span>
                </a>
                <a href="#work" className="font-semibold whitespace-nowrap underline decoration-2 underline-offset-[6px] hover:text-accent">
                  See my work ↓
                </a>
              </div>
            </div>

            <figure className="rise relative mx-auto w-full max-w-md" style={{ animationDelay: "250ms" }}>
              <div className="absolute -inset-3 rotate-[3deg] rounded-[2.4rem] bg-accent" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-ink">
                <Image
                  src="/yash.jpg"
                  alt="Yash Sharma, web designer and developer"
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  className="object-cover object-top"
                />
              </div>

              {/* rotating "available" badge */}
              <div className="absolute -top-8 -right-6 grid size-32 place-items-center sm:-right-10" aria-hidden>
                <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0">
                  <circle cx="60" cy="60" r="58" className="fill-ink" />
                  <defs>
                    <path id="ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                  </defs>
                  <text className="fill-paper font-mono text-[10.5px] tracking-[0.2em] uppercase">
                    <textPath href="#ring">Available for projects · Remote · </textPath>
                  </text>
                </svg>
                <span className="relative text-3xl text-accent">✦</span>
              </div>

              {CHIPS.map(([pos, rot, label], i) => (
                <span
                  key={label}
                  className={`float absolute ${pos} rounded-full border-2 border-ink bg-paper px-4 py-2 text-sm font-bold whitespace-nowrap shadow-[4px_4px_0_var(--color-ink)]`}
                  style={{ "--rot": rot, animationDelay: `${i * 0.8}s` } as CSSProperties}
                >
                  {label}
                </span>
              ))}

              <figcaption className="pop absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-[-3deg] rounded-2xl bg-ink px-5 py-3 whitespace-nowrap text-paper shadow-xl">
                <span className="block font-mono text-[0.7rem] text-paper/60">designer + developer</span>
                <span className="font-bold">Yash Sharma</span>
              </figcaption>
            </figure>
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

        {/* work: stacking cards — each project sticks and the next slides over it */}
        <section id="work" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={h2}>
              Selected <span className="text-accent">work</span>
            </h2>
            <p className="max-w-sm text-muted">
              Concept projects built end-to-end — design, code and copy — to show the range of what I
              can make for you.
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
                        Visit live site ↗
                      </a>
                    ) : (
                      <p className="mt-8 font-mono text-xs opacity-60">Concept project</p>
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

        <section id="services" className="scroll-mt-20 bg-ink text-paper">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 md:py-32">
            <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className={h2}>
                What I <span className="text-accent">build</span>
              </h2>
              <p className="max-w-sm text-paper/70">Clear scope, fixed price, no agency overhead. You talk directly to the person building your site.</p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <article
                  key={s.title}
                  className={`reveal flex flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
                    i === 0 ? "rotate-[-1deg] bg-accent text-ink" : "border border-paper/15 bg-paper/5"
                  }`}
                >
                  {i === 0 && <span className="mb-4 self-start rounded-full bg-ink px-3 py-1 font-mono text-[0.7rem] text-paper">Most popular</span>}
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
                    <span className="text-5xl font-extrabold tracking-tight">{s.from}</span>
                  </p>
                </article>
              ))}
            </div>
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
              I care about the details most people skip — how a page feels on a cheap phone, how fast
              it loads on bad Wi-Fi, and whether the button your customer needs is the{" "}
              <span className="bg-accent px-1">first thing they see.</span>
            </p>
            <p className="mt-8 font-mono text-sm text-muted">— Yash Sharma, Yash Techstudio</p>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="reveal">
              <h2 className={h2}>
                Got a project? <span className="text-accent">Let&rsquo;s talk.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Tell me a little about your business and what you need. I&rsquo;ll come back with
                questions, a rough plan and a fixed quote.
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
        <a href="#contact" className="group block overflow-hidden border-y-2 border-ink bg-accent py-8 text-ink" aria-label="Let’s build something — go to contact">
          <span className="marquee flex w-max gap-12 text-[clamp(3rem,8vw,7rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="flex items-center gap-12">
                Let&rsquo;s build something <span className="transition-transform duration-500 group-hover:rotate-90">✦</span>
              </span>
            ))}
          </span>
        </a>
      </main>

      <footer className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10">
          <p className="text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-extrabold tracking-[-0.06em]">
            Yash<span className="text-accent">.</span>Techstudio
          </p>
          <div className="mt-10 flex flex-col gap-3 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
            <p>Landing pages &amp; websites · Remote, worldwide</p>
            <div className="flex gap-6">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
              <a href="#contact" className="hover:text-paper">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
