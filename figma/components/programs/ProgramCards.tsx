import { Users, MapPin, Calendar, Clock, ChevronRight, CheckCircle, Info } from 'lucide-react';

interface ProgramCardsProps {
  selectedAge: string | null;
  selectedType: string | null;
  selectedSeason: string | null;
}

export function ProgramCards({ selectedAge, selectedType, selectedSeason }: ProgramCardsProps) {
  const programs = [
    {
      name: 'Malý kmen',
      age: '6–8 let',
      type: 'Pravidelné',
      season: 'Celý rok',
      description: 'Vaše dítě získá první zkušenosti v přírodě, kamarády a radost z pohybu venku.',
      location: 'Choltice',
      frequency: 'Každý týden',
      duration: '2 hodiny',
      whatKidsDo: [
        'Hry a aktivity v přírodě',
        'Základní outdoorové dovednosti',
        'Týmová spolupráce a kamarádství',
      ],
      forParents: [
        'Sraz vždy v centru Choltic',
        'Dítě potřebuje outdoorové oblečení + láhev na pití',
      ],
    },
    {
      name: 'Velký kmen',
      age: '9–12 let',
      type: 'Pravidelné',
      season: 'Celý rok',
      description: 'Pokročilejší aktivity, samostatnost a výzvy. Dítě posílí sebedůvěru a získá praktické dovednosti.',
      location: 'Choltice a okolí',
      frequency: 'Každý týden',
      duration: '3 hodiny',
      whatKidsDo: [
        'Orientace v terénu a stopování',
        'Stavba přístřešků a táborová řemesla',
        'Náročnější výpravy a expedice',
      ],
      forParents: [
        'Děti jsou pod dohledem zkušených vedoucích',
        'Fotky z akcí posíláme rodičům',
      ],
    },
    {
      name: 'Víkendové výpravy',
      age: '6–12 let',
      type: 'Výpravy',
      season: 'Jaro/Léto/Podzim',
      description: 'Celodenní dobrodružství v přírodě. Dítě pozná nová místa a zažije skutečnou expedici.',
      location: 'Region Pardubicka',
      frequency: '1× měsíčně',
      duration: 'Celý den',
      whatKidsDo: [
        'Túry do zajímavých přírodních lokalit',
        'Poznávání přírody a historie',
        'Táborové ohně a společné aktivity',
      ],
      forParents: [
        'Svačina a oběd zajištěn',
        'Doprava zajištěna z Choltic',
      ],
    },
    {
      name: 'Letní tábor',
      age: '6–12 let',
      type: 'Speciální akce',
      season: 'Léto',
      description: 'Týdenní pobyt v přírodě plný her, výzev a nezapomenutelných zážitků.',
      location: 'Tábořiště v okolí Choltic',
      frequency: 'Červenec/Srpen',
      duration: '5–7 dní',
      whatKidsDo: [
        'Stanování a táborový život',
        'Velké hry a dobrodružné úkoly',
        'Nové kamarádství a týmový duch',
      ],
      forParents: [
        'Kapacita omezena na 30 dětí',
        'Registrace od března',
      ],
    },
  ];

  const filteredPrograms = programs.filter((program) => {
    if (selectedAge && program.age !== selectedAge) return false;
    if (selectedType && program.type !== selectedType) return false;
    if (selectedSeason && !program.season.includes(selectedSeason)) return false;
    return true;
  });

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">
              Žádné programy neodpovídají vybraným filtrům. Zkuste změnit filtry.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-amber-600 transition-all hover:shadow-lg"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-stone-900">{program.name}</h3>
                    <span className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                      {program.age}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{program.description}</p>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-stone-200">
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{program.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>Pro děti</span>
                  </div>
                </div>

                {/* What Kids Do */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-900 mb-3">Co děti dělají:</h4>
                  <ul className="space-y-2">
                    {program.whatKidsDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* For Parents */}
                <div className="mb-6 p-4 bg-amber-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">Pro rodiče:</h4>
                  <ul className="space-y-1">
                    {program.forParents.map((item, i) => (
                      <li key={i} className="text-sm text-stone-700">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => navigateTo('signup')}
                    className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-medium"
                  >
                    Přihlásit dítě
                  </button>
                  <button className="flex-1 bg-white text-stone-700 px-6 py-3 rounded-full border-2 border-stone-300 hover:border-amber-600 hover:text-amber-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" />
                    Více info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}