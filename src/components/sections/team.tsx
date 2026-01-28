"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
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
    stacks: ["Node.js", "Strapi", "Python", "n8n", "IA"],
    status: "online",
  },
  {
    key: "athos",
    image: "/athos.png",
    color: "#0EA5E9",
    stacks: ["Python", "Data", "Automacao", "IA"],
    status: "online",
  },
  {
    key: "pedro",
    image: "/pedro.png",
    color: "#10B981",
    stacks: ["Python", "Automacao", "Data", "IA"],
    status: "online",
  },
];

export function TeamSection() {
  const t = useTranslations("team");

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.key}
              className="group relative glass-card rounded-2xl p-6 text-center overflow-hidden"
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
                  className="relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
