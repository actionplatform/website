import type { Metadata } from "next";
import { DocsShell } from "@/features/docs";
import { fetchIndex, findPage, pagesOf } from "@/lib/docs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const index = await fetchIndex({ cache: "no-store" });
  return pagesOf(index).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = findPage(await fetchIndex({ cache: "force-cache" }), slug);
  if (!found) return { title: "Action Platform docs" };
  return {
    title: `${found.page.title} · Action Platform docs`,
    description: found.page.description,
    alternates: { canonical: `/docs/${slug}/` },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DocsShell slug={slug} />;
}
