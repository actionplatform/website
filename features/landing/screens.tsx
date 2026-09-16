import { ArrowUpRight, Building2, ChevronDown, Cloud, FolderGit2, GitBranch, Layers, LayoutTemplate, ListChecks, Puzzle, Rocket, Settings, Tag, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { cn } from "@/lib/utils";
import { LiveStatus } from "./reveal";

const NAV = [
  { label: "Projects", icon: FolderGit2 },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Plugins", icon: Puzzle },
  { label: "Organization", icon: Building2 },
  { label: "Settings", icon: Settings },
];

export function Frame({ children, active, title, className }: { children: React.ReactNode; active: string; title: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-background text-left shadow-[0_1px_0_#1f1f1f]", className)} aria-label={`${title} screen`} role="img">
      <div className="flex">
        <aside className="hidden w-[168px] shrink-0 border-r border-border bg-sidebar md:block">
          <div className="flex h-11 items-center gap-2 border-b border-border px-3"><Logo className="size-4" /><span className="text-xs font-semibold">action-platform</span></div>
          <ul className="space-y-0.5 p-2">
            {NAV.map(({ label, icon: Icon }) => (
              <li key={label} className={cn("flex h-8 items-center gap-2 rounded-md px-2 text-xs", label === active ? "bg-surface-selected text-foreground" : "text-secondary")}><Icon className="size-3.5" strokeWidth={1.75} />{label}</li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex h-11 items-center gap-2 border-b border-border px-4 md:hidden"><Logo className="size-4" /><span className="text-xs font-semibold">action-platform</span></div>
          <div className="p-4 md:p-5">
            <div className="mb-3 text-[15px] font-semibold">{title}</div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeploymentsScreen() {
  const rows = [
    { status: <LiveStatus />, stage: "dev", version: "0.1.0", by: "fernando", when: "just now" },
    { status: <Badge tone="success">Successful</Badge>, stage: "prod", version: "0.1.0", by: "fernando", when: "2h ago" },
    { status: <Badge tone="danger">Failed</Badge>, stage: "dev", version: "0.0.9", by: "ci", when: "yesterday" },
  ];
  return (
    <Frame active="Projects" title="shop-api · Deployments">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel>
          <PanelHeader title="Deploy" aside={<Badge className="font-mono">aws/lambda</Badge>} />
          <PanelBody className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><div className="mb-1 text-xs text-secondary">Release</div><div className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 font-mono text-xs"><Tag className="size-3.5 text-secondary" strokeWidth={1.75} />0.1.0<ChevronDown className="ml-auto size-3.5 text-secondary" strokeWidth={1.75} /></div></div>
              <div><div className="mb-1 text-xs text-secondary">Environment</div><div className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 font-mono text-xs"><Cloud className="size-3.5 text-secondary" strokeWidth={1.75} />dev<ChevronDown className="ml-auto size-3.5 text-secondary" strokeWidth={1.75} /></div></div>
            </div>
            <div className="flex gap-2 border-t border-border-subtle pt-3">
              <span className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"><Rocket className="size-3.5" strokeWidth={1.75} /> Deploy to dev</span>
              <span className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs"><ListChecks className="size-3.5" strokeWidth={1.75} /> Run preflight</span>
            </div>
          </PanelBody>
        </Panel>
        <Panel className="hidden lg:block">
          <PanelHeader title="Target" />
          <div className="divide-y divide-border-subtle text-xs">
            {[["Target", "aws/lambda"], ["Region", "us-east-1"], ["App", "acme/shop/shop-api"]].map(([k, v]) => <div key={k} className="flex gap-3 px-4 py-2.5"><span className="w-16 text-secondary">{k}</span><span className="font-mono">{v}</span></div>)}
          </div>
        </Panel>
      </div>
      <Panel className="mt-3">
        <PanelHeader title="Deployment history" aside={<span className="text-xs text-secondary">3 runs · last 20</span>} />
        <ul className="divide-y divide-border-subtle text-xs">
          {rows.map((r, i) => (
            <li key={i} className="flex items-center gap-3 px-4 py-2.5">
              {r.status}
              <span className="font-mono">{r.stage}</span>
              <span className="text-secondary">Deploy</span>
              <span className="font-mono">{r.version}</span>
              <span className="ml-auto hidden text-secondary sm:inline">{r.by} · {r.when}</span>
              <ChevronDown className="size-3.5 text-secondary" strokeWidth={1.75} />
            </li>
          ))}
        </ul>
      </Panel>
    </Frame>
  );
}

export function ProjectsScreen() {
  const projects = [
    { name: "shop", apps: 6, team: "Platform", when: "28 min ago" },
    { name: "billing", apps: 4, team: "Payments", when: "1 hour ago" },
    { name: "mobile", apps: 2, team: "Apps", when: "2 hours ago" },
  ];
  return (
    <Frame active="Projects" title="Projects">
      <div className="grid grid-cols-1 gap-3">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#303030]"><FolderGit2 className="size-5 text-secondary" strokeWidth={1.5} /></div>
              <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{p.name}</div><div className="truncate font-mono text-xs text-secondary">{p.name}</div></div>
              <div className="hidden items-center gap-4 whitespace-nowrap text-xs text-secondary sm:flex">
                <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-status-ok" />Active</span>
                <span className="flex items-center gap-1.5"><Layers className="size-3.5" strokeWidth={1.75} />{p.apps} apps</span>
                <span className="flex items-center gap-1.5"><Users className="size-3.5" strokeWidth={1.75} />{p.team}</span>
                <span>Updated {p.when}</span>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-secondary" strokeWidth={1.75} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 whitespace-nowrap text-xs text-secondary sm:hidden">
              <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-status-ok" />Active</span>
              <span className="flex items-center gap-1.5"><Layers className="size-3.5" strokeWidth={1.75} />{p.apps} apps</span>
              <span className="flex items-center gap-1.5"><Users className="size-3.5" strokeWidth={1.75} />{p.team}</span>
              <span>Updated {p.when}</span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function ReleasesScreen() {
  return (
    <Frame active="Projects" title="shop-api · Releases">
      <Panel>
        <PanelHeader title="Create release" aside={<Badge tone="ok">Stable</Badge>} />
        <PanelBody className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="space-y-3 md:border-r md:border-border-subtle md:pr-4">
            <div><div className="mb-1 text-xs text-secondary">Branch</div><div className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 font-mono text-xs"><GitBranch className="size-3.5 text-secondary" strokeWidth={1.75} />main<ChevronDown className="ml-auto size-3.5 text-secondary" strokeWidth={1.75} /></div></div>
            <div>
              <div className="mb-1 text-xs text-secondary">Version</div>
              <div className="flex items-center gap-3">
                <div className="inline-flex h-8 overflow-hidden rounded-md border border-border text-xs"><span className="bg-surface-selected px-3 leading-8">Patch</span><span className="px-3 leading-8 text-secondary">Minor</span><span className="px-3 leading-8 text-secondary">Major</span></div>
                <span className="font-mono text-xs text-secondary">0.1.0</span><span className="text-secondary">→</span><span className="font-mono text-sm font-semibold">0.1.1</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div><div className="mb-1 text-xs text-secondary">Name</div><div className="h-9 rounded-md border border-border bg-background px-3 text-xs leading-9">Release 0.1.1</div></div>
            <div><div className="mb-1 text-xs text-secondary">Notes (optional)</div><div className="h-14 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-muted-foreground">What changed, in your words…</div></div>
          </div>
        </PanelBody>
      </Panel>
    </Frame>
  );
}
