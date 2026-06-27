// Types for the Strapi content powering the marketing site.

export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime?: string;
};

export type Cta = { label: string; href: string };
export type Stat = { value: string; label: string };
export type PainPoint = { icon?: string; text: string };
export type Solution = { icon?: string; title: string; description?: string; outcome?: string };
export type Industry = { icon?: string; name: string; description?: string };
export type Step = { stepLabel?: string; title: string; description?: string };
export type Value = { title: string; description?: string };
export type Tech = { name: string };
export type FaqItem = { question: string; answer: string };
export type ResultItem = { metric: string; label: string };
export type LinkItem = { label: string; href: string };
export type LinkGroup = { title: string; links: LinkItem[] };
export type Social = { platform: string; url: string };

export type Seo = {
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia | null;
};

export type Hero = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: Cta | null;
  secondaryCta?: Cta | null;
  stats?: Stat[];
};

export type Problem = {
  heading: string;
  intro?: string;
  painPoints?: PainPoint[];
};

export type FinalCta = {
  heading: string;
  subtext?: string;
  cta?: Cta | null;
};

export type Homepage = {
  hero: Hero;
  problem?: Problem;
  solutions?: Solution[];
  industries?: Industry[];
  howWeWork?: Step[];
  whyUs?: Value[];
  techEcosystem?: Tech[];
  faqs?: FaqItem[];
  finalCta?: FinalCta;
  seo?: Seo | null;
};

export type CaseStudy = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  client?: string;
  industry?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  results?: ResultItem[];
  technologies?: Tech[];
  cover?: StrapiMedia | null;
  videoUrl?: string;
  mobileVideoUrl?: string;
  posterUrl?: string;
  featured?: boolean;
  order?: number;
};

export type Testimonial = {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatar?: StrapiMedia | null;
  featured?: boolean;
};

export type Global = {
  siteName: string;
  siteDescription: string;
  favicon?: StrapiMedia | null;
  defaultSeo?: Seo | null;
  nav?: LinkItem[];
  footer?: { tagline?: string; linkGroups?: LinkGroup[] } | null;
  socials?: Social[];
  contactEmail?: string;
  calLink?: string;
};
