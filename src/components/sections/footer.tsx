import { Github, Linkedin, Twitter, Mail, type LucideIcon } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { Global } from "@/types/strapi";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
};

export function Footer({ global }: { global: Global }) {
  const year = new Date().getFullYear();
  const footer = global.footer;

  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <BrandLogo />
            {footer?.tagline && (
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">{footer.tagline}</p>
            )}
            {global.contactEmail && (
              <a
                href={`mailto:${global.contactEmail}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {global.contactEmail}
              </a>
            )}
          </div>

          {footer?.linkGroups?.map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links?.map((l, li) => (
                  <li key={li}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {global.siteName}
          </p>
          {global.socials && global.socials.length > 0 && (
            <div className="flex items-center gap-4">
              {global.socials.map((s, i) => {
                const Ic = SOCIAL_ICONS[s.platform.toLowerCase()] ?? Mail;
                return (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.platform}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Ic className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
