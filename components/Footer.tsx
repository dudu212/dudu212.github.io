const GITHUB_USERNAME = "dudu212";
const EMAIL = "";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <div>© {year} dudu · 前端 & AI</div>
        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition"
          >
            GitHub
          </a>
          {EMAIL && (
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-foreground transition"
            >
              Email
            </a>
          )}
          <a href="/rss.xml" className="hover:text-foreground transition">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
