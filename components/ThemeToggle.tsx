"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("theme-dark")) return "dark";
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${next}`);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const label = theme === "dark" ? "切换到浅色" : "切换到深色";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="glass inline-flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-accent hover:border-accent transition"
    >
      {mounted ? (theme === "dark" ? "☀" : "☾") : "·"}
    </button>
  );
}
