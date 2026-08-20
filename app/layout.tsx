import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  description: "前端工程师，关注 AI、开发者工具与工程实践。分享学习笔记与项目复盘。",
  metadataBase: new URL("https://dudu-site.vercel.app"),
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
