import { BookHero } from "@/components/BookHero";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";

const STACK = "Next.js 16 · React 19 · Tailwind 4 · MDX";

export default function HomePage() {
  const posts = getAllPosts()
    .slice(0, 5)
    .map((p) => ({ slug: p.slug, title: p.title, date: p.date }));
  const featured = getAllProjects().filter((p) => p.featured);
  const list = (featured.length > 0 ? featured : getAllProjects()).slice(0, 5);
  const projects = list.map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
  }));

  return <BookHero projects={projects} posts={posts} stack={STACK} />;
}
