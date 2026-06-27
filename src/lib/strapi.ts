import type { Homepage, Global, CaseStudy, Testimonial, StrapiMedia } from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/** Resolve a (possibly relative) Strapi media URL to an absolute URL. */
export function mediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

type GetOptions = { draft?: boolean; revalidate?: number };

/**
 * Fetch a Strapi REST endpoint. `pathWithQuery` already includes the populate
 * query. When `draft` is true we request draft content (preview) with no cache;
 * otherwise published content is fetched with ISR revalidation.
 */
async function strapiGet<T>(
  pathWithQuery: string,
  { draft = false, revalidate = 60 }: GetOptions = {}
): Promise<T | null> {
  const sep = pathWithQuery.includes("?") ? "&" : "?";
  const url = `${STRAPI_URL}/api/${pathWithQuery}${draft ? `${sep}status=draft` : ""}`;

  try {
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : undefined,
      ...(draft ? { cache: "no-store" } : { next: { revalidate } }),
    });
    if (!res.ok) {
      console.error(`[strapi] ${res.status} for ${url}`);
      return null;
    }
    const json = await res.json();
    return (json.data ?? null) as T;
  } catch (err) {
    console.error(`[strapi] fetch failed for ${url}`, err);
    return null;
  }
}

const HOMEPAGE_POPULATE = [
  "populate[hero][populate]=*",
  "populate[problem][populate]=*",
  "populate[finalCta][populate]=*",
  "populate[solutions][populate]=*",
  "populate[industries][populate]=*",
  "populate[howWeWork][populate]=*",
  "populate[whyUs][populate]=*",
  "populate[techEcosystem][populate]=*",
  "populate[faqs][populate]=*",
  "populate[seo][populate]=*",
].join("&");

const GLOBAL_POPULATE = [
  "populate[nav][populate]=*",
  "populate[footer][populate][linkGroups][populate]=*",
  "populate[socials][populate]=*",
  "populate[defaultSeo][populate]=*",
  "populate[favicon][populate]=*",
].join("&");

const CASE_STUDY_POPULATE = [
  "populate[results][populate]=*",
  "populate[technologies][populate]=*",
  "populate[cover][populate]=*",
  "sort=order:asc",
  "pagination[pageSize]=50",
].join("&");

const TESTIMONIAL_POPULATE = ["populate[avatar][populate]=*", "sort=order:asc"].join("&");

export function getHomepage(locale: string, draft = false) {
  return strapiGet<Homepage>(`homepage?locale=${locale}&${HOMEPAGE_POPULATE}`, { draft });
}

export function getGlobal(locale: string, draft = false) {
  return strapiGet<Global>(`global?locale=${locale}&${GLOBAL_POPULATE}`, { draft });
}

export function getCaseStudies(locale: string, draft = false) {
  return strapiGet<CaseStudy[]>(`case-studies?locale=${locale}&${CASE_STUDY_POPULATE}`, { draft });
}

export function getTestimonials(locale: string, draft = false) {
  return strapiGet<Testimonial[]>(`testimonials?locale=${locale}&${TESTIMONIAL_POPULATE}`, { draft });
}
