"use client";

import { useTranslations } from "next-intl";
import { Globe, Smartphone, Server, CreditCard, ArrowUpRight } from "lucide-react";

const services = [
  {
    key: "web",
    icon: Globe,
    color: "#3B82F6",
    number: "01",
  },
  {
    key: "mobile",
    icon: Smartphone,
    color: "#06B6D4",
    number: "02",
  },
  {
    key: "backend",
    icon: Server,
    color: "#6366F1",
    number: "03",
  },
  {
    key: "payments",
    icon: CreditCard,
    color: "#0EA5E9",
    number: "04",
  },
];

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative py-32 section-gradient section-gradient-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="tech-badge mb-6">
            <span>{t("sectionTag")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">{t("title").split(" ")[0]} </span>
            <span className="gradient-text-blue">{t("title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="group relative glass-card rounded-2xl p-8 cursor-pointer overflow-hidden"
              >
                {/* Corner decorations */}
                <div className="corner-decoration top-left" style={{ borderColor: `${service.color}30` }} />
                <div className="corner-decoration bottom-right" style={{ borderColor: `${service.color}30` }} />

                {/* Number */}
                <span
                  className="absolute top-6 right-8 text-7xl font-bold opacity-10 select-none transition-opacity group-hover:opacity-20"
                  style={{ color: service.color }}
                >
                  {service.number}
                </span>

                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="h-7 w-7" style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  {t(`items.${service.key}.title`)}
                  <ArrowUpRight
                    className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                    style={{ color: service.color }}
                  />
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {t(`items.${service.key}.description`)}
                </p>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px ${service.color}15, 0 0 30px ${service.color}10`,
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
