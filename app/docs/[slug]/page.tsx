import { DocsShell } from "@/features/docs";
import { fetchIndex, pagesOf } from "@/lib/docs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const index = await fetchIndex({ cache: "no-store" });
  return pagesOf(index).map((p) => ({ slug: p.slug }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DocsShell slug={slug} />;
}
