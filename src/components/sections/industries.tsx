import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import type { Industry } from "@/types/strapi";

export function Industries({ label, data }: { label: string; data: Industry[] }) {
  return (
    <section id="industries" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((ind, i) => (
            <Reveal key={i} delay={(i % 4) * 50}>
              <div className="surface surface-hover h-full p-5">
                <Icon name={ind.icon} className="h-5 w-5 text-muted-foreground" />
                <h3 className="mt-3 font-medium">{ind.name}</h3>
                {ind.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {ind.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
