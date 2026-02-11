import { Send } from 'lucide-react';
import { useState } from 'react';

export function SignUpForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    contact: '',
    childAge: '',
    interest: 'event',
    notes: '',
    preferredDate: '',
    gdprConsent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Sign up form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 rounded-2xl p-8 lg:p-12 border border-green-200">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl text-stone-900 mb-4">
              Děkujeme za přihlášku!
            </h2>
            <p className="text-xl text-stone-700 mb-6">
              Ozveme se do 24 hodin a domluvíme detaily.
            </p>
            <p className="text-stone-600">
              Pokud si chcete promluvit hned, zavolejte nám na <strong>602 801 010</strong>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-stone-50 rounded-2xl p-8 lg:p-10 border border-stone-200">
          <div className="space-y-6">
            {/* Parent Name */}
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-stone-900 mb-2">
                Jméno rodiče *
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="Vaše jméno"
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-stone-900 mb-2">
                Email nebo telefon *
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="email@example.com nebo 123 456 789"
              />
            </div>

            {/* Child Age */}
            <div>
              <label htmlFor="childAge" className="block text-sm font-medium text-stone-900 mb-2">
                Věk dítěte *
              </label>
              <input
                type="text"
                id="childAge"
                name="childAge"
                required
                value={formData.childAge}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="např. 8 let"
              />
            </div>

            {/* What are you looking for */}
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-stone-900 mb-2">
                Co hledáte? *
              </label>
              <select
                id="interest"
                name="interest"
                required
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
              >
                <option value="event">Zkusit nejbližší akci</option>
                <option value="program">Pravidelný program</option>
                <option value="question">Jen se zeptat</option>
              </select>
            </div>

            {/* Preferred Date (optional) */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-stone-900 mb-2">
                Preferovaný termín (nepovinné)
              </label>
              <input
                type="text"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="např. víkendy, odpoledne..."
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-stone-900 mb-2">
                Poznámka (alergie, zkušenost, dotaz)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors resize-none"
                placeholder="Zde napište, pokud má dítě nějaké alergie, předchozí zkušenosti s outdoor aktivitami, nebo máte nějaký dotaz..."
              />
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                required
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-600"
              />
              <label htmlFor="gdprConsent" className="text-sm text-stone-700">
                Souhlasím se zpracováním osobních údajů pro účely kontaktování ohledně činnosti kmene Trilobit. 
                Více informací o ochraně osobních údajů naleznete v <a href="#" className="text-amber-700 hover:text-amber-800 underline">zásadách ochrany osobních údajů</a>. *
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-colors text-lg font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Odeslat přihlášku
              </button>
              <p className="text-sm text-stone-600 text-center mt-3">
                Ozveme se do 24 hodin.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
