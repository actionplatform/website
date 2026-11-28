import type { MetadataRoute } from "next";
import { fetchIndex, pagesOf, SITE } from "@/lib/docs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const index = await fetchIndex({ cache: "force-cache" });
  return [
    { url: `${SITE}/` },
    { url: `${SITE}/docs/` },
    ...pagesOf(index).map((p) => ({ url: `${SITE}/docs/${p.slug}/` })),
  ];
}
