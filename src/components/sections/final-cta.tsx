import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { StrandsBackground } from "@/components/strands-background";
import type { FinalCta } from "@/types/strapi";

export function FinalCtaSection({
  data,
  calLink,
}: {
  data: FinalCta;
  calLink?: string;
}) {
  return (
    <section id="contact" className="section px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="surface relative isolate mx-auto max-w-4xl overflow-hidden p-10 text-center md:p-16">
          {/* React Bits: Strands — flowing brand-colored ribbons */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(110%_90%_at_50%_50%,black,transparent_85%)]"
          >
            <StrandsBackground
              colors={["#06b6d4", "#2563eb", "#7c3aed"]}
              count={3}
              speed={0.5}
              glow={2.6}
              intensity={0.6}
              saturation={1.4}
              scale={1.4}
              thickness={0.7}
              taper={3}
            />
          </div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {data.heading}
          </h2>
          {data.subtext && (
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{data.subtext}</p>
          )}
          {data.cta && (
            <div className="mt-8 flex justify-center">
              {calLink ? (
                <Button size="lg" data-cal-link={calLink}>
                  {data.cta.label}
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <a href={data.cta.href}>{data.cta.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
