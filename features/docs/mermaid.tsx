"use client";

import { useEffect, useId, useState } from "react";

let ready: Promise<typeof import("mermaid")["default"]> | null = null;

function load() {
  if (!ready) {
    ready = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "base",
        fontFamily: "Geist, Inter, sans-serif",
        flowchart: { useMaxWidth: false, padding: 12 },
        sequence: { useMaxWidth: false },
        er: { useMaxWidth: false },
        themeVariables: {
          background: "#111111",
          primaryColor: "#191919",
          primaryTextColor: "#f5f5f5",
          primaryBorderColor: "#3a3a3a",
          secondaryColor: "#151515",
          tertiaryColor: "#0d0d0d",
          lineColor: "#a3a3a3",
          textColor: "#f5f5f5",
          fontSize: "14px",
          actorBkg: "#191919",
          actorBorder: "#3a3a3a",
          actorTextColor: "#f5f5f5",
          signalColor: "#a3a3a3",
          signalTextColor: "#f5f5f5",
          labelBoxBkgColor: "#151515",
          labelBoxBorderColor: "#3a3a3a",
          labelTextColor: "#f5f5f5",
          loopTextColor: "#a3a3a3",
          noteBkgColor: "#151515",
          noteBorderColor: "#3a3a3a",
          noteTextColor: "#f5f5f5",
          activationBkgColor: "#272727",
          activationBorderColor: "#3a3a3a",
          sequenceNumberColor: "#0a0a0a",
          clusterBkg: "#0d0d0d",
          clusterBorder: "#272727",
          edgeLabelBackground: "#111111",
        },
      });
      return m.default;
    });
  }
  return ready;
}

export function Mermaid({ code }: { code: string }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    load()
      .then((m) => m.render(`m${id}`, code))
      .then((r) => { if (alive) setSvg(r.svg); })
      .catch((e: unknown) => { if (alive) setError(e instanceof Error ? e.message : String(e)); });

    return () => { alive = false; };
  }, [code, id]);

  if (error) return <pre className="doc-code">{code}</pre>;
  if (!svg) return <div className="doc-diagram h-40 animate-pulse" aria-hidden />;

  return <div className="doc-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
