import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Header,
  Hero,
  Problem,
  Solutions,
  Industries,
  Process,
  WhyUs,
  Work,
  Testimonials,
  TechEcosystem,
  Faq,
  FinalCtaSection,
  Footer,
} from "@/components/sections";
import { getHomepage, getGlobal, getCaseStudies, getTestimonials } from "@/lib/strapi";

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const draft = sp.preview === "1" || sp.preview === "true";

  const [global, homepage, caseStudies, testimonials, t, tc] = await Promise.all([
    getGlobal(locale, draft),
    getHomepage(locale, draft),
    getCaseStudies(locale, draft),
    getTestimonials(locale, draft),
    getTranslations("sections"),
    getTranslations("common"),
  ]);

  if (!homepage || !global) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Content unavailable</h1>
          <p className="mt-2 text-muted-foreground">
            Could not load content from the CMS. Make sure Strapi is running at{" "}
            <code>{process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}</code>.
          </p>
        </div>
      </main>
    );
  }

  const calLink = global.calLink || undefined;
  const ctaLabel = homepage.hero?.primaryCta?.label ?? "Contact";

  return (
    <>
      <div className="bg-ambient" aria-hidden />
      <Header
        nav={global.nav ?? []}
        calLink={calLink}
        ctaLabel={ctaLabel}
        siteName={global.siteName}
      />
      <main className="relative">
        <Hero
          data={homepage.hero}
          calLink={calLink}
          industries={homepage.industries?.map((i) => i.name)}
        />
        {homepage.problem && <Problem data={homepage.problem} />}
        {homepage.solutions?.length ? (
          <Solutions label={t("solutions")} data={homepage.solutions} />
        ) : null}
        {homepage.industries?.length ? (
          <Industries label={t("industries")} data={homepage.industries} />
        ) : null}
        {homepage.howWeWork?.length ? (
          <Process label={t("process")} data={homepage.howWeWork} />
        ) : null}
        {homepage.whyUs?.length ? <WhyUs label={t("whyUs")} data={homepage.whyUs} /> : null}
        {caseStudies?.length ? (
          <Work
            label={t("work")}
            data={caseStudies}
            labels={{
              problem: tc("problem"),
              solution: tc("solution"),
              technologies: tc("technologies"),
              viewProject: tc("viewProject"),
              watchDemo: tc("watchDemo"),
              close: tc("close"),
            }}
          />
        ) : null}
        {testimonials?.length ? (
          <Testimonials label={t("testimonials")} data={testimonials} />
        ) : null}
        {homepage.techEcosystem?.length ? (
          <TechEcosystem label={t("tech")} data={homepage.techEcosystem} />
        ) : null}
        {homepage.faqs?.length ? <Faq label={t("faq")} data={homepage.faqs} /> : null}
        {homepage.finalCta && <FinalCtaSection data={homepage.finalCta} calLink={calLink} />}
      </main>
      <Footer global={global} />
    </>
  );
}
