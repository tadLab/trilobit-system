import { Send } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    childAge: '',
    message: '',
    gdprConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">
            Napište nám
          </h2>
          <p className="text-xl text-stone-600">
            Vyplňte formulář a my se vám ozveme
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 lg:p-10 border border-stone-200 shadow-sm">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">
                Jméno rodiče *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="email@example.com nebo 123 456 789"
              />
            </div>

            {/* Child Age */}
            <div>
              <label htmlFor="childAge" className="block text-sm font-medium text-stone-900 mb-2">
                Věk dítěte (nepovinné)
              </label>
              <input
                type="text"
                id="childAge"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="např. 8 let"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-900 mb-2">
                Zpráva *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors resize-none"
                placeholder="Napište nám, co byste chtěli vědět nebo do jakého programu chcete dítě přihlásit..."
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
                Souhlasím se zpracováním osobních údajů pro účely kontaktování ohledně činnosti kmene Trilobit. *
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-colors text-lg font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Odeslat zprávu
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
