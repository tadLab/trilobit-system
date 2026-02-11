import { useState, createContext, useContext } from 'react';
import { HomePage } from './components/HomePage';
import ProgramsPage from './programs';
import CalendarPage from './calendar';
import AboutPage from './about';
import ContactPage from './contact';
import SignUpPage from './signup';
import LoginPage from './login';
import AdminPage from './admin';
import { Header } from './components/Header';
import { QuickContact } from './components/QuickContact';
import { Footer } from './components/Footer';

type Page = 'home' | 'programs' | 'calendar' | 'about' | 'contact' | 'signup' | 'login' | 'admin';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigateTo: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      <div className="min-h-screen bg-white">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'programs' && <ProgramsPage />}
        {currentPage === 'calendar' && <CalendarPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'signup' && <SignUpPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'admin' && <AdminPage />}
      </div>
    </NavigationContext.Provider>
  );
}

export { NavigationContext };