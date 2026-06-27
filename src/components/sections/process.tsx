import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import type { Step } from "@/types/strapi";

export function Process({ label, data }: { label: string; data: Step[] }) {
  return (
    <section id="process" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label={label} />

        <ol className="mt-10 space-y-px overflow-hidden rounded-xl border border-border bg-border">
          {data.map((step, i) => (
            <Reveal key={i} delay={i * 40} as="li">
              <div className="surface-hover flex flex-col gap-2 bg-card p-6 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-accent sm:w-12 sm:shrink-0">
                  {step.stepLabel ?? String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  {step.description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
