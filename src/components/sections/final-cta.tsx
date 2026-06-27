import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
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
        <div className="surface mx-auto max-w-4xl overflow-hidden p-10 text-center md:p-16">
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
