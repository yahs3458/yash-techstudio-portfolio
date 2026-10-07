// Rule-based website audit: no AI, just checks a business owner would care about.

export type Finding = { title: string; why: string; penalty: number };

const BOOKING = /\b(book|booking|appointment|reserve|reservation|schedule|order online|order now|get a quote|free quote)\b/i;

export function auditHtml(html: string, finalUrl: string, year = new Date().getFullYear()): Finding[] {
  const f: Finding[] = [];
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ");

  if (!finalUrl.startsWith("https://"))
    f.push({ penalty: 15, title: "No secure padlock (HTTPS)", why: "Browsers mark the site “Not secure”, which scares visitors away before they read anything." });

  if (!/<meta[^>]+name=["']viewport["']/i.test(html))
    f.push({ penalty: 20, title: "Not set up for phones", why: "Most visitors arrive on a phone. Without mobile layout, they have to pinch and zoom, and many just leave." });

  const years = [...text.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?((?:19|20)\d{2})/gi)].map((m) => +m[1]);
  const latest = years.length ? Math.max(...years) : 0;
  if (latest && latest < year - 1)
    f.push({ penalty: 10, title: `Footer still says ${latest}`, why: "An old year makes the business look closed or neglected, even when it isn’t." });

  if (!/href=["']tel:/i.test(html))
    f.push({ penalty: 10, title: "No tap-to-call button", why: "On a phone, customers expect to tap your number once. Making them copy it loses calls." });

  const ctas = [...text.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/gi)].some((m) => BOOKING.test(m[2].replace(/<[^>]+>/g, " ")));
  if (!ctas)
    f.push({ penalty: 15, title: "No clear booking or order button", why: "Visitors who are ready to buy can’t find the next step, so they go to a competitor who makes it obvious." });

  if ((html.match(/href=["']#["']/gi) ?? []).length >= 3)
    f.push({ penalty: 5, title: "Links that go nowhere", why: "Several buttons or menu items point to “#” and do nothing when tapped." });

  if (/lorem ipsum/i.test(text))
    f.push({ penalty: 10, title: "Placeholder text left on the site", why: "“Lorem ipsum” filler text tells visitors the site was never finished." });

  if (!/<title>[^<]{3,}<\/title>/i.test(html) || !/<meta[^>]+name=["']description["']/i.test(html))
    f.push({ penalty: 5, title: "Missing Google search text", why: "Without a proper title and description, Google shows a messy snippet and fewer people click." });

  return f;
}

export function speedFinding(score: number | null): Finding | null {
  if (score === null) return null;
  if (score < 50) return { penalty: 20, title: `Slow on phones (speed ${score}/100)`, why: "Google’s own test says the site loads slowly on mobile. Every extra second loses visitors and search ranking." };
  if (score < 90) return { penalty: 10, title: `Could load faster (speed ${score}/100)`, why: "The site is okay but not fast. Faster sites rank higher on Google and keep more visitors." };
  return null;
}

export const scoreOf = (f: Finding[]) => Math.max(0, 100 - f.reduce((s, x) => s + x.penalty, 0));

// self-check: `node --experimental-strip-types src/lib/audit.ts`
if (typeof process !== "undefined" && process.argv[1]?.endsWith("audit.ts")) {
  const bad = auditHtml(`<title>x</title><p>© 2019 Shop</p><a href="#">a</a><a href="#">b</a><a href="#">c</a> lorem ipsum`, "http://x.com", 2026);
  console.assert(bad.length === 8, "bad site should fail every check", bad.map((b) => b.title));
  console.assert(scoreOf(bad) === 10, "score", scoreOf(bad));
  const good = auditHtml(
    `<title>Good Cafe</title><meta name="description" content="x"><meta name="viewport" content="width=device-width">
     <a href="tel:123">Call</a><a href="/book">Book a table</a><footer>© 2018–2026</footer>`,
    "https://x.com",
    2026,
  );
  console.assert(good.length === 0, "good site should pass", good.map((g) => g.title));
  console.assert(speedFinding(40)?.penalty === 20 && speedFinding(95) === null, "speed");
  console.log("audit self-check done");
}
