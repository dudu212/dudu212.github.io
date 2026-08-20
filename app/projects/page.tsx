import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "项目",
  description: "个人项目与作品。",
};

const STATUS_LABEL: Record<string, string> = {
  active: "进行中",
  paused: "暂停",
  archived: "归档",
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">项目</h1>
        <p className="text-muted">个人项目 · 作品集</p>
      </header>

      {projects.length === 0 ? (
        <p className="text-muted">还没有项目。</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-5 rounded-lg border border-border hover:border-foreground/40 transition bg-card"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <h3 className="text-lg font-medium group-hover:text-accent transition">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="shrink-0 text-xs text-muted font-mono">
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                )}
              </div>
              {project.tagline && (
                <p className="text-sm text-muted leading-relaxed mb-2">
                  {project.tagline}
                </p>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted"
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
