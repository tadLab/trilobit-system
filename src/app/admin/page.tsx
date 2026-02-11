"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Calendar, FileText, Users, Image, Settings, LogOut, Plus, Pencil, Mail, BarChart, Lock, User, AlertCircle,
} from "lucide-react";
import Link from "next/link";

/* ── Login Form ── */
type AuthMode = "login" | "register";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "login") {
      if (formData.email === "admin@trilobit.cz" && formData.password === "admin") {
        localStorage.setItem("trilobit_admin", "true");
        onLogin();
      } else {
        setError("Nesprávný email nebo heslo");
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Vyplňte prosím všechna pole");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Hesla se neshodují");
        return;
      }
      if (formData.password.length < 6) {
        setError("Heslo musí mít alespoň 6 znaků");
        return;
      }
      setSuccess("Registrace proběhla úspěšně! Nyní se můžete přihlásit.");
      setMode("login");
      setFormData({ name: "", email: formData.email, password: "", confirmPassword: "" });
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 bg-stone-50">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-stone-200">
            <button onClick={() => switchMode("login")} className={`flex-1 pb-3 font-medium transition-colors relative ${mode === "login" ? "text-blue-900" : "text-stone-600 hover:text-stone-900"}`}>
              Přihlásit se
              {mode === "login" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />}
            </button>
            <button onClick={() => switchMode("register")} className={`flex-1 pb-3 font-medium transition-colors relative ${mode === "register" ? "text-blue-900" : "text-stone-600 hover:text-stone-900"}`}>
              Registrovat se
              {mode === "register" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900" />}
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-stone-900 mb-2">{mode === "login" ? "Přihlášení" : "Registrace"}</h1>
            <p className="text-stone-600">{mode === "login" ? "Přihlaste se do administrace kmene" : "Vytvořte si účet pro správu kmene"}</p>
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
            {mode === "register" && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">Celé jméno *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-stone-400" /></div>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="Jan Novák" />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-2">Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-stone-400" /></div>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="vas@email.cz" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-900 mb-2">Heslo *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-stone-400" /></div>
                <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="••••••••" />
              </div>
              {mode === "register" && <p className="text-xs text-stone-500 mt-1">Minimálně 6 znaků</p>}
            </div>
            {mode === "register" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-900 mb-2">Potvrdit heslo *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-stone-400" /></div>
                  <input type="password" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" placeholder="••••••••" />
                </div>
              </div>
            )}
            {mode === "register" && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-950"><strong>Poznámka:</strong> Tento účet je pouze pro vedoucí kmene a administratory.</p>
              </div>
            )}
            <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium">
              {mode === "login" ? "Přihlásit se" : "Vytvořit účet"}
            </button>
          </form>

          {mode === "login" && (
            <div className="mt-8 pt-6 border-t border-stone-200 text-center">
              <p className="text-sm text-stone-600 mb-3">Potřebujete přístup k administraci?</p>
              <a href="mailto:kmentrilobit@gmail.com?subject=Žádost%20o%20přístup%20do%20administrace" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 transition-colors font-medium text-sm">
                <Mail className="w-4 h-4" />Požádat o admin přístup
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Admin Dashboard ── */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const adminCards = [
    { title: "Přidat akci", description: "Vytvořit novou akci v kalendáři", icon: Plus, color: "bg-green-50 border-green-200", iconColor: "text-green-600" },
    { title: "Upravit události", description: "Spravovat nadcházející akce", icon: Calendar, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
    { title: "Přidat program", description: "Vytvořit nový pravidelný program", icon: Plus, color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600" },
    { title: "Upravit programy", description: "Spravovat existující programy", icon: FileText, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
    { title: "Přihlášky dětí", description: "Zobrazit a spravovat přihlášky", icon: Users, color: "bg-indigo-50 border-indigo-200", iconColor: "text-indigo-600" },
    { title: "Galerie", description: "Spravovat fotky a média", icon: Image, color: "bg-pink-50 border-pink-200", iconColor: "text-pink-600" },
    { title: "Statistiky", description: "Zobrazit návštěvnost a reporty", icon: BarChart, color: "bg-teal-50 border-teal-200", iconColor: "text-teal-600" },
    { title: "Nastavení", description: "Konfigurace webu a kontaktů", icon: Settings, color: "bg-stone-50 border-stone-200", iconColor: "text-stone-600" },
  ];

  return (
    <section className="py-12 bg-stone-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Administrace kmene</h1>
            <p className="text-lg text-stone-600">Vítejte v administračním rozhraní TRILOBIT</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <LogOut className="w-5 h-5" /><span className="font-medium">Odhlásit se</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Nadcházející akce</h3><Calendar className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">12</p><p className="text-sm text-stone-500 mt-1">V následujících 30 dnech</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Aktivní programy</h3><FileText className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">4</p><p className="text-sm text-stone-500 mt-1">Malý kmen, Velký kmen, Výpravy</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Nové přihlášky</h3><Users className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">3</p><p className="text-sm text-stone-500 mt-1">Vyžadují zpracování</p>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, i) => (
            <button key={i} className={`${card.color} rounded-xl p-6 border text-left hover:shadow-lg transition-all hover:scale-105`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{card.title}</h3>
              <p className="text-sm text-stone-600">{card.description}</p>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Nedávná aktivita</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><Plus className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-sm font-medium text-stone-900">Nová akce přidána</p><p className="text-sm text-stone-600">Výprava do lesa - 15. února 2026</p><p className="text-xs text-stone-500 mt-1">Před 2 hodinami</p></div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-sm font-medium text-stone-900">Nová přihláška</p><p className="text-sm text-stone-600">Jana Nováková - syn Tomáš (8 let)</p><p className="text-xs text-stone-500 mt-1">Před 5 hodinami</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><Pencil className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-sm font-medium text-stone-900">Program aktualizován</p><p className="text-sm text-stone-600">Velký kmen - změna termínu srazu</p><p className="text-xs text-stone-500 mt-1">Před 1 dnem</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("trilobit_admin") === "true");
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("trilobit_admin");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-stone-500">Načítám...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
