"use client";

import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Templates", href: "https://github.com/actionplatform/templates" },
  { label: "Docs", href: "https://github.com/actionplatform/action-platform/tree/master/docs" },
  { label: "GitHub", href: "https://github.com/actionplatform" },
];

const link = "inline-flex h-9 items-center rounded-md px-3 text-sm text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground";

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2.5 px-5 md:h-16 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"><Logo className="size-5" /><span className="text-[15px] font-semibold">action-platform</span></Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => l.href.startsWith("#") ? <a key={l.label} href={l.href} className={link}>{l.label}</a> : <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={link}>{l.label}</a>)}
          <span aria-hidden className="mx-2 h-5 w-px bg-border" />
          <Link href="/login"><Button size="sm" variant="outline" className="h-9">Sign in</Button></Link>
          <Link href="/login"><Button size="sm" className="h-9">Get started</Button></Link>
        </nav>
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="landing-menu" onClick={() => setOpen((v) => !v)} className="ml-auto flex size-11 items-center justify-center rounded-md text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground lg:hidden">
          {open ? <X className="size-5" strokeWidth={1.75} /> : <MenuIcon className="size-5" strokeWidth={1.75} />}
        </button>
      </div>
      {open && (
        <nav id="landing-menu" aria-label="Main" className="border-t border-border bg-background px-5 py-3 lg:hidden">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.label}><a href={l.href} target={l.href.startsWith("#") ? undefined : "_blank"} rel={l.href.startsWith("#") ? undefined : "noopener noreferrer"} onClick={() => setOpen(false)} className="flex h-11 items-center rounded-md px-2 text-sm text-secondary hover:bg-surface-hover hover:text-foreground">{l.label}</a></li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <Link href="/login"><Button variant="outline" className="h-11 w-full">Sign in</Button></Link>
            <Link href="/login"><Button className="h-11 w-full">Get started</Button></Link>
          </div>
        </nav>
      )}
    </header>
  );
}
