import { Header } from './components/Header';
import { ContactHero } from './components/contact/ContactHero';
import { ContactCards } from './components/contact/ContactCards';
import { ContactForm } from './components/contact/ContactForm';
import { ContactFAQ } from './components/contact/ContactFAQ';
import { ContactCTA } from './components/contact/ContactCTA';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <ContactCards />
        <SectionDivider />
        <ContactForm />
        <SectionDivider />
        <ContactFAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
