import { Menu, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../App';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useNavigation();

  const isActive = (page: string) => currentPage === page;

  const handleNavigation = (page: 'home' | 'programs' | 'calendar' | 'about' | 'contact' | 'signup' | 'login' | 'admin') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const handleAccountClick = () => {
    const isAdmin = localStorage.getItem('trilobit_admin');
    if (isAdmin) {
      navigateTo('admin');
    } else {
      navigateTo('login');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavigation('home')} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <span className="text-2xl font-bold text-stone-800">TRILOBIT</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`transition-colors ${
                isActive('home') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
              }`}
            >
              Domů
            </button>
            <button 
              onClick={() => handleNavigation('programs')}
              className={`transition-colors ${
                isActive('programs') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
              }`}
            >
              Programy/Aktivity
            </button>
            <button 
              onClick={() => handleNavigation('calendar')}
              className={`transition-colors ${
                isActive('calendar') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
              }`}
            >
              Kalendář akcí
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`transition-colors ${
                isActive('about') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
              }`}
            >
              O nás
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`transition-colors ${
                isActive('contact') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
              }`}
            >
              Kontakt
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleNavigation('signup')}
              className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors"
            >
              Přihlásit dítě
            </button>
            <button 
              onClick={handleAccountClick}
              className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
              aria-label="Admin přihlášení"
              title="Admin přihlášení"
            >
              <User className="w-5 h-5 text-stone-700" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-stone-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleNavigation('home')}
                className={`py-2 transition-colors text-left ${
                  isActive('home') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
                }`}
              >
                Domů
              </button>
              <button 
                onClick={() => handleNavigation('programs')}
                className={`py-2 transition-colors text-left ${
                  isActive('programs') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
                }`}
              >
                Programy/Aktivity
              </button>
              <button 
                onClick={() => handleNavigation('calendar')}
                className={`py-2 transition-colors text-left ${
                  isActive('calendar') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
                }`}
              >
                Kalendář akcí
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`py-2 transition-colors text-left ${
                  isActive('about') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
                }`}
              >
                O nás
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`py-2 transition-colors text-left ${
                  isActive('contact') ? 'text-blue-900 font-medium' : 'text-stone-700 hover:text-blue-900'
                }`}
              >
                Kontakt
              </button>
              <button 
                onClick={() => handleNavigation('signup')}
                className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors mt-2"
              >
                Přihlásit dítě
              </button>
              <button 
                onClick={handleAccountClick}
                className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                aria-label="Admin přihlášení"
              >
                <User className="w-5 h-5 text-stone-700" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
