export const REPO = "https://github.com/actionplatform/action-platform";
export const RAW = "https://raw.githubusercontent.com/actionplatform/action-platform/master/docs";

export type DocPage = { slug: string; title: string };
export type DocGroup = { title: string; pages: DocPage[] };
export type DocIndex = { title: string; source: string; groups: DocGroup[] };

export async function fetchIndex(init?: RequestInit): Promise<DocIndex> {
  const r = await fetch(`${RAW}/index.json`, init);
  if (!r.ok) throw new Error(`index.json: ${r.status}`);
  return r.json();
}

export async function fetchDoc(slug: string, init?: RequestInit): Promise<string> {
  const r = await fetch(`${RAW}/${slug}.md`, init);
  if (!r.ok) throw new Error(`${slug}.md: ${r.status}`);
  return r.text();
}

export function pagesOf(index: DocIndex): DocPage[] {
  return index.groups.flatMap((g) => g.pages);
}

export function findPage(index: DocIndex, slug: string): { group: DocGroup; page: DocPage } | null {
  for (const group of index.groups) {
    const page = group.pages.find((p) => p.slug === slug);
    if (page) return { group, page };
  }
  return null;
}

export type Target = { kind: "doc"; slug: string; hash: string } | { kind: "repo"; href: string } | { kind: "external"; href: string } | { kind: "anchor"; href: string };

export function resolveLink(href: string): Target {
  if (href.startsWith("#")) return { kind: "anchor", href };
  if (/^[a-z]+:/i.test(href)) return { kind: "external", href };

  const [path, hash = ""] = href.split("#");
  const doc = path.match(/^(?:\.\/)?([a-z0-9_-]+)\.md$/i);
  if (doc) return { kind: "doc", slug: doc[1], hash: hash ? `#${hash}` : "" };

  const repo = path.replace(/^\.\.\//, "");
  return { kind: "repo", href: `${REPO}/blob/master/${path.startsWith("../") ? repo : `docs/${repo}`}${hash ? `#${hash}` : ""}` };
}

export function resolveAsset(src: string): string {
  if (/^[a-z]+:/i.test(src)) return src;
  return `${RAW}/${src.replace(/^\.\//, "")}`;
}
