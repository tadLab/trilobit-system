import { Mail, Lock, AlertCircle, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '../../App';

type AuthMode = 'login' | 'register';

export function LoginForm() {
  const { navigateTo } = useNavigation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      // Simple demo authentication - replace with real auth
      if (formData.email && formData.password) {
        // Store auth state in localStorage (in production, use proper auth tokens)
        localStorage.setItem('trilobit_admin', 'true');
        navigateTo('admin');
      } else {
        setError('Vyplňte prosím všechna pole');
      }
    } else {
      // Registration
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Vyplňte prosím všechna pole');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Hesla se neshodují');
        return;
      }
      if (formData.password.length < 6) {
        setError('Heslo musí mít alespoň 6 znaků');
        return;
      }
      // In production, send registration request to backend
      setSuccess('Registrace proběhla úspěšně! Nyní se můžete přihlásit.');
      setMode('login');
      setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-stone-200">
        <button
          onClick={() => {
            setMode('login');
            setError('');
            setSuccess('');
          }}
          className={`flex-1 pb-3 font-medium transition-colors relative ${
            mode === 'login'
              ? 'text-blue-900'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Přihlásit se
          {mode === 'login' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900"></div>
          )}
        </button>
        <button
          onClick={() => {
            setMode('register');
            setError('');
            setSuccess('');
          }}
          className={`flex-1 pb-3 font-medium transition-colors relative ${
            mode === 'register'
              ? 'text-blue-900'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Registrovat se
          {mode === 'register' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900"></div>
          )}
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">
          {mode === 'login' ? 'Přihlášení' : 'Registrace'}
        </h1>
        <p className="text-stone-600">
          {mode === 'login' 
            ? 'Přihlaste se do administrace kmene' 
            : 'Vytvořte si účet pro správu kmene'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name (Registration only) */}
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">
              Celé jméno *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="Jan Novák"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-2">
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
              placeholder="vas@email.cz"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-900 mb-2">
            Heslo *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {mode === 'register' && (
            <p className="text-xs text-stone-500 mt-1">Minimálně 6 znaků</p>
          )}
        </div>

        {/* Confirm Password (Registration only) */}
        {mode === 'register' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-900 mb-2">
              Potvrdit heslo *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {/* Forgot Password Link (Login only) */}
        {mode === 'login' && (
          <div className="flex justify-end">
            <a href="#" className="text-sm text-amber-700 hover:text-amber-800 transition-colors">
              Zapomněli jste heslo?
            </a>
          </div>
        )}

        {/* Admin Note (Registration only) */}
        {mode === 'register' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-950">
              <strong>Poznámka:</strong> Tento účet je pouze pro vedoucí kmene a administratory.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          {mode === 'login' ? 'Přihlásit se' : 'Vytvořit účet'}
        </button>
      </form>

      {/* Request Access (Login only) */}
      {mode === 'login' && (
        <div className="mt-8 pt-6 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-600 mb-3">
            Potřebujete přístup k administraci?
          </p>
          <a
            href="mailto:kmentrilobit@gmail.com?subject=Žádost%20o%20přístup%20do%20administrace"
            className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 transition-colors font-medium text-sm"
          >
            <Mail className="w-4 h-4" />
            Požádat o admin přístup
          </a>
        </div>
      )}
    </div>
  );
}