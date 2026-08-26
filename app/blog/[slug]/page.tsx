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
    <article className="mx-auto max-w-3xl">
      <nav className="mb-8 text-sm">
        <Link
          href="/blog"
          className="font-mono text-xs tracking-wide text-muted hover:text-accent transition"
        >
          ← 返回文章
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-[clamp(30px,5vw,46px)] leading-[1.25] tracking-tight mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-muted font-mono tracking-wide">
          <time>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-rule">·</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-accent/70">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <hr className="rule-double mt-6" />
      </header>

      <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-code:before:content-none prose-code:after:content-none">
        <MDXContent />
      </div>
    </article>
  );
}
