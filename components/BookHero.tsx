"use client";

import { useState } from "react";
import Link from "next/link";
import { Carousel } from "./Carousel";

type ProjectItem = { slug: string; title: string; tagline: string };
type PostItem = { slug: string; title: string; date: string };

type Props = {
  projects: ProjectItem[];
  posts: PostItem[];
  stack: string;
};

const MOTES = [
  { left: "18%", size: 6, dur: 15, delay: 0 },
  { left: "34%", size: 4, dur: 19, delay: 4 },
  { left: "52%", size: 7, dur: 13, delay: 2 },
  { left: "68%", size: 5, dur: 21, delay: 6 },
  { left: "82%", size: 4, dur: 17, delay: 1 },
];

export function BookHero({ projects, posts, stack }: Props) {
  const [open, setOpen] = useState(false);

  const projectSlides = projects.map((p) => (
    <Link
      key={p.slug}
      href={`/projects/${p.slug}`}
      className="vellum group block rounded-md p-6 min-h-[150px] transition hover:border-accent/50"
    >
      <div className="eyebrow mb-3">作品</div>
      <h3 className="font-serif text-2xl mb-2 group-hover:text-accent transition">
        {p.title}
      </h3>
      <p className="font-serif text-[15px] text-muted leading-[1.8]">
        {p.tagline}
      </p>
    </Link>
  ));

  const postSlides = posts.map((p, i) => (
    <Link
      key={p.slug}
      href={`/blog/${p.slug}`}
      className="vellum group block rounded-md p-6 min-h-[150px] transition hover:border-accent/50"
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="eyebrow">第 {String(i + 1).padStart(2, "0")} 篇</span>
        <time className="font-mono text-xs text-muted">{p.date}</time>
      </div>
      <h3 className="font-serif text-2xl group-hover:text-accent transition">
        {p.title}
      </h3>
    </Link>
  ));

  return (
    <div className={`book-stage ${open ? "is-open" : ""}`}>
      {/* 内页(翻开后可见)*/}
      <div className="leaf-inner">
        <div className="flex items-center justify-between mb-8">
          <div className="eyebrow">卷内 · 目录</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-muted hover:text-accent transition"
          >
            ‹ 合上封面
          </button>
        </div>

        <p className="font-serif text-[18px] leading-[1.95] text-foreground/85 mb-10">
          工程笔记 · 项目复盘 · 工具实验。关注大模型与 Agent
          如何真正落进日常开发。
        </p>

        <hr className="rule-double mb-8" />

        <div className="space-y-10">
          <Carousel label="精选作品" slides={projectSlides} />
          <Carousel label="近期文章" slides={postSlides} />
        </div>
      </div>

      {/* 封面(点击翻开,多段卷边)*/}
      <div className="book-spine" aria-hidden />
      <div className="leaf-cover">
        {/* 分段纸条:翻开时从右向左依次卷起 */}
        <div className="leaf-paper" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              className="strip"
              key={i}
              style={{ transitionDelay: `${(7 - i) * 55}ms` }}
            />
          ))}
        </div>

        <div className="leaf-content">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="mote"
              style={{
                left: m.left,
                bottom: "20%",
                width: m.size,
                height: m.size,
                animationDuration: `${m.dur}s`,
                animationDelay: `${m.delay}s`,
              }}
              aria-hidden
            />
          ))}

          <div className="cover-frame">
            <div className="eyebrow mb-6">卷首 · 手记</div>
            <h1 className="font-serif text-[clamp(34px,6vw,62px)] leading-[1.2] tracking-tight">
              重生之我用{" "}
              <span className="text-accent">AI</span>{" "}
              写前端
            </h1>
            <div className="flex items-center justify-center gap-4 mt-7">
              <span className="h-px w-10" style={{ background: "var(--rule)" }} />
              <span className="seal" aria-hidden>
                手记
              </span>
              <span className="h-px w-10" style={{ background: "var(--rule)" }} />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-muted">
              dudu 著 · {stack}
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-9 inline-flex items-center gap-2 border border-accent text-accent rounded px-6 py-2.5 font-serif text-[15px] tracking-wide hover:bg-accent hover:text-[#f5efe2] transition"
            >
              翻开本书 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
