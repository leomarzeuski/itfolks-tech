import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { GlowCard } from "@/components/glow-card";
import type { Solution } from "@/types/strapi";

export function Solutions({ label, data }: { label: string; data: Solution[] }) {
  return (
    <section id="solutions" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <GlowCard className="h-full">
                <div className="p-6">
                  <Icon name={s.icon} className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                  {s.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  )}
                  {s.outcome && (
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">
                      {s.outcome}
                    </p>
                  )}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
