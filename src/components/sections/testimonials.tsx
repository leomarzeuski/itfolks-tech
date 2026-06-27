import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { mediaUrl } from "@/lib/strapi";
import type { Testimonial } from "@/types/strapi";

export function Testimonials({ label, data }: { label: string; data: Testimonial[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.map((t, i) => {
            const avatar = mediaUrl(t.avatar);
            return (
              <Reveal key={t.documentId ?? i} delay={(i % 3) * 60}>
                <figure className="surface flex h-full flex-col p-6">
                  <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={t.authorName}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                        {t.authorName?.charAt(0) ?? "—"}
                      </span>
                    )}
                    <div className="text-sm">
                      <div className="font-medium">{t.authorName}</div>
                      <div className="text-xs text-muted-foreground">
                        {[t.authorRole, t.company].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
