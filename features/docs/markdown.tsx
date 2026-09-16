"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { resolveAsset, resolveLink } from "@/lib/docs";
import { Mermaid } from "./mermaid";

function Anchor({ href = "", children, ...rest }: ComponentProps<"a">) {
  const target = resolveLink(href);

  if (target.kind === "doc") return <Link href={`/docs/${target.slug}/${target.hash}`} {...rest}>{children}</Link>;
  if (target.kind === "anchor") return <a href={target.href} {...rest}>{children}</a>;

  return <a href={target.href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

function Image({ src = "", alt = "" }: ComponentProps<"img">) {
  return <img src={resolveAsset(typeof src === "string" ? src : "")} alt={alt} loading="lazy" />;
}

function Pre({ children }: { children?: ReactNode }) {
  const child = Array.isArray(children) ? children[0] : children;
  const props = child && typeof child === "object" && "props" in child ? (child.props as { className?: string; children?: ReactNode }) : null;
  const language = /language-(\w+)/.exec(props?.className ?? "")?.[1];
  const code = typeof props?.children === "string" ? props.children : "";

  if (language === "mermaid") return <Mermaid code={code.trim()} />;

  return (
    <div className="doc-pre">
      {language && <span className="doc-lang">{language}</span>}
      <pre className="doc-code">{children}</pre>
    </div>
  );
}

function Table({ children }: { children?: ReactNode }) {
  return <div className="doc-table"><table>{children}</table></div>;
}

export function Markdown({ source }: { source: string }) {
  return (
    <article className="doc">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{ a: Anchor, img: Image, pre: Pre, table: Table }}>
        {source}
      </ReactMarkdown>
    </article>
  );
}
