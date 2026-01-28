"use client";

import { useTranslations } from "next-intl";
import { Cpu } from "lucide-react";

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Vue.js", color: "#4FC08D" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#FFD43B" },
  { name: "Node.js", color: "#339933" },
  { name: "Flutter", color: "#02569B" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Strapi", color: "#4945FF" },
  { name: "n8n", color: "#EA4B71" },
  { name: "Cal.com", color: "#292929" },
  { name: "Stripe", color: "#635BFF" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "GraphQL", color: "#E10098" },
  { name: "REST API", color: "#3B82F6" },
  { name: "Jira", color: "#0052CC" },
  { name: "Miro", color: "#FFD02F" },
  { name: "OpenAI", color: "#10B981" },
];

function TechItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 rounded-xl glass-card cursor-default">
      <div
        className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}50`,
        }}
      />
      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
  );
}

export function TechStackSection() {
  const t = useTranslations("techStack");

  return (
    <section
      id="tech-stack"
      className="relative py-32 overflow-hidden section-gradient section-gradient-alt"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="tech-badge mx-auto mb-6 w-fit">
            <Cpu className="h-3.5 w-3.5" />
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

        {/* Tech Grid - Bento Style */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {technologies.map((tech) => (
              <TechItem key={tech.name} name={tech.name} color={tech.color} />
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

          {/* Marquee track */}
          <div className="flex gap-6 overflow-hidden py-4">
            <div className="flex gap-6 animate-marquee">
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 whitespace-nowrap hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-sm font-medium text-zinc-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
