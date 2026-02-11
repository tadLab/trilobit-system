import { Header } from './components/Header';
import { LoginForm } from './components/login/LoginForm';
import { Footer } from './components/Footer';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration & Info */}
            <div className="hidden lg:block">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-10 h-10 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17L11 22" strokeLinecap="round"/>
                  </svg>
                  <span className="text-2xl font-bold text-stone-900">TRILOBIT Admin</span>
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mb-4">
                  Pro vedoucí kmene
                </h2>
                <p className="text-lg text-stone-700 mb-6">
                  Přihlaste se pro správu akcí, programů a komunikaci s rodiči.
                </p>
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="font-semibold text-stone-900 mb-3">Co můžete spravovat:</h3>
                  <ul className="space-y-2 text-stone-700">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                      <span>Kalendář akcí a výprav</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                      <span>Programy a aktivity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                      <span>Přihlášky dětí</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                      <span>Fotogalerie</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
