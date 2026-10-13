import type { MetadataRoute } from "next";

const BASE = "https://www.yashtechstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pay`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
