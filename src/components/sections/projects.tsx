"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import {
  FolderGit2,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  X,
  ExternalLink,
  Play,
} from "lucide-react";

const projects = [
  {
    key: "scheduling",
    color: "#3B82F6",
    accentColor: "#06B6D4",
    videoUrl: "",
  },
  {
    key: "trmil",
    color: "#06B6D4",
    accentColor: "#3B82F6",
    videoUrl: "",
  },
  {
    key: "prontu",
    color: "#6366F1",
    accentColor: "#0EA5E9",
    videoUrl: "",
  },
  {
    key: "meihub",
    color: "#0EA5E9",
    accentColor: "#6366F1",
    videoUrl: "",
  },
];

function ProjectModal({
  project,
  t,
  onClose,
}: {
  project: (typeof projects)[0];
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!mounted) return null;

  // Safe data retrieval
  let tags: string[] = [];
  try {
    const rawTags = t.raw(`items.${project.key}.tags`);
    if (Array.isArray(rawTags)) {
      tags = rawTags as string[];
    } else {
      console.warn("Tags data is not an array:", rawTags);
      tags = []; 
    }
  } catch (e) {
    console.error("Error retrieving tags:", e);
    tags = [];
  }

  // Ensure document.body exists (client-side safety)
  if (typeof document === "undefined") return null;

  return createPortal(
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{ zIndex: 10001 }} // Inline safety override
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 pt-10">
          {/* Title */}
          <h3
            className="text-3xl font-bold mb-8"
            style={{ color: project.color }}
          >
            {t(`items.${project.key}.title`)}
          </h3>

          {/* Video Placeholder */}
          {project.videoUrl ? (
            <div className="mb-8 rounded-xl overflow-hidden aspect-video">
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="mb-8 rounded-xl aspect-video flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}10, ${project.accentColor}08)`,
                border: `1px solid ${project.color}20`,
              }}
            >
              <div className="flex flex-col items-center gap-3 text-zinc-500">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${project.color}15` }}
                >
                  <Play
                    className="h-8 w-8 ml-1"
                    style={{ color: project.color }}
                  />
                </div>
                <span className="text-sm font-medium">Video em breve</span>
              </div>
            </div>
          )}

          {/* Pain Point */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-400/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
                {t("painLabel")}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed pl-10">
              {t(`items.${project.key}.pain`)}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                {t("solutionLabel")}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed pl-10">
              {t(`items.${project.key}.solution`)}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${project.color}15` }}
              >
                <Cpu className="h-4 w-4" style={{ color: project.color }} />
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: project.color }}
              >
                {t("techLabel")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pl-10">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 rounded-b-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${project.color}08, transparent)`,
          }}
        />
      </div>
    </div>,
    document.body
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <section
      id="projects"
      className="relative py-32 section-gradient section-gradient-alt"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="tech-badge mx-auto mb-6 w-fit">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>{t("sectionTag")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">{t("title").split(" ")[0]} </span>
            <span className="gradient-text">
              {t("title").split(" ").slice(1).join(" ")}
            </span>
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
              onClick={() => setSelectedProject(project)}
              className="group relative glass-card interactive-card rounded-2xl overflow-hidden"
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
                  <p className="text-sm text-zinc-400 leading-relaxed pl-6 line-clamp-2">
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
                  <p className="text-sm text-zinc-400 leading-relaxed pl-6 line-clamp-2">
                    {t(`items.${project.key}.solution`)}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu
                      className="h-4 w-4"
                      style={{ color: project.color }}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: project.color }}
                    >
                      {t("techLabel")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {(
                      safeGetTags(t, project.key)
                    ).map((tag: string) => (
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

                {/* Click hint */}
                <div
                  className="click-hint mt-6 flex items-center gap-1.5 text-xs"
                  style={{ color: project.color }}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span className="font-medium">Ver detalhes</span>
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

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          t={t}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

// Helper to safely get tags outside of modal too
function safeGetTags(t: any, key: string): string[] {
  try {
    const raw = t.raw(`items.${key}.tags`);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
