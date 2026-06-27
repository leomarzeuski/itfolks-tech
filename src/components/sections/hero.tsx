import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { HeroVisual } from "@/components/hero-visual";
import { SoftAuroraBackground } from "@/components/soft-aurora-background";
import DecryptedText from "@/components/DecryptedText";
import TextType from "@/components/TextType";
import CountUp from "@/components/CountUp";
import type { Hero as HeroType } from "@/types/strapi";

/** Splits a stat like "30+" / "100%" into an animated number + static suffix. */
function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return <>{value}</>;
  const num = parseFloat(match[1].replace(",", "."));
  const suffix = match[2];
  return (
    <>
      <CountUp to={num} duration={1.6} />
      {suffix}
    </>
  );
}

/** Renders the title with the last word(s) in the brand gradient. */
function GradientTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const tailCount = words.length > 3 ? 2 : 1;
  const head = words.slice(0, words.length - tailCount).join(" ");
  const tail = words.slice(words.length - tailCount).join(" ");
  return (
    <>
      {head && `${head} `}
      <span className="text-brand-gradient">{tail}</span>
    </>
  );
}

export function Hero({
  data,
  calLink,
  industries,
}: {
  data: HeroType;
  calLink?: string;
  industries?: string[];
}) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-4 pb-24 pt-36 sm:px-6 md:pb-32 md:pt-44 lg:px-8"
    >
      {/* React Bits: Soft Aurora — gentle brand-tinted glow band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 h-[85vh] opacity-90 [mask-image:radial-gradient(75%_60%_at_50%_22%,black,transparent_82%)]"
      >
        <SoftAuroraBackground
          color1="#38bdf8"
          color2="#a855f7"
          speed={0.6}
          scale={1.5}
          brightness={1}
          noiseFrequency={2.5}
          bandHeight={0.5}
          enableMouseInteraction={false}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {data.eyebrow && (
          <Reveal>
            <span className="pill mb-6 inline-flex items-center gap-2 font-mono text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <DecryptedText
                text={data.eyebrow}
                animateOn="view"
                sequential
                speed={40}
                className="text-muted-foreground"
                encryptedClassName="text-accent/70"
              />
            </span>
          </Reveal>
        )}

        <Reveal delay={60}>
          <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl">
            <GradientTitle title={data.title} />
          </h1>
        </Reveal>

        {data.subtitle && (
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {data.subtitle}
            </p>
          </Reveal>
        )}

        {industries && industries.length > 0 && (
          <Reveal delay={160}>
            <div className="mt-5 flex items-center justify-center gap-2 font-mono text-sm">
              <span className="text-accent">{">"} built for</span>
              <TextType
                text={industries}
                typingSpeed={65}
                pauseDuration={1500}
                deletingSpeed={35}
                loop
                startOnVisible
                showCursor
                cursorCharacter="_"
                textColors={["#8a91f0"]}
                className="text-foreground"
                cursorClassName="text-accent"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {data.primaryCta &&
              (calLink ? (
                <Button
                  size="lg"
                  data-cal-link={calLink}
                  className="shadow-[0_10px_40px_-8px_rgba(124,92,255,0.55)]"
                >
                  {data.primaryCta.label}
                </Button>
              ) : (
                <Button
                  size="lg"
                  asChild
                  className="shadow-[0_10px_40px_-8px_rgba(124,92,255,0.55)]"
                >
                  <a href={data.primaryCta.href}>{data.primaryCta.label}</a>
                </Button>
              ))}
            {data.secondaryCta && (
              <Button size="lg" variant="secondary" asChild>
                <a href={data.secondaryCta.href}>
                  {data.secondaryCta.label}
                  <ArrowRight />
                </a>
              </Button>
            )}
          </div>
        </Reveal>

        {data.stats && data.stats.length > 0 && (
          <Reveal delay={240}>
            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
              {data.stats.map((s, i) => (
                <div key={i}>
                  <dt className="text-2xl font-semibold md:text-3xl">
                    <StatValue value={s.value} />
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {/* Product showcase — glowing app window with a dashboard mockup */}
      <Reveal delay={300}>
        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          <div
            aria-hidden
            className="absolute -inset-x-12 -top-12 bottom-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_25%,rgba(109,94,252,0.25),transparent_70%)] blur-2xl"
          />
          <HeroVisual />
        </div>
      </Reveal>
    </section>
  );
}
