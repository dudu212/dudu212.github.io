import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "AI、前端工程与开发者工具方向的文章与笔记。",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">博客</h1>
        <p className="text-muted">
          AI、前端与工程实践方向的文章。共 {posts.length} 篇。
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">还没有文章。</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} hrefPrefix="/blog" />
          ))}
        </div>
      )}
    </section>
  );
}
