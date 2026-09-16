"use client";

import GithubSlugger from "github-slugger";
import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LandingHeader } from "@/features/landing";
import { cn } from "@/lib/utils";
import { type DocIndex, fetchDoc, fetchIndex, findPage, pagesOf, REPO } from "@/lib/docs";
import { Markdown } from "./markdown";

type State = { index: DocIndex | null; source: string | null; error: string | null };

function headingsOf(source: string) {
  const slugger = new GithubSlugger();
  const out: { id: string; text: string }[] = [];
  let fenced = false;

  for (const line of source.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    if (fenced) continue;
    const m = /^## (.+)$/.exec(line);
    if (m) {
      const text = m[1].replace(/`/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
      out.push({ id: slugger.slug(text), text });
    }
  }

  return out;
}

function Sidebar({ index, slug, onPick }: { index: DocIndex; slug: string; onPick?: () => void }) {
  const item = "flex min-h-9 items-center rounded-md px-2.5 text-[13.5px] transition-colors";

  return (
    <nav aria-label="Documentation">
      {index.groups.map((g) => (
        <div key={g.title} className="mb-5">
          <div className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</div>
          <ul className="space-y-0.5">
            {g.pages.map((p) => (
              <li key={p.slug}>
                <Link href={`/docs/${p.slug}/`} onClick={onPick} aria-current={p.slug === slug ? "page" : undefined} className={cn(item, p.slug === slug ? "bg-surface-selected text-foreground" : "text-secondary hover:bg-surface-hover hover:text-foreground")}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ index: null, source: null, error: null });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, source: null, error: null }));

    Promise.all([fetchIndex(), fetchDoc(slug)])
      .then(([index, source]) => { if (alive) setState({ index, source, error: null }); })
      .catch((e: unknown) => { if (alive) setState((s) => ({ ...s, error: e instanceof Error ? e.message : String(e) })); });

    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    if (!state.source || !window.location.hash) return;
    const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    el?.scrollIntoView();
  }, [state.source]);

  const headings = useMemo(() => (state.source ? headingsOf(state.source) : []), [state.source]);
  const found = state.index ? findPage(state.index, slug) : null;
  const pages = state.index ? pagesOf(state.index) : [];
  const at = pages.findIndex((p) => p.slug === slug);
  const prev = at > 0 ? pages[at - 1] : null;
  const next = at >= 0 && at < pages.length - 1 ? pages[at + 1] : null;

  useEffect(() => {
    document.title = found ? `${found.page.title} · Action Platform docs` : "Action Platform docs";
  }, [found]);

  return (
    <div className="min-h-screen">
      <LandingHeader />
      <div className="mx-auto flex w-full max-w-[1400px] gap-10 px-5 md:px-8">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto border-r border-border py-8 pr-5 lg:block">
          {state.index && <Sidebar index={state.index} slug={slug} />}
        </aside>

        <div className="min-w-0 flex-1 py-6 lg:py-10">
          {state.index && (
            <div className="mb-5 lg:hidden">
              <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex h-11 w-full items-center justify-between rounded-md border border-border px-3 text-sm">
                <span className="text-secondary">{found ? `${found.group.title} · ${found.page.title}` : "Documentation"}</span>
                <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} strokeWidth={1.75} />
              </button>
              {open && <div className="mt-2 rounded-md border border-border p-3"><Sidebar index={state.index} slug={slug} onPick={() => setOpen(false)} /></div>}
            </div>
          )}

          {state.error && (
            <div className="rounded-md border border-border p-4 text-sm">
              <p className="text-foreground">Could not load this page.</p>
              <p className="mt-1 font-mono text-[12.5px] text-secondary">{state.error}</p>
              <a href={`${REPO}/blob/master/docs/${slug}.md`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-secondary hover:text-foreground">Read it on GitHub <ExternalLink className="size-3.5" strokeWidth={1.75} /></a>
            </div>
          )}

          {!state.error && !state.source && (
            <div className="space-y-3" aria-busy>
              <div className="h-8 w-2/5 animate-pulse rounded bg-surface-hover" />
              <div className="h-4 w-full animate-pulse rounded bg-surface-hover" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-surface-hover" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-surface-hover" />
            </div>
          )}

          {state.source && (
            <div className="flex gap-10">
              <div className="min-w-0 flex-1">
                <Markdown source={state.source} />
                <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    {prev && <Link href={`/docs/${prev.slug}/`} className="text-secondary hover:text-foreground">← {prev.title}</Link>}
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={`${REPO}/edit/master/docs/${slug}.md`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Edit on GitHub</a>
                    {next && <Link href={`/docs/${next.slug}/`} className="text-secondary hover:text-foreground">{next.title} →</Link>}
                  </div>
                </div>
              </div>
              {headings.length > 1 && (
                <aside className="sticky top-24 hidden h-fit w-48 shrink-0 xl:block">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">On this page</div>
                  <ul className="space-y-1 border-l border-border">
                    {headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-3 text-[13px] text-secondary hover:border-foreground hover:text-foreground">{h.text}</a></li>)}
                  </ul>
                </aside>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
