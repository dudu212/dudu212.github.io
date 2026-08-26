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
      className="group block py-5 border-b border-border/70 last:border-b-0"
    >
      <div className="flex items-baseline justify-between gap-4 mb-1.5">
        <h3 className="font-serif text-xl group-hover:text-accent transition">
          {post.title}
        </h3>
        <time className="shrink-0 text-xs text-muted font-mono tracking-wide">
          {post.date}
        </time>
      </div>
      {post.description && (
        <p className="font-serif text-[15px] text-muted leading-[1.8] mb-2">
          {post.description}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-mono text-accent/70 tracking-wide">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
