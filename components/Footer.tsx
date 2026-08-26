const GITHUB_USERNAME = "dudu212";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* 版权页 / colophon */}
        <div className="font-mono text-[11px] leading-[1.9] tracking-[0.08em] text-muted">
          <div>初刊 · MMXXVI — 排版于 Next.js &amp; Noto Serif</div>
          <div>
            著者 dudu · 前端 &amp; AI ·{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition"
            >
              GITHUB
            </a>{" "}
            ·{" "}
            <a href="/rss.xml" className="hover:text-accent transition">
              RSS
            </a>
          </div>
          <div className="mt-3 text-foreground/40">© {year} 版权所有 · 翻印不究</div>
        </div>
      </div>
    </footer>
  );
}
