import { Header } from './Header';
import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { UpcomingEvents } from './UpcomingEvents';
import { Benefits } from './Benefits';
import { About } from './About';
import { Gallery } from './Gallery';
import { Testimonials } from './Testimonials';
import { FinalCTA } from './FinalCTA';
import { QuickContact } from './QuickContact';
import { Footer } from './Footer';
import { SectionDivider } from './SectionDivider';

export function HomePage() {
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
        <About />
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