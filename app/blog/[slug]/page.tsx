import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: MDXContent } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article>
      <nav className="mb-8 text-sm">
        <Link href="/blog" className="text-muted hover:text-foreground transition">
          ← 返回博客
        </Link>
      </nav>

      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted font-mono">
          <time>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent prose-code:before:content-none prose-code:after:content-none">
        <MDXContent />
      </div>
    </article>
  );
}
