import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent transition"
        >
          dudu.dev
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-muted hover:text-foreground transition rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
