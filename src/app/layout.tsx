import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const description =
  "Yashh Techstudio builds custom AI agents, small SaaS products and the websites around them — with a human in the loop where it counts. Remote, worldwide.";

// og/twitter image comes from app/opengraph-image.png (Next file convention)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.yashtechstudio.com"),
  title: { default: "Yashh Techstudio — AI agents that do the work", template: "%s · Yashh Techstudio" },
  description,
  applicationName: "Yashh Techstudio",
  keywords: [
    "AI agent development",
    "custom AI agents",
    "AI automation agency",
    "WhatsApp AI agent",
    "AI chatbot for business",
    "multi-agent systems",
    "agentic AI developer",
    "SaaS MVP development",
    "Next.js developer",
    "landing page design",
    "website development India",
  ],
  authors: [{ name: "Yashh Sharma", url: "https://www.yashtechstudio.com" }],
  creator: "Yashh Sharma",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "technology",
  openGraph: {
    title: "Yashh Techstudio — AI agents that do the work",
    description,
    url: "/",
    siteName: "Yashh Techstudio",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Yashh Techstudio — AI agents that do the work", description, creator: "@yashtechstudio" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
