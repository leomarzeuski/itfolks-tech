import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import type { Tech } from "@/types/strapi";

export function TechEcosystem({ label, data }: { label: string; data: Tech[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="tech" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label={label} />

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {data.map((t, i) => (
              <span
                key={i}
                className="surface surface-hover px-4 py-2 text-sm text-foreground/90"
              >
                {t.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
