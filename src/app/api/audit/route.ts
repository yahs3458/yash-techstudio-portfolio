import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { auditHtml, scoreOf, speedFinding } from "@/lib/audit";

// Fetching arbitrary URLs from our server: refuse anything that resolves to a private/internal address.
function privateIp(ip: string) {
  if (isIP(ip) === 6) return ip === "::1" || /^(fc|fd|fe80|::ffff:(10|127|169\.254|192\.168)\.)/i.test(ip);
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
}

async function safeUrl(raw: string) {
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (!/^https?:$/.test(url.protocol) || (url.port && !["80", "443"].includes(url.port))) throw new Error("Only normal website addresses can be checked.");
  const addrs = await lookup(url.hostname, { all: true });
  if (addrs.some((a) => privateIp(a.address))) throw new Error("That address can’t be checked.");
  return url;
}

async function fetchPage(start: string) {
  let url = await safeUrl(start);
  for (let hop = 0; hop < 4; hop++) {
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; YashTechstudioAudit/1.0; +https://www.yashtechstudio.com/audit)" },
    });
    const next = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && next) {
      url = await safeUrl(new URL(next, url).href);
      continue;
    }
    if (!res.ok) throw new Error(`The site answered with an error (${res.status}).`);
    return { html: (await res.text()).slice(0, 2_000_000), finalUrl: url.href };
  }
  throw new Error("The site redirects too many times.");
}

async function speedScore(url: string): Promise<number | null> {
  const q = new URLSearchParams({ url, strategy: "mobile", category: "performance" });
  if (process.env.PAGESPEED_KEY) q.set("key", process.env.PAGESPEED_KEY);
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`, { signal: AbortSignal.timeout(50_000) });
    const json = await res.json();
    const s = json?.lighthouseResult?.categories?.performance?.score;
    return typeof s === "number" ? Math.round(s * 100) : null;
  } catch {
    return null; // speed is a bonus check; the audit still works without it
  }
}

export const maxDuration = 60;

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("url")?.trim();
  if (!raw) return Response.json({ error: "Enter a website address." }, { status: 400 });
  try {
    const { html, finalUrl } = await fetchPage(raw);
    const speed = await speedScore(finalUrl);
    const findings = [...auditHtml(html, finalUrl), speedFinding(speed)].filter((x) => x !== null).sort((a, b) => b.penalty - a.penalty);
    return Response.json({ url: finalUrl, score: scoreOf(findings), speed, findings });
  } catch (e) {
    const msg = e instanceof Error && !/fetch failed|ENOTFOUND|Invalid URL/i.test(e.message) ? e.message : "Couldn’t open that website. Check the address and try again.";
    return Response.json({ error: msg }, { status: 422 });
  }
}
