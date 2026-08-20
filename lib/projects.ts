import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  date?: string;
  status?: "active" | "paused" | "archived";
  tags?: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllProjects(): ProjectMeta[] {
  const files = listMdxFiles(PROJECTS_DIR);
  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      tagline: (data.tagline as string) ?? "",
      date: data.date as string | undefined,
      status: (data.status as ProjectMeta["status"]) ?? "active",
      tags: (data.tags as string[]) ?? [],
      repo: data.repo as string | undefined,
      demo: data.demo as string | undefined,
      featured: data.featured === true,
    } satisfies ProjectMeta;
  });

  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.date ?? "") < (b.date ?? "") ? 1 : -1;
  });
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
