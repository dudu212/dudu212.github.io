import Link from "next/link";

export type PostCardData = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

type Props = {
  post: PostCardData;
  hrefPrefix: string;
};

export function PostCard({ post, hrefPrefix }: Props) {
  return (
    <Link
      href={`${hrefPrefix}/${post.slug}`}
      className="group block py-5 border-b border-border last:border-b-0 hover:border-foreground/40 transition"
    >
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="text-lg font-medium group-hover:text-accent transition">
          {post.title}
        </h3>
        <time className="shrink-0 text-xs text-muted font-mono">
          {post.date}
        </time>
      </div>
      {post.description && (
        <p className="text-sm text-muted leading-relaxed mb-2">
          {post.description}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-muted px-1.5 py-0.5 rounded bg-card"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
