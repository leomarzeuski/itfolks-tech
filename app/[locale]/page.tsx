import { setRequestLocale } from "next-intl/server";
import {
  Header,
  HeroSection,
  ServicesSection,
  TeamSection,
  ProjectsSection,
  MethodologySection,
  TechStackSection,
  Footer,
} from "@/components/sections";
import { GridBackground } from "@/components/grid-background";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GridBackground />

      <div className="noise-overlay" />

      <main className="relative min-h-screen">
        <Header />
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <ProjectsSection />
        <MethodologySection />
        <TechStackSection />
        <Footer />
      </main>
    </>
  );
}
