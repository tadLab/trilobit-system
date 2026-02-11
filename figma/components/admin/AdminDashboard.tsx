import { 
  Calendar, 
  FileText, 
  Users, 
  Image, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Mail,
  BarChart
} from 'lucide-react';
import { useNavigation } from '../../App';

export function AdminDashboard() {
  const { navigateTo } = useNavigation();

  const handleLogout = () => {
    localStorage.removeItem('trilobit_admin');
    navigateTo('login');
  };

  const adminCards = [
    {
      title: 'Přidat akci',
      description: 'Vytvořit novou akci v kalendáři',
      icon: Plus,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      action: () => alert('Přidání akce - připravujeme'),
    },
    {
      title: 'Upravit události',
      description: 'Spravovat nadcházející akce',
      icon: Calendar,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      action: () => alert('Úprava událostí - připravujeme'),
    },
    {
      title: 'Přidat program',
      description: 'Vytvořit nový pravidelný program',
      icon: Plus,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      action: () => alert('Přidání programu - připravujeme'),
    },
    {
      title: 'Upravit programy',
      description: 'Spravovat existující programy',
      icon: FileText,
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      action: () => alert('Úprava programů - připravujeme'),
    },
    {
      title: 'Přihlášky dětí',
      description: 'Zobrazit a spravovat přihlášky',
      icon: Users,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600',
      action: () => alert('Přihlášky - připravujeme'),
    },
    {
      title: 'Galerie',
      description: 'Spravovat fotky a média',
      icon: Image,
      color: 'bg-pink-50 border-pink-200',
      iconColor: 'text-pink-600',
      action: () => alert('Galerie - připravujeme'),
    },
    {
      title: 'Statistiky',
      description: 'Zobrazit návštěvnost a reporty',
      icon: BarChart,
      color: 'bg-teal-50 border-teal-200',
      iconColor: 'text-teal-600',
      action: () => alert('Statistiky - připravujeme'),
    },
    {
      title: 'Nastavení',
      description: 'Konfigurace webu a kontaktů',
      icon: Settings,
      color: 'bg-stone-50 border-stone-200',
      iconColor: 'text-stone-600',
      action: () => alert('Nastavení - připravujeme'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Administrace kmene
            </h1>
            <p className="text-lg text-stone-600">
              Vítejte v administračním rozhraní TRILOBIT
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Odhlásit se</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-stone-600">Nadcházející akce</h3>
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-stone-900">12</p>
          <p className="text-sm text-stone-500 mt-1">V následujících 30 dnech</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-stone-600">Aktivní programy</h3>
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-stone-900">4</p>
          <p className="text-sm text-stone-500 mt-1">Malý kmen, Velký kmen, Výpravy</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-stone-600">Nové přihlášky</h3>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-stone-900">3</p>
          <p className="text-sm text-stone-500 mt-1">Vyžadují zpracování</p>
        </div>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminCards.map((card, index) => (
          <button
            key={index}
            onClick={card.action}
            className={`${card.color} rounded-xl p-6 border text-left hover:shadow-lg transition-all hover:scale-105`}
          >
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-stone-600">
              {card.description}
            </p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
        <h2 className="text-xl font-bold text-stone-900 mb-4">
          Nedávná aktivita
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-stone-200">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">Nová akce přidána</p>
              <p className="text-sm text-stone-600">Výprava do lesa - 15. února 2026</p>
              <p className="text-xs text-stone-500 mt-1">Před 2 hodinami</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-stone-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">Nová přihláška</p>
              <p className="text-sm text-stone-600">Jana Nováková - syn Tomáš (8 let)</p>
              <p className="text-xs text-stone-500 mt-1">Před 5 hodinami</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Edit className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-900">Program aktualizován</p>
              <p className="text-sm text-stone-600">Velký kmen - změna termínu srazu</p>
              <p className="text-xs text-stone-500 mt-1">Před 1 dnem</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
