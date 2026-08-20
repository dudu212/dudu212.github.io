import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...rest }) => {
      const isInternal =
        typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));
      if (isInternal) {
        return (
          <Link href={href} {...(rest as Record<string, unknown>)}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    },
    // eslint-disable-next-line @next/next/no-img-element
    img: ({ src, alt, ...rest }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        loading="lazy"
        className="rounded-md my-6"
        {...rest}
      />
    ),
    ...components,
  };
}
