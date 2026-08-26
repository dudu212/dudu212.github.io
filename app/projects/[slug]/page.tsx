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
    <article className="mx-auto max-w-3xl">
      <nav className="mb-8 text-sm">
        <Link
          href="/projects"
          className="font-mono text-xs tracking-wide text-muted hover:text-accent transition"
        >
          ← 返回作品
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-[clamp(30px,5vw,46px)] leading-[1.25] tracking-tight mb-2">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="font-serif text-muted mb-4">{project.tagline}</p>
        )}
        <div className="flex items-center gap-3 text-sm font-mono">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="border border-border rounded px-3 py-1.5 text-accent hover:border-accent transition"
            >
              仓库 ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="border border-border rounded px-3 py-1.5 text-accent hover:border-accent transition"
            >
              Demo ↗
            </a>
          )}
        </div>
        <hr className="rule-double mt-6" />
      </header>

      <div className="prose prose-neutral max-w-none prose-headings:font-serif">
        <MDXContent />
      </div>
    </article>
  );
}
