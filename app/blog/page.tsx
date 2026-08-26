import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "AI、前端工程与开发者工具方向的文章与笔记。",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section>
      <header className="mb-8">
        <div className="eyebrow mb-4">文章 · 卷</div>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] tracking-tight">
          文章
        </h1>
        <p className="font-serif text-muted mt-2">
          AI、前端与工程实践方向的文字，共 {posts.length} 篇。
        </p>
        <hr className="rule-double mt-8" />
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
