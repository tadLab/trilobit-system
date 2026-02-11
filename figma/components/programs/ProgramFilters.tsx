import { X } from 'lucide-react';

interface ProgramFiltersProps {
  selectedAge: string | null;
  selectedType: string | null;
  selectedSeason: string | null;
  onAgeChange: (age: string | null) => void;
  onTypeChange: (type: string | null) => void;
  onSeasonChange: (season: string | null) => void;
}

export function ProgramFilters({
  selectedAge,
  selectedType,
  selectedSeason,
  onAgeChange,
  onTypeChange,
  onSeasonChange,
}: ProgramFiltersProps) {
  const ages = ['6–8 let', '9–10 let', '11–12 let'];
  const types = ['Pravidelné', 'Výpravy', 'Speciální akce'];
  const seasons = ['Jaro', 'Léto', 'Podzim', 'Zima'];

  const hasActiveFilters = selectedAge || selectedType || selectedSeason;

  const clearAllFilters = () => {
    onAgeChange(null);
    onTypeChange(null);
    onSeasonChange(null);
  };

  return (
    <section className="py-8 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-stone-700">Filtrovat programy:</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-900 hover:text-blue-950 transition-colors"
              >
                Zrušit filtry
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Age Filter */}
            <div className="flex-1">
              <p className="text-xs text-stone-600 mb-2">Věk:</p>
              <div className="flex flex-wrap gap-2">
                {ages.map((age) => (
                  <button
                    key={age}
                    onClick={() => onAgeChange(selectedAge === age ? null : age)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedAge === age
                        ? 'bg-blue-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {age}
                    {selectedAge === age && <X className="inline-block w-3 h-3 ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex-1">
              <p className="text-xs text-stone-600 mb-2">Typ:</p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => onTypeChange(selectedType === type ? null : type)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedType === type
                        ? 'bg-blue-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {type}
                    {selectedType === type && <X className="inline-block w-3 h-3 ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Season Filter */}
            <div className="flex-1">
              <p className="text-xs text-stone-600 mb-2">Sezóna:</p>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => onSeasonChange(selectedSeason === season ? null : season)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedSeason === season
                        ? 'bg-blue-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {season}
                    {selectedSeason === season && <X className="inline-block w-3 h-3 ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
