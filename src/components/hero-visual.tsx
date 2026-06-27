import { ArrowUpRight, TrendingUp } from "lucide-react";

const BARS = [42, 58, 49, 70, 62, 84, 75, 95, 88, 72, 90, 100];

function Sparkline() {
  return (
    <svg viewBox="0 0 100 28" className="mt-2 h-7 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <polyline
        points="0,22 14,18 28,20 42,12 56,14 70,8 84,10 100,3"
        fill="none"
        stroke="url(#spark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const METRICS = [
  { label: "Orders today", value: "1,284", delta: "+12.4%" },
  { label: "On-time rate", value: "98.6%", delta: "+3.1%" },
  { label: "Manual tasks", value: "−72%", delta: "saved" },
];

/**
 * Stylized "operations dashboard" mockup used as the hero showpiece — pure
 * markup/SVG, brand-colored, crisp at any resolution (no external media).
 */
export function HeroVisual() {
  return (
    <div className="surface overflow-hidden text-left shadow-2xl shadow-black/60 ring-1 ring-white/5">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <div className="ml-3 hidden h-5 w-full max-w-[220px] items-center rounded-md bg-secondary px-2 text-[10px] text-muted-foreground sm:flex">
          app.automatech.io/operations
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <aside className="hidden flex-col gap-2.5 border-r border-border p-4 sm:flex">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-[linear-gradient(135deg,#0ea5e9,#2563eb,#7c3aed)]" />
            <div className="h-2.5 w-20 rounded bg-secondary" />
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded ${i === 1 ? "bg-primary/70" : "bg-secondary"}`} />
              <div
                className={`h-2 rounded ${i === 1 ? "bg-primary/60" : "bg-secondary"}`}
                style={{ width: `${[70, 84, 60, 76, 52][i]}%` }}
              />
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Operations overview</h3>
              <p className="text-xs text-muted-foreground">Live · last 30 days</p>
            </div>
            <div className="flex h-7 items-center rounded-md border border-border bg-secondary px-3 text-xs text-muted-foreground">
              This month
            </div>
          </div>

          {/* metric cards */}
          <div className="grid grid-cols-3 gap-3">
            {METRICS.map((m) => (
              <div key={m.label} className="surface p-3">
                <p className="truncate text-[11px] text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{m.value}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {m.delta}
                </div>
                <Sparkline />
              </div>
            ))}
          </div>

          {/* bar chart */}
          <div className="surface mt-3 p-4">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Throughput</span>
            </div>
            <div className="flex h-28 items-end gap-1.5 sm:gap-2">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[linear-gradient(180deg,#7c3aed,#2563eb_60%,#0ea5e9)] opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
