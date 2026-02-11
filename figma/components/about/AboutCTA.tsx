import { Mail, Phone } from 'lucide-react';
import { useNavigation } from '../../App';

export function AboutCTA() {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl text-stone-900 mb-6">
          Přidejte se k našemu kmenu
        </h2>
        <p className="text-xl text-stone-700 mb-10">
          Vaše dítě si najde kamarády, získá sebedůvěru a prožije nezapomenutelná dobrodružství v přírodě.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button 
            onClick={() => navigateTo('signup')}
            className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-colors text-lg"
          >
            Přihlásit dítě
          </button>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-amber-600 hover:text-amber-700 transition-colors text-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Kontakt
          </button>
        </div>

        {/* Quick contact strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-stone-700 pt-6 border-t border-stone-200">
          <a href="tel:+420602801010" className="flex items-center gap-2 hover:text-amber-700 transition-colors">
            <Phone className="w-5 h-5 text-amber-600" />
            <span className="font-medium">602 801 010</span>
          </a>
          <a href="mailto:kmentrilobit@gmail.com" className="flex items-center gap-2 hover:text-amber-700 transition-colors">
            <Mail className="w-5 h-5 text-amber-600" />
            <span className="font-medium">kmentrilobit@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}