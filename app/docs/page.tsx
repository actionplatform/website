import type { Metadata } from "next";
import { DocsShell } from "@/features/docs";
import { fetchIndex, homePage } from "@/lib/docs";

export async function generateMetadata(): Promise<Metadata> {
  const home = homePage(await fetchIndex({ cache: "force-cache" }));
  return {
    title: "Docs · Action Platform",
    description: home?.description,
    alternates: { canonical: "/docs/" },
  };
}

export default async function DocsHome() {
  const home = homePage(await fetchIndex({ cache: "force-cache" }));
  return <DocsShell slug={home?.slug ?? "README"} />;
}
