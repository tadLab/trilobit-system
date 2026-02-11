import { ProgramsHero } from './components/programs/ProgramsHero';
import { ProgramFilters } from './components/programs/ProgramFilters';
import { ProgramCards } from './components/programs/ProgramCards';
import { HowItWorks } from './components/programs/HowItWorks';
import { ProgramFAQ } from './components/programs/ProgramFAQ';
import { ProgramCTA } from './components/programs/ProgramCTA';
import { Header } from './components/Header';
import { QuickContact } from './components/QuickContact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { useState } from 'react';

export function ProgramsPage() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProgramsHero />
        <ProgramFilters
          selectedAge={selectedAge}
          selectedType={selectedType}
          selectedSeason={selectedSeason}
          onAgeChange={setSelectedAge}
          onTypeChange={setSelectedType}
          onSeasonChange={setSelectedSeason}
        />
        <ProgramCards
          selectedAge={selectedAge}
          selectedType={selectedType}
          selectedSeason={selectedSeason}
        />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <ProgramFAQ />
        <ProgramCTA />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}

export default ProgramsPage;
