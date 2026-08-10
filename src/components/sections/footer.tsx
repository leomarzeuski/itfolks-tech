import { Linkedin, Twitter, Instagram, Mail, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { Global, Social } from "@/types/strapi";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Instagram,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter,
};

const isInProgress = (url?: string) => !url || url.trim() === "" || url.trim() === "#";

const DEFAULT_SOCIALS: Social[] = [
  { platform: "linkedin", url: "https://www.linkedin.com/company/automatech-global/?viewAsMember=true" },
  { platform: "instagram", url: "https://www.instagram.com/automatechgl?igsh=MWN6dW9hb2tlOGs1dw==" },
];

export async function Footer({ global }: { global: Global }) {
  const t = await getTranslations("common");
  const year = new Date().getFullYear();
  const footer = global.footer;
  const socials = global.socials && global.socials.length > 0 ? global.socials : DEFAULT_SOCIALS;

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
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map((s, i) => {
                const Ic = SOCIAL_ICONS[s.platform.toLowerCase()] ?? Mail;

                // "Work in progress" socials (empty url or "#") show a popover instead of linking.
                if (isInProgress(s.url)) {
                  return (
                    <span key={i} className="group relative inline-flex">
                      <span
                        aria-label={`${s.platform} — ${t("inProgress")}`}
                        className="cursor-default text-muted-foreground/50"
                      >
                        <Ic className="h-4 w-4" />
                      </span>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                      >
                        {s.platform} · {t("inProgress")}
                      </span>
                    </span>
                  );
                }

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
