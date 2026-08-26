"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "扉页" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "作品" },
  { href: "/about", label: "关于" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="vellum sticky top-0 z-20">
      <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-[0.14em] text-muted hover:text-accent transition"
        >
          dudu.dev
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] tracking-wide transition ${
                  active
                    ? "text-accent"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                style={active ? { textUnderlineOffset: "6px" } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
