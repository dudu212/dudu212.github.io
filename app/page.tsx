import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = getAllProjects().filter((p) => p.featured).slice(0, 3);
  const showcaseProjects =
    featuredProjects.length > 0 ? featuredProjects : getAllProjects().slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-6 pb-4">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          你好，我是 <span className="text-accent">dudu</span>
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-6 max-w-xl">
          前端工程师 · 关注 AI 与开发者工具 · 2026 秋招在即
        </p>
        <div className="flex gap-3 text-sm">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-md bg-foreground text-background hover:opacity-80 transition"
          >
            读文章
          </Link>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-md border border-border hover:border-foreground/40 transition"
          >
            看项目
          </Link>
          <a
            href="https://github.com/dudu212"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-md border border-border hover:border-foreground/40 transition"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">精选项目</h2>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-foreground transition"
          >
            全部 →
          </Link>
        </div>
        {showcaseProjects.length === 0 ? (
          <p className="text-muted text-sm">还没有项目。</p>
        ) : (
          <div className="grid gap-3">
            {showcaseProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group block p-4 rounded-lg border border-border hover:border-foreground/40 transition bg-card"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="font-medium group-hover:text-accent transition">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">最新文章</h2>
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition"
          >
            全部 →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-muted text-sm">还没有文章。</p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} hrefPrefix="/blog" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
