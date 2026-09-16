"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); } }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100", className)}>
      {children}
    </div>
  );
}

const LINES = [
  "$ action-platform init shop-api --type web --stack python --cloud aws/lambda",
  "$ action-platform release            # v0.1.0 tagged and published",
  "$ action-platform deploy --stage dev # credentials from the deploy proxy, no AWS key",
  "→ https://evw6kw2ad9.execute-api.us-east-1.amazonaws.com/health  {\"status\":\"ok\",\"version\":\"0.1.0\"}",
];

export function Terminal() {
  const [typed, setTyped] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (typed >= LINES.length) return;
    const line = LINES[typed];
    if (chars < line.length) {
      const t = setTimeout(() => setChars((c) => c + 1), line.startsWith("→") ? 8 : 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setTyped((n) => n + 1); setChars(0); }, 420);
    return () => clearTimeout(t);
  }, [typed, chars]);

  return (
    <pre className="min-h-[9rem] overflow-x-auto p-4 font-mono text-[13px] leading-6 text-secondary md:min-h-[10rem] md:p-6 md:text-sm" aria-label="Terminal session">
      {LINES.slice(0, typed).map((l, i) => <div key={i} className={l.startsWith("→") ? "text-foreground" : undefined}>{l}</div>)}
      {typed < LINES.length && <div className={LINES[typed].startsWith("→") ? "text-foreground" : undefined}>{LINES[typed].slice(0, chars)}<span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-foreground align-middle" /></div>}
    </pre>
  );
}

export function LiveStatus() {
  const [phase, setPhase] = useState<"queued" | "running" | "done">("queued");

  useEffect(() => {
    const a = setTimeout(() => setPhase("running"), 900);
    const b = setTimeout(() => setPhase("done"), 3400);
    const c = setInterval(() => { setPhase("queued"); setTimeout(() => setPhase("running"), 900); setTimeout(() => setPhase("done"), 3400); }, 7000);
    return () => { clearTimeout(a); clearTimeout(b); clearInterval(c); };
  }, []);

  const tone = phase === "done" ? "border-status-ok/30 bg-status-ok/10 text-status-ok" : phase === "running" ? "border-status-warn/30 bg-status-warn/10 text-status-warn" : "border-border text-secondary";
  const label = phase === "done" ? "Successful" : phase === "running" ? "Running" : "Queued";

  return <span className={cn("inline-flex h-6 items-center rounded-full border px-2 text-xs font-medium transition-colors duration-500", tone)} aria-live="polite">{label}</span>;
}
