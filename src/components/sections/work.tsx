"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Play, ArrowUpRight, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { GlowCard } from "@/components/glow-card";
import type { CaseStudy } from "@/types/strapi";

type Labels = {
  problem: string;
  solution: string;
  technologies: string;
  viewProject: string;
  watchDemo: string;
  close: string;
};

function Poster({ cs }: { cs: CaseStudy }) {
  if (cs.posterUrl) {
    return (
      <Image
        src={cs.posterUrl}
        alt={cs.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#0ea5e9_0%,#2563eb_50%,#7c3aed_100%)]">
      <span className="text-3xl font-semibold text-white/90">{cs.title.charAt(0)}</span>
    </div>
  );
}

function Modal({
  cs,
  labels,
  onClose,
}: {
  cs: CaseStudy;
  labels: Labels;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="surface my-4 w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-black">
          {cs.videoUrl ? (
            <video
              key={cs.videoUrl}
              className="h-full w-full"
              src={cs.videoUrl}
              poster={cs.posterUrl}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Poster cs={cs} />
          )}
          <button
            onClick={onClose}
            aria-label={labels.close}
            className="absolute right-3 top-3 rounded-md bg-black/50 p-2 text-white/90 backdrop-blur transition-colors hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {cs.industry && <span className="capitalize">{cs.industry}</span>}
          </div>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight">{cs.title}</h3>
          {cs.summary && <p className="mt-2 text-muted-foreground">{cs.summary}</p>}

          <div className="mt-6 space-y-5">
            {cs.problem && (
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" /> {labels.problem}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{cs.problem}</p>
              </div>
            )}
            {cs.solution && (
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent">
                  <CheckCircle2 className="h-4 w-4" /> {labels.solution}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{cs.solution}</p>
              </div>
            )}
            {cs.technologies && cs.technologies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Cpu className="h-4 w-4" /> {labels.technologies}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cs.technologies.map((t, i) => (
                    <span key={i} className="pill">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function Work({
  label,
  data,
  labels,
}: {
  label: string;
  data: CaseStudy[];
  labels: Labels;
}) {
  const [active, setActive] = useState<CaseStudy | null>(null);
  if (!data || data.length === 0) return null;

  return (
    <section id="work" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cs, i) => (
            <Reveal key={cs.documentId ?? i} delay={(i % 3) * 60}>
              <GlowCard className="h-full">
                <button
                  onClick={() => setActive(cs)}
                  className="group flex h-full w-full cursor-pointer flex-col text-left"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-[13px]">
                    <Poster cs={cs} />
                    {cs.videoUrl && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 h-5 w-5 text-white" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {cs.industry && (
                      <span className="text-xs capitalize text-muted-foreground">
                        {cs.industry}
                      </span>
                    )}
                    <h3 className="mt-1 font-medium">{cs.title}</h3>
                    {cs.summary && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {cs.summary}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                      {labels.viewProject}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <Modal cs={active} labels={labels} onClose={() => setActive(null)} />}
    </section>
  );
}
