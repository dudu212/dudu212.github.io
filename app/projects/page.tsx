import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "作品",
  description: "个人项目与作品。",
};

const STATUS_LABEL: Record<string, string> = {
  active: "进行中",
  paused: "暂停",
  archived: "归档",
};

const STATUS_DOT: Record<string, string> = {
  active: "var(--accent)",
  paused: "#b08422",
  archived: "var(--muted)",
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <section>
      <header className="mb-8">
        <div className="eyebrow mb-4">作品 · 集</div>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight">
          作品
        </h1>
        <p className="font-serif text-muted mt-2">个人项目 · 作品集</p>
        <hr className="rule-double mt-8" />
      </header>

      {projects.length === 0 ? (
        <p className="text-muted">还没有作品。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="vellum group block rounded-md p-5 transition hover:border-accent/50"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <h3 className="font-serif text-lg group-hover:text-accent transition">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] text-muted font-mono tracking-wide">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: STATUS_DOT[project.status] }}
                      aria-hidden
                    />
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                )}
              </div>
              {project.tagline && (
                <p className="font-serif text-sm text-muted leading-relaxed mb-3">
                  {project.tagline}
                </p>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-accent/70 tracking-wide"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
