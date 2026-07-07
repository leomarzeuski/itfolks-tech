import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getGlobal } from "@/lib/strapi";
import { CalInit } from "@/components/cal-init";
import { PreviewBridge } from "@/components/preview-bridge";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://automatechglobal.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const fallback = messages.metadata as { title: string; description: string };

  const global = await getGlobal(locale);
  const seo = global?.defaultSeo;
  const title = seo?.metaTitle ?? fallback.title;
  const description = seo?.metaDescription ?? fallback.description;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: { en: "/", pt: "/pt" },
    },
    icons: {
      icon: "/favicon.ico?v=3",
      shortcut: "/favicon.ico?v=3",
      apple: "/apple-icon.png?v=3",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      siteName: global?.siteName ?? "Automatech Global",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Automatech Global" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const global = await getGlobal(locale);

  const wa =
    locale === "pt"
      ? {
          label: "Falar no WhatsApp",
          message: "Olá! Vim pelo site da Automatech e quero saber mais.",
        }
      : {
          label: "Chat on WhatsApp",
          message: "Hi! I came from the Automatech website and would like to know more.",
        };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: global?.siteName ?? "Automatech Global",
        url: SITE_URL,
        description: global?.siteDescription,
        email: global?.contactEmail,
        sameAs: global?.socials?.map((s) => s.url) ?? [],
      },
      {
        "@type": "WebSite",
        name: global?.siteName ?? "Automatech Global",
        url: SITE_URL,
      },
    ],
  };

  return (
    <html lang={locale} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <CalInit />
        <PreviewBridge />
        <WhatsAppFloat label={wa.label} message={wa.message} />
      </body>
    </html>
  );
}
