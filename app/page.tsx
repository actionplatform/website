import { ArrowRight, Boxes, Cloud, GitBranch, KeyRound, Puzzle, Rocket, Tag, Terminal } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DemoPanel, DeploymentsScreen, LandingHeader, ProjectsScreen, ReleasesScreen, Reveal, TerminalDemo } from "@/features/landing";

const STRIP = [
  { icon: Boxes, title: "Templates", text: "Start with best practices" },
  { icon: GitBranch, title: "Git flow", text: "Built-in branching and versioning" },
  { icon: Tag, title: "Releases", text: "Automate from commit to release" },
  { icon: Cloud, title: "Deployments", text: "Ship to your infrastructure" },
];

const FEATURES = [
  { icon: Boxes, title: "Templates", text: "Web APIs, libraries, docs and plugins in seven languages — a repository ready to ship in one click." },
  { icon: GitBranch, title: "Git-flow, enforced", text: "Branch kinds, conventional commits and protected branches checked by hooks, CI and the platform alike." },
  { icon: Tag, title: "Releases", text: "Versions, changelog and tags cut from the platform, the CLI or an AI agent. A deploy always ships a release." },
  { icon: Cloud, title: "Deploys without keys", text: "Lambda through a deploy proxy in your own AWS account: short-lived credentials per app, no access key anywhere." },
  { icon: Puzzle, title: "Plugins", text: "Deploy targets, overlays and tools as Python packages; the platform draws their settings from what they declare." },
  { icon: Terminal, title: "CLI and MCP", text: "Everything the web does, from the terminal or from Claude Code, Codex and Cursor over MCP." },
];

const STEPS = [
  { n: "01", title: "Connect GitHub", text: "OAuth or a GitHub App — the platform pushes and releases as your organization." },
  { n: "02", title: "Create an app from a template", text: "Pick the stack, the cloud overlay and the CI; the repository is born with git-flow, quality checks and a health route." },
  { n: "03", title: "Release, then deploy", text: "Cut 0.1.0 from main, deploy it to dev or prod. Rollback, diagnose and tear down from the same screen." },
];

const container = "mx-auto w-full max-w-[1400px] px-5 md:px-8";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      <main>
        <section className={`${container} grid grid-cols-1 items-center gap-10 pb-12 pt-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,10fr)] lg:gap-12 lg:pb-16 lg:pt-16`}>
          <Reveal>
            <span className="inline-flex h-7 items-center rounded-full border border-border px-3 font-mono text-xs text-secondary">open source · self-hosted</span>
            <h1 className="mt-5 max-w-[16ch] text-[38px] font-semibold leading-[1.08] tracking-tight md:text-[52px] xl:text-[60px]">Action Platform</h1>
            <p className="mt-5 max-w-[52ch] text-base leading-7 text-secondary md:text-lg">Standardize how every project is created, versioned, released, and deployed—from the web, CLI, or an AI agent over MCP.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/docs/start_getting_started/" className="sm:w-auto"><Button size="lg" className="h-12 w-full whitespace-nowrap sm:w-auto">Get started <ArrowRight className="size-4" strokeWidth={2} /></Button></Link>
              <a href="https://github.com/actionplatform/action-platform" target="_blank" rel="noopener noreferrer" className="sm:w-auto"><Button size="lg" variant="outline" className="h-12 w-full whitespace-nowrap sm:w-auto">View on GitHub</Button></a>
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">Open source · No vendor lock-in</p>
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            <DemoPanel />
          </Reveal>
        </section>

        <section className="border-y border-border">
          <div className={container}>
            <ul className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {STRIP.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className={`flex items-center gap-3 py-4 sm:py-5 lg:px-6 ${i === 0 ? "lg:pl-0" : ""} ${i === STRIP.length - 1 ? "lg:pr-0" : ""}`}>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border"><Icon className="size-4 text-secondary" strokeWidth={1.5} /></span>
                  <span className="min-w-0"><span className="block text-sm font-medium">{title}</span><span className="block truncate text-[13px] text-secondary">{text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="product" className={`${container} pt-12 md:pt-16`}>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">One workflow</div>
            <h2 className="mt-3 max-w-[22ch] text-[28px] font-semibold leading-tight tracking-tight md:text-4xl">Everything between idea and production.</h2>
            <p className="mt-3 max-w-[56ch] text-secondary">The same rules whether a human clicks, a script runs or an agent decides.</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 60}>
                <article className="h-full rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-hover">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-[#303030]"><Icon className="size-5 text-secondary" strokeWidth={1.5} /></div>
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-secondary">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={`${container} pt-16 md:pt-24`}>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Deploy</div>
            <h2 className="mt-3 max-w-[22ch] text-[28px] font-semibold leading-tight tracking-tight md:text-4xl">Every deploy ships a release.</h2>
            <p className="mt-3 max-w-[56ch] text-secondary">The worker checks out the tag, gets credentials for that app alone and runs the target. The history says what ran, when, by whom.</p>
          </Reveal>
          <Reveal delay={120} className="mt-8"><DeploymentsScreen /></Reveal>
          <Reveal delay={100} className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
            <div className="flex h-10 items-center gap-2 border-b border-border px-4">
              <span className="size-2.5 rounded-full bg-[#2a2a2a]" /><span className="size-2.5 rounded-full bg-[#2a2a2a]" /><span className="size-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">terminal</span>
            </div>
            <TerminalDemo />
          </Reveal>
        </section>

        <section className={`${container} pt-16 md:pt-24`}>
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Three steps</div>
            <h2 className="mt-3 max-w-[22ch] text-[28px] font-semibold leading-tight tracking-tight md:text-4xl">Connect, create, ship.</h2>
          </Reveal>
          <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <li className="h-full rounded-xl border border-border bg-surface p-5">
                  <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                  <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-secondary">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal><ProjectsScreen /></Reveal>
            <Reveal delay={120}><ReleasesScreen /></Reveal>
          </div>
        </section>

        <section className={`${container} py-16 md:py-24`}>
          <Reveal className="flex flex-col items-start gap-6 rounded-xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-secondary"><KeyRound className="size-4" strokeWidth={1.75} /><span className="text-sm">No cloud key on the platform</span></div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Your account decides who deploys what.</h2>
              <p className="mt-2 text-secondary">A small proxy in your AWS account grants deploys per app and hands out credentials that expire in an hour. The platform signs a token; IAM does the rest.</p>
            </div>
            <a href="https://github.com/actionplatform/apx-aws-lambda" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto"><Button size="lg" variant="outline" className="h-12 w-full whitespace-nowrap md:w-auto"><Rocket className="size-4" strokeWidth={1.75} /> How the deploy proxy works</Button></a>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={`${container} flex flex-col gap-3 py-8 text-sm text-secondary md:flex-row md:items-center md:justify-between`}>
          <div className="flex items-center gap-2"><Logo className="size-4" /><span>action-platform</span></div>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/" className="hover:text-foreground">Docs</Link>
            <a href="https://github.com/actionplatform" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
            <a href="https://pypi.org/project/action-platform/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">PyPI</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
