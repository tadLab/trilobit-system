import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { SectionDivider } from "@/components/SectionDivider";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Benefits } from "@/components/Benefits";
import { AboutPreview } from "@/components/AboutPreview";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { QuickContact } from "@/components/QuickContact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <SectionDivider />
        <UpcomingEvents />
        <SectionDivider />
        <Benefits />
        <SectionDivider />
        <AboutPreview />
        <SectionDivider />
        <Gallery />
        <SectionDivider />
        <Testimonials />
        <FinalCTA />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
