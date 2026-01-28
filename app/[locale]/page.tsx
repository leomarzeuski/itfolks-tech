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
import { GridScan } from "@/components/react-bits/GridScan";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#0a1628"
          gridScale={0.1}
          scanColor="#3B82F6"
          scanOpacity={0.35}
          enablePost
          bloomIntensity={0.5}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

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
