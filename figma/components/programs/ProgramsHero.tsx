import { Calendar } from 'lucide-react';
import { useNavigation } from '../../App';

export function ProgramsHero() {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tribal motif */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17L11 22" strokeLinecap="round"/>
            </svg>
            <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
          </div>

          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">
            Programy & aktivity
          </h1>
          
          <p className="text-xl text-stone-700 mb-10">
            Pravidelné outdoorové aktivity pro děti v Cholticích a okolí. 
            Vaše dítě získá kamarády, dovednosti a sebedůvěru skrze zážitky v přírodě.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('signup')}
              className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg"
            >
              Přihlásit dítě
            </button>
            <button 
              onClick={() => navigateTo('calendar')}
              className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Kalendář akcí
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
