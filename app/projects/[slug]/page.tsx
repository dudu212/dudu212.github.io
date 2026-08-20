import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectSlugs } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getAllProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  const { default: MDXContent } = await import(
    `@/content/projects/${slug}.mdx`
  );

  return (
    <article>
      <nav className="mb-8 text-sm">
        <Link
          href="/projects"
          className="text-muted hover:text-foreground transition"
        >
          ← 返回项目
        </Link>
      </nav>

      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="text-muted mb-4">{project.tagline}</p>
        )}
        <div className="flex items-center gap-4 text-sm font-mono">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              仓库 ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              Demo ↗
            </a>
          )}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent">
        <MDXContent />
      </div>
    </article>
  );
}
