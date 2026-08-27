import type { Metadata } from "next";
import { Newsreader, Noto_Serif_SC, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { ThemeScript } from "@/components/ThemeScript";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const serifLatin = Newsreader({
  variable: "--font-serif-latin",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const serifSC = Noto_Serif_SC({
  variable: "--font-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "dudu · 前端 & AI",
    template: "%s · dudu",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "dudu",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${serifLatin.variable} ${serifSC.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="ambient-bg" aria-hidden />
        <Header />
        <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-12">
          {children}
        </main>
        <Footer />
        <ProfileDrawer />
      </body>
    </html>
  );
}
