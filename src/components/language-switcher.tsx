"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import ReactCountryFlag from "react-country-flag";

const locales = [
  { code: "en", label: "EN", country: "US" },
  { code: "pt", label: "PT", country: "BR" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          className={cn(
            "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
            locale === loc.code
              ? "bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white"
              : "text-zinc-500 hover:text-white"
          )}
        >
          <ReactCountryFlag
            countryCode={loc.country}
            svg
            style={{ width: "1em", height: "1em" }}
          />
          <span className="hidden sm:inline">{loc.label}</span>
        </button>
      ))}
    </div>
  );
}
