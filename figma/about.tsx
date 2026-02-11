import { Header } from './components/Header';
import { AboutHero } from './components/about/AboutHero';
import { OurStory } from './components/about/OurStory';
import { HowItWorks } from './components/about/HowItWorks';
import { TribeValues } from './components/about/TribeValues';
import { TeamSection } from './components/about/TeamSection';
import { SafetySection } from './components/about/SafetySection';
import { PhotoStory } from './components/about/PhotoStory';
import { AboutCTA } from './components/about/AboutCTA';
import { QuickContact } from './components/QuickContact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <TribeValues />
        <SectionDivider />
        <TeamSection />
        <SectionDivider />
        <SafetySection />
        <SectionDivider />
        <PhotoStory />
        <AboutCTA />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
