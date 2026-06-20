"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Sparkles, X, ExternalLink } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    key: "raul",
    image: "/raul.png",
    color: "#3B82F6",
    stacks: ["React", "Vue", "Flutter", "React Native", "Scrum", "IA"],
    status: "online",
  },
  {
    key: "leo",
    image: "/leonardo.png",
    color: "#06B6D4",
    stacks: ["Next.js", "React", "React Native", "n8n", "IA"],
    status: "online",
  },
  {
    key: "higor",
    image: "/higor.png",
    color: "#6366F1",
    stacks: [
      "Node.js",
      "Strapi",
      "n8n",
      "Full Stack",
      "DevOps",
      "IA",
      "Strapi Plugins",
    ],
    status: "online",
  },
  {
    key: "athos",
    image: "/athos.png",
    color: "#0EA5E9",
    stacks: ["Python", "Data", "Data Automation", "IA", "Strapi (Headless CMS)"],
    status: "online",
  },
];

function TeamModal({
  member,
  t,
  onClose,
}: {
  member: (typeof teamMembers)[0];
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  useEffect(() => {
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

  if (typeof document === "undefined") return null;

  return createPortal(
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{ zIndex: 10001 }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
          style={{
            background: `linear-gradient(90deg, ${member.color}, ${member.color}80, transparent)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-8 pt-10">
          {/* Avatar */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0"
              style={{
                boxShadow: `0 0 40px ${member.color}30`,
              }}
            >
              <Image
                src={member.image}
                alt={t(`members.${member.key}.name`)}
                fill
                className="object-cover"
                sizes="96px"
              />
              {/* Status dot */}
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3px] border-[#0a0f1e] z-10"
                style={{ backgroundColor: "#10B981" }}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {t(`members.${member.key}.name`)}
              </h3>
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: member.color }}
              >
                {t(`members.${member.key}.role`)}
              </p>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                {t(`members.${member.key}.specialty`)}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Bio
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t(`members.${member.key}.bio`)}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.stacks.map((stack) => (
                <span
                  key={stack}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${member.color}15`,
                    color: member.color,
                    border: `1px solid ${member.color}30`,
                  }}
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 rounded-b-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${member.color}08, transparent)`,
          }}
        />
      </div>
    </div>,
    document.body
  );
}

export function TeamSection() {
  const t = useTranslations("team");
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);

  return (
    <section id="team" className="relative py-32 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="tech-badge mx-auto mb-6 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.key}
              onClick={() => setSelectedMember(member)}
              className="group relative glass-card interactive-card rounded-2xl p-6 text-center overflow-hidden"
            >
              {/* Animated border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${member.color}10, transparent 50%)`,
                }}
              />

              {/* Avatar with Photo */}
              <div className="relative mx-auto mb-5 flex justify-center">
                <div
                  className="relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl"
                  style={{
                    boxShadow: `0 0 30px ${member.color}20`,
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.key}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                  {/* Status indicator */}
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[3px] border-[#0a0f1e] z-10"
                    style={{ backgroundColor: "#10B981" }}
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold text-white mb-1">
                {t(`members.${member.key}.name`)}
              </h3>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: member.color }}
              >
                {t(`members.${member.key}.role`)}
              </p>

              {/* Specialty */}
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-3">
                {t(`members.${member.key}.specialty`)}
              </p>

              {/* Bio */}
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-3">
                {t(`members.${member.key}.bio`)}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {member.stacks.map((stack) => (
                  <span
                    key={stack}
                    className="text-[10px] px-2 py-0.5 rounded-md transition-all"
                    style={{
                      backgroundColor: `${member.color}10`,
                      color: member.color,
                      border: `1px solid ${member.color}25`,
                    }}
                  >
                    {stack}
                  </span>
                ))}
              </div>

              {/* Click hint */}
              <div className="click-hint mt-4 flex items-center justify-center gap-1.5 text-xs" style={{ color: member.color }}>
                <ExternalLink className="h-3 w-3" />
                <span className="font-medium">Ver mais</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <TeamModal
          member={selectedMember}
          t={t}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
}
