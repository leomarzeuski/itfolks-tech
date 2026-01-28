"use client";

import { useTranslations } from "next-intl";
import { Workflow, CalendarCheck, Wrench } from "lucide-react";

const methodologyItems = [
  {
    key: "scrum",
    icon: Workflow,
    color: "#3B82F6",
    number: "01",
  },
  {
    key: "deliveries",
    icon: CalendarCheck,
    color: "#06B6D4",
    number: "02",
  },
  {
    key: "tools",
    icon: Wrench,
    color: "#6366F1",
    number: "03",
    tools: [
      { name: "Jira", color: "#0052CC" },
      { name: "Miro", color: "#FFD02F" },
      { name: "Scrum", color: "#3B82F6" },
    ],
  },
];

export function MethodologySection() {
  const t = useTranslations("methodology");

  return (
    <section id="methodology" className="relative py-32 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="tech-badge mx-auto mb-6 w-fit">
            <Workflow className="h-3.5 w-3.5" />
            <span>{t("sectionTag")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">{t("title").split(" ")[0]} </span>
            <span className="gradient-text-blue">{t("title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {methodologyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="group relative glass-card rounded-2xl p-8 overflow-hidden"
              >
                {/* Number */}
                <span
                  className="absolute top-6 right-8 text-7xl font-bold opacity-10 select-none transition-opacity group-hover:opacity-20"
                  style={{ color: item.color }}
                >
                  {item.number}
                </span>

                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon className="h-7 w-7" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {t(`items.${item.key}.description`)}
                </p>

                {/* Tool badges for the tools card */}
                {item.tools && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tools.map((tool) => (
                      <span
                        key={tool.name}
                        className="text-xs px-3 py-1 rounded-md"
                        style={{
                          backgroundColor: `${tool.color}15`,
                          color: tool.color,
                          border: `1px solid ${tool.color}30`,
                        }}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px ${item.color}15, 0 0 30px ${item.color}10`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
