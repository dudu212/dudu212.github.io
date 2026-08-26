"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "dudu212";

const STACK = [
  "React · Next.js · TypeScript",
  "Tailwind · MDX",
  "MCP · Agent · RSC",
];

export function ProfileDrawer() {
  const [open, setOpen] = useState(false);

  // Esc 关闭
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {!open && (
        <button
          type="button"
          className="bookmark-tab"
          onClick={() => setOpen(true)}
          aria-label="展开个人主页"
        >
          个人主页
        </button>
      )}

      <div
        className="drawer-backdrop"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside
        className="drawer-panel vellum"
        data-open={open}
        role="dialog"
        aria-modal={open}
        aria-label="个人主页"
      >
        <div className="p-7">
          <div className="flex items-start justify-between mb-6">
            <div className="seal" aria-hidden>
              手记
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="收起"
              className="font-mono text-sm text-muted hover:text-accent transition"
            >
              收起 ✕
            </button>
          </div>

          <h2 className="font-serif text-2xl mb-1">dudu</h2>
          <p className="text-[15px] text-muted leading-relaxed mb-6">
            前端工程师。在 AI 加速交付的边界上写代码、写笔记、写复盘。
          </p>

          <div className="eyebrow mb-2">在学 · 关注</div>
          <ul className="mb-6 space-y-1 text-[14px] text-foreground/80 font-serif">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <hr className="rule-double my-6" />

          <div className="eyebrow mb-3">寻我</div>
          <div className="flex flex-col gap-2 font-mono text-[13px]">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 hover:text-accent transition"
            >
              GITHUB ↗
            </a>
            <a
              href="/rss.xml"
              className="text-foreground/80 hover:text-accent transition"
            >
              RSS ↗
            </a>
            <a
              href="/about"
              onClick={() => setOpen(false)}
              className="text-foreground/80 hover:text-accent transition"
            >
              关于我 →
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
