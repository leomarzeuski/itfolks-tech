"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { GlowCard } from "@/components/glow-card";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/strapi";

export function Faq({ label, data }: { label: string; data: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!data || data.length === 0) return null;

  return (
    <section id="faq" className="section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeader label={label} />

        <div className="mt-8 space-y-3">
          {data.map((item, i) => {
            const isOpen = open === i;
            return (
              <GlowCard key={i} glowRadius={26}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{item.question}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
