import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../App';

export function FinalCTA() {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">
          Přidejte se k našemu kmenu
        </h2>
        <p className="text-xl text-stone-700 mb-10">
          Staňte se součástí TRILOBITu a dejte svému dítěti možnost prožít 
          nezapomenutelná dobrodružství v přírodě.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigateTo('signup')}
            className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg"
          >
            Přihlásit dítě na první akci
          </button>
          <button 
            onClick={() => navigateTo('calendar')}
            className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2"
          >
            Kalendář akcí
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}