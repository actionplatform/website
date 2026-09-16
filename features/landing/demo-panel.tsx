"use client";

import { Check, ChevronDown, Code2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = ["Template", "Configure", "Repository", "Deploy"];
const LINES = ["Repository created", "Release v0.1.0 published", "Deployed to AWS Lambda"];

export function DemoPanel() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= LINES.length) {
      const reset = setTimeout(() => setDone(0), 3200);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setDone((n) => n + 1), done === 0 ? 700 : 900);
    return () => clearTimeout(t);
  }, [done]);

  const finished = done >= LINES.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface" role="img" aria-label="A new project going from template to deploy">
      <div className="flex h-12 items-center justify-between border-b border-border px-4">
        <span className="text-sm font-semibold">New project</span>
        <span className="flex size-8 items-center justify-center rounded-md text-secondary"><MoreHorizontal className="size-4" strokeWidth={1.75} /></span>
      </div>

      <ol className="flex items-center gap-2 overflow-x-auto px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s} className="flex shrink-0 items-center gap-2">
            <span className={cn("flex h-8 items-center gap-2 rounded-md border px-2.5 text-xs", i === 0 ? "border-foreground bg-foreground text-primary-foreground" : "border-border text-secondary")}>
              <span className={cn("flex size-4 items-center justify-center rounded-full border text-[10px]", i === 0 ? "border-primary-foreground/40" : "border-border")}>{i + 1}</span>
              {s}
            </span>
            {i < STEPS.length - 1 && <span aria-hidden className="h-px w-5 bg-border md:w-6" />}
          </li>
        ))}
      </ol>

      <div className="border-t border-border px-4 py-4">
        <div className="mb-1.5 text-xs text-secondary">Template</div>
        <div className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border"><Code2 className="size-4 text-secondary" strokeWidth={1.75} /></span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-mono text-sm">web-python-fastapi</span>
            <span className="block truncate text-xs text-secondary">A modern Python web app with FastAPI</span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-secondary" strokeWidth={1.75} />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="flex h-10 items-center justify-between px-4">
          <span className="text-xs font-medium">Terminal</span>
          <span className="flex items-center gap-1.5 text-xs text-secondary" aria-live="polite">
            <span aria-hidden className={cn("size-1.5 rounded-full transition-colors duration-500", finished ? "bg-foreground" : "bg-muted-foreground animate-pulse")} />
            {finished ? "Completed in 12s" : "Running…"}
          </span>
        </div>
        <pre className="px-4 pb-4 font-mono text-[13px] leading-6 text-secondary">
          <div className="text-foreground">$ action-platform init</div>
          {LINES.map((l, i) => (
            <div key={l} className={cn("flex items-center gap-2 transition-opacity duration-500", i < done ? "opacity-100" : "opacity-0")}>
              <Check className="size-3.5 shrink-0 text-foreground" strokeWidth={2} aria-hidden="true" />{l}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
