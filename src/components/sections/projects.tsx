"use client";

import { useTranslations } from "next-intl";
import { FolderGit2, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    key: "ecommerce",
    image: "/projects/ecommerce.png",
    color: "#3B82F6",
    github: "https://github.com/itfolks/ecommerce-platform",
    demo: "https://demo.itfolks.tech/ecommerce",
  },
  {
    key: "dashboard",
    image: "/projects/dashboard.png",
    color: "#06B6D4",
    github: "https://github.com/itfolks/analytics-dashboard",
    demo: "https://demo.itfolks.tech/dashboard",
  },
  {
    key: "mobile",
    image: "/projects/mobile.png",
    color: "#6366F1",
    github: "https://github.com/itfolks/fitness-app",
    demo: "https://demo.itfolks.tech/fitness",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.key}
              className="group project-card"
            >
              {/* Project Image */}
              <div className="project-card-image relative">
                {/* Placeholder gradient background */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
                  }}
                >
                  {/* Mock UI Elements */}
                  <div className="w-[80%] h-[70%] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* Mock header */}
                    <div className="h-6 border-b border-white/10 flex items-center gap-1.5 px-3">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                    {/* Mock content */}
                    <div className="p-3 space-y-2">
                      <div
                        className="h-3 rounded"
                        style={{ backgroundColor: `${project.color}30`, width: "60%" }}
                      />
                      <div className="h-2 rounded bg-white/10 w-full" />
                      <div className="h-2 rounded bg-white/10 w-4/5" />
                      <div className="h-8 rounded mt-3" style={{ backgroundColor: `${project.color}15` }} />
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="btn-ghost-neon rounded-full gap-2"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                      {t("viewCode")}
                    </Button>
                    <Button
                      size="sm"
                      className="btn-neon rounded-full gap-2"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {t("viewProject")}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2 group-hover:text-[#3B82F6] transition-colors">
                  {t(`items.${project.key}.title`)}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                  {t(`items.${project.key}.description`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(t.raw(`items.${project.key}.tags`) as string[]).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
