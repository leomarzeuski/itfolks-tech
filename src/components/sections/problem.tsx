import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import type { Problem as ProblemType } from "@/types/strapi";

export function Problem({ data }: { data: ProblemType }) {
  return (
    <section className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {data.heading}
          </h2>
        </Reveal>
        {data.intro && (
          <Reveal delay={60}>
            <p className="mt-4 max-w-2xl text-muted-foreground">{data.intro}</p>
          </Reveal>
        )}

        {data.painPoints && data.painPoints.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {data.painPoints.map((p, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="surface surface-hover flex items-start gap-3 p-4">
                  <Icon
                    name={p.icon}
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                  />
                  <span className="text-sm text-foreground/90">{p.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
