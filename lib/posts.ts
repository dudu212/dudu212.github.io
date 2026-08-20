import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category?: "blog" | "notes";
  published?: boolean;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const files = listMdxFiles(POSTS_DIR);
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      description: data.description as string | undefined,
      tags: (data.tags as string[]) ?? [],
      category: (data.category as "blog" | "notes") ?? "blog",
      published: data.published !== false,
    } satisfies PostMeta;
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
