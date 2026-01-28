"use client";

import { useTranslations } from "next-intl";
import { FolderGit2, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";

const projects = [
  {
    key: "scheduling",
    color: "#3B82F6",
    accentColor: "#06B6D4",
  },
  {
    key: "trmil",
    color: "#06B6D4",
    accentColor: "#3B82F6",
  },
  {
    key: "prontu",
    color: "#6366F1",
    accentColor: "#0EA5E9",
  },
  {
    key: "meihub",
    color: "#0EA5E9",
    accentColor: "#6366F1",
  },
];

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="relative py-32 section-gradient section-gradient-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="tech-badge mx-auto mb-6 w-fit">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>{t("sectionTag")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">{t("title").split(" ")[0]} </span>
            <span className="gradient-text">{t("title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.key}
              className="group relative glass-card rounded-2xl overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})`,
                }}
              />

              <div className="p-8">
                {/* Project Title */}
                <h3
                  className="text-2xl font-bold mb-6 transition-colors"
                  style={{ color: project.color }}
                >
                  {t(`items.${project.key}.title`)}
                </h3>

                {/* Pain Point */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
                      {t("painLabel")}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                    {t(`items.${project.key}.pain`)}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                      {t("solutionLabel")}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                    {t(`items.${project.key}.solution`)}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-4 w-4" style={{ color: project.color }} />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: project.color }}
                    >
                      {t("techLabel")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {(t.raw(`items.${project.key}.tags`) as string[]).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-md transition-all"
                        style={{
                          backgroundColor: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${project.color}15, 0 0 30px ${project.color}10`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
