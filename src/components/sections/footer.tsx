"use client";

import { useTranslations } from "next-intl";
import { Zap, Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/itfolks" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/itfolks" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/itfolks" },
];

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Tech Stack", href: "#tech-stack" },
];

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative border-t border-white/5 bg-[#09090b]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 mb-6"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]">
                <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">it</span>
                <span className="gradient-text-blue">Folks</span>
              </span>
            </a>

            <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 hover:text-[#3B82F6] hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5 transition-all"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@itfolks.tech"
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5 transition-all mb-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Email us</p>
                <p className="text-sm text-white group-hover:text-[#3B82F6] transition-colors">
                  hello@itfolks.tech
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {currentYear} itFolks Tech. {t("rights")}
          </p>
          <p className="text-xs text-zinc-600 flex items-center gap-1.5">
            {t("madeWith")}
            <span className="inline-block w-3 h-3 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-sm animate-pulse" />
            {t("by")}
          </p>
        </div>
      </div>
    </footer>
  );
}
