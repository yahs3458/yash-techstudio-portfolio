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
  "Yash Sharma designs and builds fast, beautiful landing pages and websites for small businesses and startups. Remote, worldwide.";

// og/twitter image comes from app/opengraph-image.png (Next file convention)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.yashtechstudio.com"),
  title: "Yash Techstudio — Landing pages & websites that sell",
  description,
  openGraph: {
    title: "Yash Techstudio — Websites that sell",
    description,
    url: "/",
    siteName: "Yash Techstudio",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Yash Techstudio — Websites that sell", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
