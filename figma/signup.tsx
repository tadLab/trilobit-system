import { Header } from './components/Header';
import { SignUpHero } from './components/signup/SignUpHero';
import { SignUpForm } from './components/signup/SignUpForm';
import { SignUpSteps } from './components/signup/SignUpSteps';
import { QuickContact } from './components/QuickContact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';

export function SignUpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SignUpHero />
        <SignUpForm />
        <SectionDivider />
        <SignUpSteps />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}

export default SignUpPage;
