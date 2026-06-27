import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { Check } from "lucide-react";
import type { Value } from "@/types/strapi";

export function WhyUs({ label, data }: { label: string; data: Value[] }) {
  return (
    <section id="why" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label={label} />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {data.map((v, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <div className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="font-medium">{v.title}</h3>
                  {v.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
