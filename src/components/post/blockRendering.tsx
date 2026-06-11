import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isValidElement } from "react";
import { LspCode, MarkdownCode } from "./CodeSample";

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function readTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return `${node}`;
  }

  if (Array.isArray(node)) {
    return node.map(readTextContent).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return readTextContent(node.props.children);
  }

  return "";
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function LinkHeading({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  const slug = makeSlug(readTextContent(children));

  return (
    <h2
      {...props}
      id={slug || undefined}
      className={joinClassNames(
        "headline-medium scroll-mt-20 mt-6 font-bold",
        className,
      )}
    >
      {slug ? (
        <a
          href={`#${slug}`}
          className="link decoration-transparent hover:decoration-primary"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </h2>
  );
}

function ExternalLink({
  children,
  className,
  href,
  rel,
  target,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isExternal = href ? /^(https?:)?\/\//.test(href) : false;

  return (
    <a
      {...props}
      href={href}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={rel ?? (isExternal ? "noreferrer" : undefined)}
      className={joinClassNames("link", className)}
    >
      {children}
    </a>
  );
}

function MarkdownPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  if (!isValidElement(children)) {
    return <pre {...props}>{children}</pre>;
  }

  const codeProps = children.props as {
    children?: ReactNode;
    className?: string;
  };

  return (
    <MarkdownCode
      language={codeProps.className?.replace("language-", "") || "text"}
    >
      {codeProps.children}
    </MarkdownCode>
  );
}

function ArticleSection({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section {...props} className={joinClassNames("my-10", className)}>
      {children}
    </section>
  );
}

function CustomImage({
  alt,
  className,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  return (
    <figure className="my-8 overflow-hidden rounded-[1.5rem]">
      <img
        {...props}
        alt={alt}
        className={joinClassNames("w-full rounded-[1.5rem]", className)}
      />
      {alt ? (
        <figcaption className="body-medium mt-3 text-center opacity-80">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents = {
  h2: LinkHeading,
  a: ExternalLink,
  pre: MarkdownPre,
  section: ArticleSection,
  img: CustomImage,
  LspCode,
  MarkdownCode,
} as const;
