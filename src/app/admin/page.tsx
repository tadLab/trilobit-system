"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Calendar, FileText, Users, Settings, LogOut, Plus, Pencil, Mail, BarChart, Lock, User, AlertCircle,
  MapPin, Clock, ChevronRight, ChevronDown, BookOpen, Flame, Trophy, Star, TreePine, Compass, X, Check, Trash2, Save, Shield, Award,
} from "lucide-react";
import Link from "next/link";
import { useEvents } from "@/hooks/useEvents";
import { usePrograms } from "@/hooks/usePrograms";
import { useChildren } from "@/hooks/useChildren";
import { useFriends } from "@/hooks/useFriends";
import { useAttendance } from "@/hooks/useAttendance";
import { useAchievements } from "@/hooks/useAchievements";
import type { CalEvent, Program, Child, Achievement } from "@/types/data";

/* ── Types ── */
interface TrilobitUser {
  email: string;
  name: string;
  role: "admin" | "parent" | "teen" | "leader";
}

interface RegisteredUser {
  email: string;
  name: string;
  password: string;
  role: "parent" | "teen" | "leader";
}

type AuthMode = "login" | "register";

/* ── (mock data removed — children now come from useChildren hook) ── */

/* ── Login Form ── */
function LoginForm({ onLogin }: { onLogin: (user: TrilobitUser) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "parent" as "parent" | "teen" });
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
      // Demo admin
      if (formData.email === "admin@trilobit.cz" && formData.password === "admin") {
        const user: TrilobitUser = { email: "admin@trilobit.cz", name: "Administrátor", role: "admin" };
        localStorage.setItem("trilobit_user", JSON.stringify(user));
        onLogin(user);
        return;
      }
      // Demo parent
      if (formData.email === "rodic@trilobit.cz" && formData.password === "rodic") {
        const user: TrilobitUser = { email: "rodic@trilobit.cz", name: "Jana Nováková", role: "parent" };
        localStorage.setItem("trilobit_user", JSON.stringify(user));
        onLogin(user);
        return;
      }
      // Demo teen
      if (formData.email === "dite@trilobit.cz" && formData.password === "dite") {
        const user: TrilobitUser = { email: "dite@trilobit.cz", name: "Tomáš Novák", role: "teen" };
        localStorage.setItem("trilobit_user", JSON.stringify(user));
        onLogin(user);
        return;
      }
      // Demo leader
      if (formData.email === "vedouci@trilobit.cz" && formData.password === "vedouci") {
        const user: TrilobitUser = { email: "vedouci@trilobit.cz", name: "Marek Procházka", role: "leader" };
        localStorage.setItem("trilobit_user", JSON.stringify(user));
        onLogin(user);
        return;
      }
      // Registered users
      const registeredRaw = localStorage.getItem("trilobit_registered_users");
      if (registeredRaw) {
        try {
          const registered: RegisteredUser[] = JSON.parse(registeredRaw);
          const found = registered.find((u) => u.email === formData.email && u.password === formData.password);
          if (found) {
            const user: TrilobitUser = { email: found.email, name: found.name, role: found.role || "parent" };
            localStorage.setItem("trilobit_user", JSON.stringify(user));
            onLogin(user);
            return;
          }
        } catch { /* ignore corrupt data */ }
      }
      setError("Nesprávný email nebo heslo");
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
      // Persist registration
      const registeredRaw = localStorage.getItem("trilobit_registered_users");
      const registered: RegisteredUser[] = registeredRaw ? JSON.parse(registeredRaw) : [];
      if (registered.some((u) => u.email === formData.email)) {
        setError("Účet s tímto emailem již existuje");
        return;
      }
      registered.push({ email: formData.email, name: formData.name, password: formData.password, role: formData.role });
      localStorage.setItem("trilobit_registered_users", JSON.stringify(registered));
      setSuccess(`Registrace proběhla úspěšně! Nyní se můžete přihlásit jako ${formData.role === "parent" ? "rodič" : "uživatel"}.`);
      setMode("login");
      setFormData({ name: "", email: formData.email, password: "", confirmPassword: "", role: "parent" });
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
            <p className="text-stone-600">{mode === "login" ? "Přihlaste se do svého účtu" : "Vytvořte si účet jako rodič nebo uživatel"}</p>
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
                <label className="block text-sm font-medium text-stone-900 mb-2">Registruji se jako *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: "parent" }))}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.role === "parent"
                        ? "border-blue-900 bg-blue-50 text-blue-900"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Rodič</span>
                    <p className="text-xs mt-0.5 opacity-70">Přihlašuji své dítě</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: "teen" }))}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.role === "teen"
                        ? "border-blue-900 bg-blue-50 text-blue-900"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Uživatel</span>
                    <p className="text-xs mt-0.5 opacity-70">Člen kmene / teen</p>
                  </button>
                </div>
              </div>
            )}
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
                <p className="text-sm text-blue-950">
                  <strong>{formData.role === "parent" ? "Rodič:" : "Uživatel:"}</strong>{" "}
                  {formData.role === "parent"
                    ? "Jako rodič uvidíte přehled dětí, programů a nadcházejících akcí."
                    : "Jako uživatel uvidíte svůj profil, kamarády, odznaky a nadcházející akce."
                  }
                </p>
              </div>
            )}
            <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium">
              {mode === "login" ? "Přihlásit se" : "Vytvořit účet"}
            </button>
          </form>

          {mode === "login" && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="text-center space-y-3">
                <a href="mailto:kmentrilobit@gmail.com?subject=Zapomenuté%20heslo" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 transition-colors font-medium text-sm">
                  <Lock className="w-4 h-4" />Zapomenuté heslo
                </a>
                <p className="text-xs text-stone-500">Potřebujete pomoc? Napište nám na <a href="mailto:kmentrilobit@gmail.com" className="text-blue-900 hover:underline">kmentrilobit@gmail.com</a></p>
              </div>
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg">
                <p className="text-xs text-stone-500 mb-1 font-medium">Demo přístupy:</p>
                <p className="text-xs text-stone-500">Admin: admin@trilobit.cz / admin</p>
                <p className="text-xs text-stone-500">Vedoucí: vedouci@trilobit.cz / vedouci</p>
                <p className="text-xs text-stone-500">Rodič: rodic@trilobit.cz / rodic</p>
                <p className="text-xs text-stone-500">Dítě/Teen: dite@trilobit.cz / dite</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Parent Dashboard ── */
function ParentDashboard({ user, onLogout }: { user: TrilobitUser; onLogout: () => void }) {
  const { children, isLoaded: childrenLoaded, addChild, updateChild, deleteChild } = useChildren(user.email);
  const { programs, isLoaded: programsLoaded } = usePrograms();
  const { events: allEvents, isLoaded: eventsLoaded } = useEvents();

  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const [editingChild, setEditingChild] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ name: user.name, email: user.email, phone: "602 801 010" });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  // New child form state
  const emptyChildForm = { name: "", age: "", programId: "", note: "" };
  const [childForm, setChildForm] = useState(emptyChildForm);

  // Edit child form state
  const [editForm, setEditForm] = useState<{ name: string; age: string; programId: string; note: string }>({ name: "", age: "", programId: "", note: "" });

  const showFeedback = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(""), 2500); };

  // Derive "registered programs" from children's programIds
  const registeredPrograms = children.map((child) => {
    const prog = programs.find((p) => p.id === child.programId);
    return { childName: child.name, programId: child.programId, programName: child.programName, schedule: prog?.detail.schedule ?? "", location: prog?.location ?? "" };
  });

  // Upcoming events — future events from the shared data layer, sorted
  const upcomingEvents = allEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const toggleChild = (id: string) => setExpandedChild((prev) => (prev === id ? null : id));
  const toggleEvent = (id: string) => setExpandedEvent((prev) => (prev === id ? null : id));
  const handleSaveSettings = () => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2500); };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const prog = programs.find((p) => p.id === childForm.programId);
    addChild({
      name: childForm.name,
      age: Number(childForm.age),
      programId: childForm.programId,
      programName: prog?.name ?? "—",
      since: new Date().toLocaleDateString("cs-CZ", { month: "long", year: "numeric" }).replace(/^./, (c) => c.toUpperCase()),
      avatar: childForm.name.charAt(0).toUpperCase(),
      note: childForm.note,
    });
    setChildForm(emptyChildForm);
    setShowAddChild(false);
    showFeedback("Dítě přidáno!");
  };

  const startEdit = (child: Child) => {
    setEditingChild(child.id);
    setEditForm({ name: child.name, age: String(child.age), programId: child.programId, note: child.note });
    setExpandedChild(child.id);
  };

  const handleSaveEdit = (id: string) => {
    const prog = programs.find((p) => p.id === editForm.programId);
    updateChild(id, {
      name: editForm.name,
      age: Number(editForm.age),
      programId: editForm.programId,
      programName: prog?.name ?? "—",
      avatar: editForm.name.charAt(0).toUpperCase(),
      note: editForm.note,
    });
    setEditingChild(null);
    showFeedback("Změny uloženy!");
  };

  const handleDeleteChild = (id: string, name: string) => {
    if (confirm(`Opravdu chcete odebrat ${name}?`)) {
      deleteChild(id);
      showFeedback(`${name} odebrán/a`);
    }
  };

  if (!childrenLoaded || !programsLoaded || !eventsLoaded) {
    return (
      <section className="py-12 bg-stone-50 min-h-[80vh] flex items-center justify-center">
        <div className="text-stone-400 text-lg">Načítání…</div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-stone-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback toast */}
        {feedback && (
          <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
            <Check className="w-5 h-5" />{feedback}
          </div>
        )}

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Vítejte, {user.name}</h1>
            <p className="text-lg text-stone-600">Přehled vašich dětí a aktivit v kmeni Trilobit</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <LogOut className="w-5 h-5" /><span className="font-medium">Odhlásit se</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Moje děti</h3><Users className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{children.length}</p>
            <p className="text-sm text-stone-500 mt-1">Registrované v kmeni</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Aktivní programy</h3><BookOpen className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{new Set(children.map((c) => c.programId)).size}</p>
            <p className="text-sm text-stone-500 mt-1">{[...new Set(children.map((c) => c.programName))].join(", ") || "—"}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Nadcházející akce</h3><Calendar className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{upcomingEvents.length}</p>
            <p className="text-sm text-stone-500 mt-1">Nejbližší akce</p>
          </div>
        </div>

        {/* Children + Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Moje děti */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Moje děti</h2>
              <button
                onClick={() => { setShowAddChild(!showAddChild); setChildForm(emptyChildForm); }}
                className="text-sm text-blue-900 hover:text-blue-950 font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />Přidat dítě
              </button>
            </div>

            {/* Inline Add Child Form */}
            {showAddChild && (
              <form onSubmit={handleAddChild} className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-3">
                <h3 className="text-sm font-bold text-blue-900">Nové dítě</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Jméno dítěte *</label>
                    <input type="text" required value={childForm.name} onChange={(e) => setChildForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="Jméno" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Věk *</label>
                    <input type="number" required min={4} max={18} value={childForm.age} onChange={(e) => setChildForm((p) => ({ ...p, age: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="8" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Program *</label>
                  <select required value={childForm.programId} onChange={(e) => setChildForm((p) => ({ ...p, programId: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none">
                    <option value="">Vyberte program…</option>
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.age})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Poznámka (alergie, zkušenosti…)</label>
                  <textarea value={childForm.note} onChange={(e) => setChildForm((p) => ({ ...p, note: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none resize-none" placeholder="Volitelná poznámka…" />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-950 transition-colors">Přidat</button>
                  <button type="button" onClick={() => setShowAddChild(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 border border-stone-300 hover:bg-stone-100 transition-colors">Zrušit</button>
                </div>
              </form>
            )}

            {children.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-6">Zatím nemáte přidané žádné dítě.</p>
            ) : (
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id}>
                    <button
                      onClick={() => toggleChild(child.id)}
                      className="w-full flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-left"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-900 font-bold text-lg">{child.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-stone-900">{child.name}</h3>
                        <p className="text-sm text-stone-600">{child.age} let &bull; {child.programName}</p>
                        <p className="text-xs text-stone-500">Členem od {child.since}</p>
                      </div>
                      {expandedChild === child.id ? (
                        <ChevronDown className="w-5 h-5 text-blue-900 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedChild === child.id && (
                      <div className="mt-2 ml-4 p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-3">
                        {editingChild === child.id ? (
                          /* ── Inline Edit Form ── */
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-stone-700 mb-1">Jméno</label>
                                <input type="text" value={editForm.name} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-stone-700 mb-1">Věk</label>
                                <input type="number" min={4} max={18} value={editForm.age} onChange={(e) => setEditForm((p) => ({ ...p, age: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-stone-700 mb-1">Program</label>
                              <select value={editForm.programId} onChange={(e) => setEditForm((p) => ({ ...p, programId: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none">
                                {programs.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.age})</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-stone-700 mb-1">Poznámka</label>
                              <textarea value={editForm.note} onChange={(e) => setEditForm((p) => ({ ...p, note: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none resize-none" />
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleSaveEdit(child.id)} className="bg-blue-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-950 transition-colors flex items-center gap-1"><Save className="w-3 h-3" />Uložit</button>
                              <button onClick={() => setEditingChild(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 border border-stone-300 hover:bg-stone-100 transition-colors">Zrušit</button>
                            </div>
                          </div>
                        ) : (
                          /* ── Read-only detail ── */
                          <>
                            <div>
                              <p className="text-xs font-medium text-blue-900 uppercase tracking-wider mb-1">Poznámka</p>
                              <p className="text-sm text-stone-700">{child.note || "—"}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Link
                                href={`/programy?program=${child.programId}`}
                                className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                              >
                                Zobrazit program: {child.programName}
                              </Link>
                              <button
                                onClick={() => startEdit(child)}
                                className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1"
                              >
                                <Pencil className="w-3 h-3" />Upravit
                              </button>
                              <button
                                onClick={() => handleDeleteChild(child.id, child.name)}
                                className="text-xs bg-white text-red-600 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />Odebrat
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registrované programy — derived from children */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Registrované programy</h2>
              <Link href="/programy" className="text-sm text-blue-900 hover:text-blue-950 font-medium flex items-center gap-1">
                Všechny programy<ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {registeredPrograms.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-6">Přidejte dítě pro zobrazení programů.</p>
            ) : (
              <div className="space-y-4">
                {registeredPrograms.map((rp, i) => (
                  <Link key={i} href={`/programy?program=${rp.programId}`} className="block p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-stone-900">{rp.programName}</h3>
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">Aktivní</span>
                    </div>
                    <p className="text-sm text-stone-600 mb-1">Dítě: {rp.childName}</p>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      {rp.schedule && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rp.schedule}</span>}
                      {rp.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{rp.location}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nadcházející akce — from real events data */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-900">Nadcházející akce</h2>
            <Link href="/kalendar" className="text-sm text-blue-900 hover:text-blue-950 font-medium flex items-center gap-1">
              Celý kalendář<ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-stone-500 text-sm text-center py-6">Momentálně nejsou naplánovány žádné akce.</p>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id}>
                  <button
                    onClick={() => toggleEvent(event.id)}
                    className="w-full flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-left"
                  >
                    {event.poster ? (
                      <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200">
                        <Calendar className="w-5 h-5 text-blue-900" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-900">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-stone-600">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-900" />{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })} v {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-900" />{event.location}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{event.type === "regular" ? "Pravidelné setkání" : event.type === "expedition" ? "Výprava" : "Speciální akce"}</p>
                    </div>
                    {expandedEvent === event.id ? (
                      <ChevronDown className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" />
                    )}
                  </button>
                  {expandedEvent === event.id && (
                    <div className="mt-2 ml-4 p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-3">
                      <p className="text-sm text-stone-700">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-stone-600">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Trvání: {event.duration}</span>
                        {event.spotsLeft !== undefined && <span className="flex items-center gap-1"><Users className="w-3 h-3" />Volná místa: {event.spotsLeft}</span>}
                      </div>
                      {event.attendees && event.attendees.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-blue-900 uppercase tracking-wider mb-2">Přihlášení ({event.attendees.length})</p>
                          <div className="flex flex-wrap gap-2">
                            {event.attendees.map((a, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-blue-200">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-[9px] font-bold text-blue-900">{a.avatar}</span>
                                </div>
                                <span className="text-xs text-stone-700">{a.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Link
                          href="/kontakt"
                          className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          Kontaktovat vedoucí
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => { setShowAddChild(true); setChildForm(emptyChildForm); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:scale-105">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-100">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Přidat dítě</h3>
            <p className="text-sm text-stone-600">Zaregistrovat další dítě do kmene</p>
          </button>
          <Link href="/kontakt" className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:scale-105 block">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-amber-100">
              <Mail className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Kontaktovat vedoucí</h3>
            <p className="text-sm text-stone-600">Napsat nebo zavolat vedoucím kmene</p>
          </Link>
          <button
            onClick={() => setShowSettings(true)}
            className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-stone-100">
              <Settings className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Nastavení profilu</h3>
            <p className="text-sm text-stone-600">Upravit kontaktní údaje a preference</p>
          </button>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">Nastavení profilu</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Jméno</label>
                  <input type="text" value={settingsForm.name} onChange={(e) => setSettingsForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Email</label>
                  <input type="email" value={settingsForm.email} onChange={(e) => setSettingsForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Telefon</label>
                  <input type="tel" value={settingsForm.phone} onChange={(e) => setSettingsForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors" />
                </div>
                {settingsSaved && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">Změny uloženy!</span>
                  </div>
                )}
                <button onClick={handleSaveSettings} className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium">Uložit změny</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Teen Profile (demo — could be localStorage-backed in future) ── */
const teenProfile = {
  tribe: "Velký kmen",
  programId: "prog-2",
  since: "Září 2023",
  rank: "Stopař",
  points: 245,
  badges: [
    { name: "Ohňař", icon: "🔥", description: "Rozdělal oheň bez zápalek" },
    { name: "Navigátor", icon: "🧭", description: "Vedl skupinu podle mapy" },
    { name: "Zálesák", icon: "🌲", description: "Přenocoval 5× v přírodě" },
    { name: "Kuchař", icon: "🍳", description: "Uvařil jídlo pro celý kmen" },
    { name: "Uzlař", icon: "🪢", description: "Zvládl 10 základních uzlů" },
  ],
};

/* ── Teen Dashboard ── */
function TeenDashboard({ user, onLogout }: { user: TrilobitUser; onLogout: () => void }) {
  const { events: allEvents, isLoaded: eventsLoaded } = useEvents();
  const { friends, isLoaded: friendsLoaded, addFriend, removeFriend } = useFriends(user.email);
  const { isLoaded: attendanceLoaded, toggleAttendance, isAttending } = useAttendance(user.email);

  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");
  const [feedback, setFeedback] = useState("");

  const showFeedback = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(""), 2500); };

  // Load registered users for the friend picker
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("trilobit_registered_users");
    if (raw) {
      try { setRegisteredUsers(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  // Available users = registered users minus self and already-added friends
  const friendNames = new Set(friends.map((f) => f.name));
  const availableUsers = registeredUsers.filter(
    (u) => u.email !== user.email && !friendNames.has(u.name)
  );
  const filteredUsers = friendSearch
    ? availableUsers.filter((u) => u.name.toLowerCase().includes(friendSearch.toLowerCase()))
    : availableUsers;

  // Upcoming events from real data
  const upcomingEvents = allEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  const goingCount = upcomingEvents.filter((e) => isAttending(e.id)).length;
  const firstName = user.name.split(" ")[0];
  const avatar = user.name.charAt(0).toUpperCase();

  const handleToggle = (eventId: string) => {
    const nowGoing = toggleAttendance(eventId);
    showFeedback(nowGoing ? "Přihlášen/a na akci!" : "Odhlášen/a z akce");
  };

  const handlePickFriend = (pickedUser: RegisteredUser) => {
    addFriend({
      name: pickedUser.name,
      avatar: pickedUser.name.charAt(0).toUpperCase(),
      tribe: pickedUser.role === "teen" ? "Velký kmen" : "Malý kmen",
    });
    setFriendSearch("");
    setShowAddFriend(false);
    showFeedback(`${pickedUser.name} přidán/a!`);
  };

  if (!eventsLoaded || !friendsLoaded || !attendanceLoaded) {
    return (
      <section className="py-12 bg-stone-50 min-h-[80vh] flex items-center justify-center">
        <div className="text-stone-400 text-lg">Načítání…</div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-stone-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback toast */}
        {feedback && (
          <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
            <Check className="w-5 h-5" />{feedback}
          </div>
        )}

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-2xl">{avatar}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Ahoj, {firstName}!</h1>
              <p className="text-lg text-stone-600">{teenProfile.tribe} · {teenProfile.rank}</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <LogOut className="w-5 h-5" /><span className="font-medium">Odhlásit se</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Flame className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{teenProfile.points}</p>
            <p className="text-sm text-stone-500">Bodů</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{teenProfile.badges.length}</p>
            <p className="text-sm text-stone-500">Odznaky</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Calendar className="w-6 h-6 text-blue-900 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{goingCount}</p>
            <p className="text-sm text-stone-500">Jdu na akce</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Users className="w-6 h-6 text-blue-900 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{friends.length}</p>
            <p className="text-sm text-stone-500">Kamarádi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Upcoming events — takes 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            {/* Events — from real data */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">Nadcházející akce</h2>
                <Link href="/kalendar" className="text-sm text-blue-900 hover:text-blue-950 font-medium flex items-center gap-1">
                  Celý kalendář<ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {upcomingEvents.length === 0 ? (
                <p className="text-stone-500 text-sm text-center py-6">Momentálně nejsou žádné nadcházející akce.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const going = isAttending(event.id);
                    // Show which friends are attending this event (from attendees list)
                    const friendNames = friends.map((f) => f.name);
                    const friendsOnEvent = event.attendees?.filter((a) => friendNames.includes(a.name)).map((a) => a.name) ?? [];

                    return (
                      <div key={event.id} className={`p-4 rounded-xl border ${going ? "bg-blue-50 border-blue-200" : "bg-stone-50 border-stone-200"}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-stone-900">{event.title}</h3>
                            <span className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              event.type === "expedition" ? "bg-blue-100 text-blue-800" : event.type === "special" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {event.type === "expedition" ? "Výprava" : event.type === "special" ? "Speciální" : "Setkání"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggle(event.id)}
                            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                              going
                                ? "text-green-700 bg-green-50 border-green-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                                : "text-stone-500 bg-stone-100 border-stone-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                            }`}
                          >
                            {going ? "Jdu ✓" : "Přihlásit se"}
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600 mb-2">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-900" />{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })} v {event.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-900" />{event.location}</span>
                          {event.spotsLeft !== undefined && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-stone-400" />{event.spotsLeft} volných míst</span>}
                        </div>
                        <p className="text-xs text-stone-500 mb-2">{event.description}</p>
                        {friendsOnEvent.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-blue-900 font-medium">Jdou taky:</span>
                            <div className="flex flex-wrap gap-1">
                              {friendsOnEvent.map((f, i) => (
                                <span key={i} className="text-xs bg-white px-2 py-0.5 rounded-full border border-blue-200 text-blue-800">{f}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-900">Moje odznaky</h2>
                <div className="flex items-center gap-1 text-sm text-stone-500">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{teenProfile.badges.length} získaných</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {teenProfile.badges.map((badge, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBadge(selectedBadge === i ? null : i)}
                    className={`rounded-xl p-4 border text-center transition-all ${
                      selectedBadge === i
                        ? "bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-105"
                        : "bg-amber-50 border-amber-200 hover:scale-105 hover:shadow-md"
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-stone-900 text-sm mb-1">{badge.name}</h3>
                    <p className="text-xs text-stone-600">{badge.description}</p>
                  </button>
                ))}
                {/* Locked badge placeholder */}
                <div className="bg-stone-100 rounded-xl p-4 border border-stone-200 text-center opacity-50 cursor-not-allowed">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-semibold text-stone-400 text-sm mb-1">???</h3>
                  <p className="text-xs text-stone-400">Další odznak tě čeká!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — friends + profile */}
          <div className="space-y-8">
            {/* Profile card */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <h2 className="text-lg font-bold text-stone-900 mb-4">Můj profil</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-500">Kmen</span>
                  <span className="text-sm font-medium text-stone-900">{teenProfile.tribe}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-500">Hodnost</span>
                  <span className="text-sm font-medium text-stone-900">{teenProfile.rank}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-500">Body</span>
                  <span className="text-sm font-medium text-stone-900">{teenProfile.points}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-stone-500">Členem od</span>
                  <span className="text-sm font-medium text-stone-900">{teenProfile.since}</span>
                </div>
              </div>
            </div>

            {/* Friends — dynamic with add/remove */}
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-stone-900">Kamarádi v kmeni</h2>
                <button
                  onClick={() => setShowAddFriend(!showAddFriend)}
                  className="text-xs text-blue-900 hover:text-blue-950 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />Přidat
                </button>
              </div>

              {/* Add friend — pick from real users */}
              {showAddFriend && (
                <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-stone-700">Vyber člena</label>
                    <button onClick={() => { setShowAddFriend(false); setFriendSearch(""); }} className="text-stone-400 hover:text-stone-600"><X className="w-3.5 h-3.5" /></button>
                  </div>
                  <input
                    type="text"
                    value={friendSearch}
                    onChange={(e) => setFriendSearch(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none"
                    placeholder="Hledat podle jména…"
                    autoFocus
                  />
                  {availableUsers.length === 0 ? (
                    <p className="text-xs text-stone-500 py-2 text-center">Žádní další členové k přidání.</p>
                  ) : filteredUsers.length === 0 ? (
                    <p className="text-xs text-stone-500 py-2 text-center">Nikdo neodpovídá hledání.</p>
                  ) : (
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {filteredUsers.map((u) => (
                        <button
                          key={u.email}
                          onClick={() => handlePickFriend(u)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-blue-100 transition-colors text-left"
                        >
                          <div className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue-900">{u.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-stone-900 truncate">{u.name}</p>
                            <p className="text-xs text-stone-500">{u.role === "teen" ? "Člen" : u.role === "parent" ? "Rodič" : "Vedoucí"}</p>
                          </div>
                          <Plus className="w-3.5 h-3.5 text-blue-900 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {friends.length === 0 ? (
                <p className="text-stone-500 text-sm text-center py-4">Zatím nemáš žádné kamarády.</p>
              ) : (
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors group">
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-900">{friend.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900">{friend.name}</p>
                        <p className="text-xs text-stone-500">{friend.tribe}</p>
                      </div>
                      <button
                        onClick={() => { removeFriend(friend.id); showFeedback(`${friend.name} odebrán/a`); }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Odebrat kamaráda"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links — deep-linked */}
            <div className="space-y-3">
              <Link href={`/programy?program=${teenProfile.programId}`} className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:shadow-md transition-all">
                <TreePine className="w-5 h-5 text-blue-900" />
                <span className="text-sm font-medium text-stone-900">Můj program: {teenProfile.tribe}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 ml-auto" />
              </Link>
              <Link href="/kalendar" className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl hover:shadow-md transition-all">
                <Compass className="w-5 h-5 text-amber-700" />
                <span className="text-sm font-medium text-stone-900">Kalendář akcí</span>
                <ChevronRight className="w-4 h-4 text-stone-400 ml-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Leader Dashboard ── */
function LeaderDashboard({ user, onLogout }: { user: TrilobitUser; onLogout: () => void }) {
  const { events, isLoaded: eventsLoaded, addEvent, updateEvent, deleteEvent } = useEvents();
  const { programs, isLoaded: programsLoaded } = usePrograms();
  const { achievements, isLoaded: achievementsLoaded, addAchievement, removeAchievement, getForChild } = useAchievements();

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [allChildren, setAllChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Achievement form
  const [achForm, setAchForm] = useState({ childId: "", name: "", icon: "⭐", description: "" });
  const availableIcons = ["⭐", "🔥", "🧭", "🌲", "🍳", "🪢", "🏆", "🎯", "🛡️", "⚡", "🌊", "🏕️", "🔨", "📐", "🎨"];

  // Event form for quick add
  const [eventForm, setEventForm] = useState({ title: "", date: "", time: "", duration: "", location: "", description: "", type: "regular" as CalEvent["type"] });

  const showFeedback = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(""), 2500); };

  // Gather all children from all parents' localStorage keys
  useEffect(() => {
    const kids: Child[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("trilobit_children_")) {
        try {
          const parsed: Child[] = JSON.parse(localStorage.getItem(key) ?? "[]");
          const parentEmail = key.replace("trilobit_children_", "");
          parsed.forEach((c) => kids.push({ ...c, parentEmail }));
        } catch { /* skip */ }
      }
    }
    setAllChildren(kids);
  }, []);

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((e) => new Date(e.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({ title: eventForm.title, date: eventForm.date, time: eventForm.time, duration: eventForm.duration, location: eventForm.location, description: eventForm.description, type: eventForm.type });
    setEventForm({ title: "", date: "", time: "", duration: "", location: "", description: "", type: "regular" });
    showFeedback("Akce vytvořena!");
  };

  const handleAwardAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    const child = allChildren.find((c) => c.id === achForm.childId);
    if (!child) return;
    addAchievement({ childId: achForm.childId, childName: child.name, name: achForm.name, icon: achForm.icon, description: achForm.description, awardedBy: user.name, awardedAt: new Date().toISOString().split("T")[0] });
    setAchForm({ childId: "", name: "", icon: "⭐", description: "" });
    showFeedback(`Odznak udělen: ${child.name}!`);
  };

  if (!eventsLoaded || !programsLoaded || !achievementsLoaded) {
    return (
      <section className="py-12 bg-stone-50 min-h-[80vh] flex items-center justify-center">
        <div className="text-stone-400 text-lg">Načítání…</div>
      </section>
    );
  }

  const cards = [
    { key: "children", title: "Děti v kmeni", description: `${allChildren.length} registrovaných dětí`, icon: Users, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
    { key: "add-event", title: "Přidat akci", description: "Vytvořit novou akci", icon: Plus, color: "bg-green-50 border-green-200", iconColor: "text-green-600" },
    { key: "events", title: "Správa akcí", description: `${events.length} akcí celkem`, icon: Calendar, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
    { key: "achievements", title: "Udělit odznak", description: "Ocenit dítě za úspěch", icon: Award, color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600" },
    { key: "all-achievements", title: "Přehled odznaky", description: `${achievements.length} udělených`, icon: Trophy, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
    { key: "programs", title: "Programy", description: `${programs.length} aktivních`, icon: BookOpen, color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-600" },
  ];

  return (
    <section className="py-12 bg-stone-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback toast */}
        {feedback && (
          <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
            <Check className="w-5 h-5" />{feedback}
          </div>
        )}

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7 text-purple-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900">Vedoucí: {user.name}</h1>
              <p className="text-lg text-stone-600">Dashboard vedoucího kmene</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <LogOut className="w-5 h-5" /><span className="font-medium">Odhlásit se</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Users className="w-6 h-6 text-blue-900 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{allChildren.length}</p>
            <p className="text-sm text-stone-500">Dětí v kmeni</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Calendar className="w-6 h-6 text-blue-900 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{upcomingEvents.length}</p>
            <p className="text-sm text-stone-500">Nadcházející akce</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{achievements.length}</p>
            <p className="text-sm text-stone-500">Odznaky uděleny</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200 text-center">
            <BookOpen className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-stone-900">{programs.length}</p>
            <p className="text-sm text-stone-500">Programů</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <button
              key={card.key}
              onClick={() => setActivePanel(activePanel === card.key ? null : card.key)}
              className={`${card.color} border rounded-xl p-5 text-left hover:shadow-lg transition-all hover:scale-[1.02] ${activePanel === card.key ? "ring-2 ring-blue-900 scale-[1.02]" : ""}`}
            >
              <card.icon className={`w-7 h-7 ${card.iconColor} mb-3`} />
              <h3 className="font-semibold text-stone-900 mb-1">{card.title}</h3>
              <p className="text-xs text-stone-600">{card.description}</p>
            </button>
          ))}
        </div>

        {/* ─── Children Panel ─── */}
        {activePanel === "children" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Děti v kmeni ({allChildren.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            {allChildren.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-6">Žádné registrované děti.</p>
            ) : (
              <div className="space-y-3">
                {allChildren.map((child) => {
                  const childAch = getForChild(child.id);
                  const prog = programs.find((p) => p.id === child.programId);
                  const isSelected = selectedChildId === child.id;
                  return (
                    <div key={child.id}>
                      <button
                        onClick={() => setSelectedChildId(isSelected ? null : child.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${isSelected ? "bg-blue-50 border-blue-200" : "bg-stone-50 border-stone-200 hover:border-blue-300"}`}
                      >
                        <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-900 font-bold text-lg">{child.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-stone-900">{child.name}</h3>
                          <p className="text-sm text-stone-600">{child.age} let · {child.programName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {childAch.length > 0 && (
                            <div className="flex -space-x-1">
                              {childAch.slice(0, 3).map((a, i) => (
                                <span key={i} className="text-sm" title={a.name}>{a.icon}</span>
                              ))}
                              {childAch.length > 3 && <span className="text-xs text-stone-400 ml-1">+{childAch.length - 3}</span>}
                            </div>
                          )}
                          {isSelected ? <ChevronDown className="w-5 h-5 text-blue-900" /> : <ChevronRight className="w-5 h-5 text-stone-400" />}
                        </div>
                      </button>
                      {isSelected && (
                        <div className="mt-2 ml-4 p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-4">
                          {/* Child details */}
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div><span className="text-stone-500">Program:</span> <Link href={`/programy?program=${child.programId}`} className="text-blue-900 hover:underline font-medium">{child.programName}</Link></div>
                            <div><span className="text-stone-500">Rozvrh:</span> <span className="text-stone-900">{prog?.detail.schedule ?? "—"}</span></div>
                            <div><span className="text-stone-500">Členem od:</span> <span className="text-stone-900">{child.since}</span></div>
                            <div><span className="text-stone-500">Rodič:</span> <span className="text-stone-900">{child.parentEmail ?? "—"}</span></div>
                          </div>
                          {child.note && (
                            <div className="p-3 bg-white rounded-lg border border-blue-200">
                              <p className="text-xs font-medium text-blue-900 uppercase tracking-wider mb-1">Poznámka</p>
                              <p className="text-sm text-stone-700">{child.note}</p>
                            </div>
                          )}
                          {/* Child achievements */}
                          <div>
                            <p className="text-xs font-medium text-blue-900 uppercase tracking-wider mb-2">Odznaky ({childAch.length})</p>
                            {childAch.length === 0 ? (
                              <p className="text-xs text-stone-500">Zatím žádné odznaky.</p>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {childAch.map((a) => (
                                  <div key={a.id} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-amber-200 group">
                                    <span>{a.icon}</span>
                                    <span className="text-xs font-medium text-stone-900">{a.name}</span>
                                    <button onClick={() => { removeAchievement(a.id); showFeedback("Odznak odebrán"); }} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 ml-1 transition-opacity"><X className="w-3 h-3" /></button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Quick award */}
                          <button
                            onClick={() => { setAchForm({ childId: child.id, name: "", icon: "⭐", description: "" }); setActivePanel("achievements"); }}
                            className="text-xs bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full border border-purple-200 hover:bg-purple-200 transition-colors flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" />Udělit odznak
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── Add Event Panel ─── */}
        {activePanel === "add-event" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Nová akce</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Název *</label>
                  <input type="text" required value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="Název akce" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Typ *</label>
                  <select required value={eventForm.type} onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value as CalEvent["type"] }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none">
                    <option value="regular">Pravidelné setkání</option>
                    <option value="expedition">Výprava</option>
                    <option value="special">Speciální akce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Datum *</label>
                  <input type="date" required value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Čas *</label>
                  <input type="time" required value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Trvání *</label>
                  <input type="text" required value={eventForm.duration} onChange={(e) => setEventForm((p) => ({ ...p, duration: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="např. 3 hodiny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Místo *</label>
                  <input type="text" required value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="Choltice" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Popis</label>
                <textarea value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none resize-none" placeholder="Popis akce…" />
              </div>
              <button type="submit" className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-950 transition-colors">Vytvořit akci</button>
            </form>
          </div>
        )}

        {/* ─── Events Management Panel ─── */}
        {activePanel === "events" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Správa akcí ({events.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            {upcomingEvents.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-3">Nadcházející ({upcomingEvents.length})</h3>
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200">
                      <div className={`w-2 h-10 rounded-full ${event.type === "expedition" ? "bg-blue-500" : event.type === "special" ? "bg-amber-500" : "bg-emerald-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 text-sm">{event.title}</p>
                        <p className="text-xs text-stone-500">{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })} · {event.time} · {event.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.attendees && <span className="text-xs text-stone-500">{event.attendees.length} přihlášených</span>}
                        {confirmDelete === event.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => { deleteEvent(event.id); setConfirmDelete(null); showFeedback("Akce smazána"); }} className="text-xs bg-red-600 text-white px-2 py-1 rounded">Smazat</button>
                            <button onClick={() => setConfirmDelete(null)} className="text-xs bg-stone-200 text-stone-700 px-2 py-1 rounded">Ne</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDelete(event.id)} className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pastEvents.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-3">Poslední proběhlé ({pastEvents.length})</h3>
                <div className="space-y-2">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200 opacity-60">
                      <div className={`w-2 h-10 rounded-full bg-stone-300`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-900 text-sm">{event.title}</p>
                        <p className="text-xs text-stone-500">{new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })} · {event.location}</p>
                      </div>
                      {event.attendees && <span className="text-xs text-stone-500">{event.attendees.length} účastníků</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Award Achievement Panel ─── */}
        {activePanel === "achievements" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Udělit odznak</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <form onSubmit={handleAwardAchievement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Dítě *</label>
                <select required value={achForm.childId} onChange={(e) => setAchForm((p) => ({ ...p, childId: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none">
                  <option value="">Vyberte dítě…</option>
                  {allChildren.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.programName})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Název odznaku *</label>
                  <input type="text" required value={achForm.name} onChange={(e) => setAchForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="např. Ohňař, Navigátor…" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Ikona</label>
                  <div className="flex flex-wrap gap-2">
                    {availableIcons.map((icon) => (
                      <button key={icon} type="button" onClick={() => setAchForm((p) => ({ ...p, icon }))} className={`w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all ${achForm.icon === icon ? "bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-110" : "bg-stone-50 border-stone-200 hover:bg-stone-100"}`}>
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Popis *</label>
                <input type="text" required value={achForm.description} onChange={(e) => setAchForm((p) => ({ ...p, description: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none" placeholder="Za co dítě odznak získalo…" />
              </div>
              <button type="submit" className="bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-800 transition-colors flex items-center gap-2"><Award className="w-5 h-5" />Udělit odznak</button>
            </form>
          </div>
        )}

        {/* ─── All Achievements Panel ─── */}
        {activePanel === "all-achievements" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Všechny odznaky ({achievements.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            {achievements.length === 0 ? (
              <p className="text-stone-500 text-sm text-center py-6">Zatím nebyly uděleny žádné odznaky.</p>
            ) : (
              <div className="space-y-2">
                {achievements.sort((a, b) => b.awardedAt.localeCompare(a.awardedAt)).map((ach) => (
                  <div key={ach.id} className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200 group">
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 text-sm">{ach.name} — <span className="text-blue-900">{ach.childName}</span></p>
                      <p className="text-xs text-stone-500">{ach.description} · Udělil {ach.awardedBy} · {new Date(ach.awardedAt).toLocaleDateString("cs-CZ")}</p>
                    </div>
                    <button onClick={() => { removeAchievement(ach.id); showFeedback("Odznak odebrán"); }} className="opacity-0 group-hover:opacity-100 p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Programs Panel ─── */}
        {activePanel === "programs" && (
          <div className="mb-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Programy ({programs.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((prog) => {
                const kidsInProg = allChildren.filter((c) => c.programId === prog.id);
                return (
                  <Link key={prog.id} href={`/programy?program=${prog.id}`} className="p-5 bg-stone-50 rounded-xl border border-stone-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors block">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-stone-900 text-lg">{prog.name}</h3>
                      <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{prog.age}</span>
                    </div>
                    <p className="text-sm text-stone-600 mb-3">{prog.description}</p>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{kidsInProg.length} dětí</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{prog.detail.schedule}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{prog.location}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Admin Dashboard ── */
const emptyEventForm = { title: "", date: "", time: "", duration: "", location: "", description: "", type: "regular" as CalEvent["type"], spotsLeft: "" };
const emptyProgramForm = { name: "", age: "6–8 let", type: "Pravidelné", season: "Celý rok", description: "", location: "", frequency: "", duration: "", schedule: "", leader: "", maxKids: "", price: "" };

function AdminDashboard({ user, onLogout }: { user: TrilobitUser; onLogout: () => void }) {
  const { events, isLoaded: eventsLoaded, addEvent, updateEvent, deleteEvent } = useEvents();
  const { programs, isLoaded: programsLoaded, addProgram, updateProgram, deleteProgram } = usePrograms();
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState(emptyEventForm);
  const [programForm, setProgramForm] = useState(emptyProgramForm);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const showFeedback = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(""), 3000); };

  /* ── Members from localStorage ── */
  const [members, setMembers] = useState<RegisteredUser[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("trilobit_registered_users");
    if (raw) try { setMembers(JSON.parse(raw)); } catch { /* ignore */ }
  }, [activePanel]);

  /* ── Derived stats ── */
  const futureEvents = events.filter((e) => new Date(e.date) >= new Date());

  const adminCards = [
    { key: "add-event", title: "Přidat akci", description: "Vytvořit novou akci v kalendáři", icon: Plus, color: "bg-green-50 border-green-200", iconColor: "text-green-600" },
    { key: "manage-events", title: "Upravit události", description: "Spravovat nadcházející akce", icon: Calendar, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600" },
    { key: "add-program", title: "Přidat program", description: "Vytvořit nový pravidelný program", icon: Plus, color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600" },
    { key: "manage-programs", title: "Upravit programy", description: "Spravovat existující programy", icon: FileText, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-600" },
    { key: "signups", title: "Přihlášky dětí", description: "Zobrazit a spravovat přihlášky", icon: Users, color: "bg-indigo-50 border-indigo-200", iconColor: "text-indigo-600" },
    { key: "members", title: "Členové", description: "Přehled registrovaných uživatelů", icon: Users, color: "bg-pink-50 border-pink-200", iconColor: "text-pink-600" },
    { key: "stats", title: "Statistiky", description: "Zobrazit návštěvnost a reporty", icon: BarChart, color: "bg-teal-50 border-teal-200", iconColor: "text-teal-600" },
    { key: "settings", title: "Nastavení", description: "Konfigurace webu a kontaktů", icon: Settings, color: "bg-stone-50 border-stone-200", iconColor: "text-stone-600" },
  ];

  const mockSignups = [
    { id: 1, parent: "Jana Nováková", child: "Tomáš Novák", age: 8, program: "Malý kmen", date: "12. března 2026", status: "new" as const },
    { id: 2, parent: "Petra Dvořáková", child: "Matěj Dvořák", age: 10, program: "Velký kmen", date: "10. března 2026", status: "new" as const },
    { id: 3, parent: "Martin Svoboda", child: "Eliška Svobodová", age: 7, program: "Malý kmen", date: "8. března 2026", status: "new" as const },
  ];

  /* ── Event CRUD handlers ── */
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      title: eventForm.title, date: eventForm.date, time: eventForm.time, duration: eventForm.duration,
      location: eventForm.location, description: eventForm.description, type: eventForm.type,
      spotsLeft: eventForm.spotsLeft ? Number(eventForm.spotsLeft) : undefined,
    });
    setEventForm(emptyEventForm);
    showFeedback("Akce úspěšně vytvořena!");
  };

  const startEditEvent = (ev: CalEvent) => {
    setEditingEventId(ev.id);
    setEventForm({ title: ev.title, date: ev.date, time: ev.time, duration: ev.duration, location: ev.location, description: ev.description, type: ev.type, spotsLeft: ev.spotsLeft?.toString() ?? "" });
    setActivePanel("manage-events");
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEventId) return;
    updateEvent(editingEventId, {
      title: eventForm.title, date: eventForm.date, time: eventForm.time, duration: eventForm.duration,
      location: eventForm.location, description: eventForm.description, type: eventForm.type,
      spotsLeft: eventForm.spotsLeft ? Number(eventForm.spotsLeft) : undefined,
    });
    setEditingEventId(null);
    setEventForm(emptyEventForm);
    showFeedback("Akce úspěšně upravena!");
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    setConfirmDelete(null);
    showFeedback("Akce smazána.");
  };

  /* ── Program CRUD handlers ── */
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    addProgram({
      name: programForm.name, age: programForm.age, type: programForm.type, season: programForm.season,
      description: programForm.description, location: programForm.location, frequency: programForm.frequency, duration: programForm.duration,
      whatKidsDo: [], forParents: [],
      detail: { schedule: programForm.schedule, leader: programForm.leader, maxKids: Number(programForm.maxKids) || 15, price: programForm.price, whatToBring: [], typicalDay: "", goals: [] },
    });
    setProgramForm(emptyProgramForm);
    showFeedback("Program úspěšně vytvořen!");
  };

  const startEditProgram = (prog: Program) => {
    setEditingProgramId(prog.id);
    setProgramForm({ name: prog.name, age: prog.age, type: prog.type, season: prog.season, description: prog.description, location: prog.location, frequency: prog.frequency, duration: prog.duration, schedule: prog.detail.schedule, leader: prog.detail.leader, maxKids: prog.detail.maxKids.toString(), price: prog.detail.price });
    setActivePanel("manage-programs");
  };

  const handleUpdateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgramId) return;
    updateProgram(editingProgramId, {
      name: programForm.name, age: programForm.age, type: programForm.type, season: programForm.season,
      description: programForm.description, location: programForm.location, frequency: programForm.frequency, duration: programForm.duration,
      detail: { schedule: programForm.schedule, leader: programForm.leader, maxKids: Number(programForm.maxKids) || 15, price: programForm.price, whatToBring: [], typicalDay: "", goals: [] },
    });
    setEditingProgramId(null);
    setProgramForm(emptyProgramForm);
    showFeedback("Program úspěšně upraven!");
  };

  const handleDeleteProgram = (id: string) => {
    deleteProgram(id);
    setConfirmDelete(null);
    showFeedback("Program smazán.");
  };

  const inputCls = "w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors text-sm";

  if (!eventsLoaded || !programsLoaded) return <div className="py-32 text-center text-stone-400">Načítání dat…</div>;

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

        {/* Feedback toast */}
        {feedback && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800 font-medium">{feedback}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Nadcházející akce</h3><Calendar className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{futureEvents.length}</p><p className="text-sm text-stone-500 mt-1">Plánováno v kalendáři</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Aktivní programy</h3><FileText className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{programs.length}</p><p className="text-sm text-stone-500 mt-1">{programs.map((p) => p.name).join(", ")}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-stone-600">Registrovaní členové</h3><Users className="w-5 h-5 text-blue-900" /></div>
            <p className="text-3xl font-bold text-stone-900">{members.length}</p><p className="text-sm text-stone-500 mt-1">Včetně rodičů a uživatelů</p>
          </div>
        </div>

        {/* Admin Cards — all buttons now */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card) => (
            <button
              key={card.key}
              onClick={() => {
                if (activePanel === card.key) { setActivePanel(null); } else {
                  setActivePanel(card.key);
                  setEditingEventId(null); setEditingProgramId(null);
                  setEventForm(emptyEventForm); setProgramForm(emptyProgramForm);
                }
              }}
              className={`${card.color} rounded-xl p-6 border text-left hover:shadow-lg transition-all hover:scale-105 ${activePanel === card.key ? "ring-2 ring-blue-400 scale-105" : ""}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{card.title}</h3>
              <p className="text-sm text-stone-600">{card.description}</p>
            </button>
          ))}
        </div>

        {/* ────────── PANELS ────────── */}

        {/* Add Event Panel */}
        {activePanel === "add-event" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Přidat novou akci</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-900 mb-1">Název akce *</label>
                <input required value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} className={inputCls} placeholder="Jarní výprava do Poodří" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Datum *</label>
                <input type="date" required value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Čas *</label>
                <input type="time" required value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Doba trvání</label>
                <input value={eventForm.duration} onChange={(e) => setEventForm((p) => ({ ...p, duration: e.target.value }))} className={inputCls} placeholder="3 hodiny" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Místo</label>
                <input value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="Choltice" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Typ</label>
                <select value={eventForm.type} onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value as CalEvent["type"] }))} className={inputCls}>
                  <option value="regular">Pravidelné setkání</option>
                  <option value="expedition">Výprava</option>
                  <option value="special">Speciální akce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Volná místa</label>
                <input type="number" min="0" value={eventForm.spotsLeft} onChange={(e) => setEventForm((p) => ({ ...p, spotsLeft: e.target.value }))} className={inputCls} placeholder="Neomezeno" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-900 mb-1">Popis</label>
                <textarea value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} h-24 resize-none`} placeholder="Stručný popis akce pro rodiče…" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />Vytvořit akci
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Events Panel */}
        {activePanel === "manage-events" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Správa událostí ({events.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>

            {/* Inline edit form */}
            {editingEventId && (
              <form onSubmit={handleUpdateEvent} className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-sm font-medium text-blue-900 mb-3">Úprava akce</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input required value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} className={inputCls} placeholder="Název" />
                  <input type="date" required value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} className={inputCls} />
                  <input type="time" required value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} className={inputCls} />
                  <input value={eventForm.duration} onChange={(e) => setEventForm((p) => ({ ...p, duration: e.target.value }))} className={inputCls} placeholder="Doba trvání" />
                  <input value={eventForm.location} onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="Místo" />
                  <select value={eventForm.type} onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value as CalEvent["type"] }))} className={inputCls}>
                    <option value="regular">Setkání</option><option value="expedition">Výprava</option><option value="special">Speciální</option>
                  </select>
                  <textarea value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} h-20 resize-none md:col-span-2`} placeholder="Popis" />
                </div>
                <div className="flex gap-2 mt-3">
                  <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition-colors text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />Uložit
                  </button>
                  <button type="button" onClick={() => { setEditingEventId(null); setEventForm(emptyEventForm); }} className="px-6 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors text-sm">
                    Zrušit
                  </button>
                </div>
              </form>
            )}

            {/* Event list */}
            <div className="space-y-3">
              {[...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((ev) => {
                const isPast = new Date(ev.date) < new Date();
                return (
                  <div key={ev.id} className={`flex items-center gap-4 p-4 rounded-xl border ${isPast ? "bg-stone-50 border-stone-200 opacity-70" : "bg-white border-stone-200"}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ev.type === "expedition" ? "bg-blue-100 text-blue-900" : ev.type === "special" ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`}>
                          {ev.type === "expedition" ? "Výprava" : ev.type === "special" ? "Speciální" : "Setkání"}
                        </span>
                        {isPast && <span className="text-xs text-stone-400">Proběhlo</span>}
                      </div>
                      <h3 className="font-semibold text-stone-900 truncate">{ev.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(ev.date).toLocaleDateString("cs-CZ")}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ev.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => startEditEvent(ev)} className="p-2 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors" title="Upravit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {confirmDelete === ev.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleDeleteEvent(ev.id)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium">Ano</button>
                          <button onClick={() => setConfirmDelete(null)} className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors text-xs">Ne</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(ev.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Smazat">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Program Panel */}
        {activePanel === "add-program" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Přidat nový program</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-900 mb-1">Název programu *</label>
                <input required value={programForm.name} onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Velký kmen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Věková skupina</label>
                <select value={programForm.age} onChange={(e) => setProgramForm((p) => ({ ...p, age: e.target.value }))} className={inputCls}>
                  <option>6–8 let</option><option>9–12 let</option><option>6–12 let</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Typ</label>
                <select value={programForm.type} onChange={(e) => setProgramForm((p) => ({ ...p, type: e.target.value }))} className={inputCls}>
                  <option>Pravidelné</option><option>Výpravy</option><option>Speciální akce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Sezóna</label>
                <select value={programForm.season} onChange={(e) => setProgramForm((p) => ({ ...p, season: e.target.value }))} className={inputCls}>
                  <option>Celý rok</option><option>Jaro/Léto/Podzim</option><option>Léto</option><option>Zima</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Místo</label>
                <input value={programForm.location} onChange={(e) => setProgramForm((p) => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="Choltice" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Frekvence</label>
                <input value={programForm.frequency} onChange={(e) => setProgramForm((p) => ({ ...p, frequency: e.target.value }))} className={inputCls} placeholder="Každý týden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Doba trvání</label>
                <input value={programForm.duration} onChange={(e) => setProgramForm((p) => ({ ...p, duration: e.target.value }))} className={inputCls} placeholder="2 hodiny" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Rozvrh</label>
                <input value={programForm.schedule} onChange={(e) => setProgramForm((p) => ({ ...p, schedule: e.target.value }))} className={inputCls} placeholder="Každou středu 15:00–17:00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Vedoucí</label>
                <input value={programForm.leader} onChange={(e) => setProgramForm((p) => ({ ...p, leader: e.target.value }))} className={inputCls} placeholder="Vedoucí: Marek Procházka" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Max. dětí</label>
                <input type="number" min="1" value={programForm.maxKids} onChange={(e) => setProgramForm((p) => ({ ...p, maxKids: e.target.value }))} className={inputCls} placeholder="15" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-1">Cena</label>
                <input value={programForm.price} onChange={(e) => setProgramForm((p) => ({ ...p, price: e.target.value }))} className={inputCls} placeholder="300 Kč / měsíc" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-900 mb-1">Popis</label>
                <textarea value={programForm.description} onChange={(e) => setProgramForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} h-24 resize-none`} placeholder="Co dítě v programu zažije…" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />Vytvořit program
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Programs Panel */}
        {activePanel === "manage-programs" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Správa programů ({programs.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>

            {/* Inline edit form */}
            {editingProgramId && (
              <form onSubmit={handleUpdateProgram} className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h3 className="text-sm font-medium text-purple-900 mb-3">Úprava programu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input required value={programForm.name} onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Název" />
                  <select value={programForm.age} onChange={(e) => setProgramForm((p) => ({ ...p, age: e.target.value }))} className={inputCls}>
                    <option>6–8 let</option><option>9–12 let</option><option>6–12 let</option>
                  </select>
                  <input value={programForm.location} onChange={(e) => setProgramForm((p) => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="Místo" />
                  <input value={programForm.frequency} onChange={(e) => setProgramForm((p) => ({ ...p, frequency: e.target.value }))} className={inputCls} placeholder="Frekvence" />
                  <input value={programForm.schedule} onChange={(e) => setProgramForm((p) => ({ ...p, schedule: e.target.value }))} className={inputCls} placeholder="Rozvrh" />
                  <input value={programForm.price} onChange={(e) => setProgramForm((p) => ({ ...p, price: e.target.value }))} className={inputCls} placeholder="Cena" />
                  <textarea value={programForm.description} onChange={(e) => setProgramForm((p) => ({ ...p, description: e.target.value }))} className={`${inputCls} h-20 resize-none md:col-span-2`} placeholder="Popis" />
                </div>
                <div className="flex gap-2 mt-3">
                  <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition-colors text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />Uložit
                  </button>
                  <button type="button" onClick={() => { setEditingProgramId(null); setProgramForm(emptyProgramForm); }} className="px-6 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors text-sm">
                    Zrušit
                  </button>
                </div>
              </form>
            )}

            {/* Program list */}
            <div className="space-y-3">
              {programs.map((prog) => (
                <div key={prog.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-900">{prog.type}</span>
                      <span className="text-xs text-stone-500">{prog.age}</span>
                    </div>
                    <h3 className="font-semibold text-stone-900">{prog.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{prog.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{prog.frequency}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />Max. {prog.detail.maxKids}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEditProgram(prog)} className="p-2 bg-purple-50 text-purple-900 rounded-lg hover:bg-purple-100 transition-colors" title="Upravit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {confirmDelete === prog.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => handleDeleteProgram(prog.id)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium">Ano</button>
                        <button onClick={() => setConfirmDelete(null)} className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors text-xs">Ne</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(prog.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Smazat">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signups Panel */}
        {activePanel === "signups" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Nové přihlášky</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <div className="space-y-4">
              {mockSignups.map((signup) => (
                <div key={signup.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900">{signup.child} ({signup.age} let)</p>
                    <p className="text-sm text-stone-600">Rodič: {signup.parent} &bull; Program: {signup.program}</p>
                    <p className="text-xs text-stone-500">Přihlášeno: {signup.date}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />Přijmout
                    </button>
                    <a href={`mailto:${signup.parent.toLowerCase().replace(" ", ".")}@email.cz`} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />Napsat
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Panel (replaces Galerie) — with role management */}
        {activePanel === "members" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Členové ({members.length})</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            {members.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500">Zatím nejsou žádní registrovaní uživatelé.</p>
                <p className="text-sm text-stone-400 mt-1">Uživatelé se zobrazí po registraci na přihlašovací stránce.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {members.map((member, i) => {
                  const roleLabel = member.role === "leader" ? "Vedoucí" : member.role === "parent" ? "Rodič" : "Uživatel";
                  const roleColors = member.role === "leader" ? "bg-purple-100 text-purple-800" : member.role === "parent" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${member.role === "leader" ? "bg-purple-100" : "bg-pink-100"}`}>
                        <span className={`text-sm font-bold ${member.role === "leader" ? "text-purple-700" : "text-pink-700"}`}>{member.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900">{member.name}</p>
                        <p className="text-sm text-stone-600">{member.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors}`}>
                        {member.role === "leader" && <Shield className="w-3 h-3 inline mr-1" />}{roleLabel}
                      </span>
                      {member.role !== "leader" ? (
                        <button
                          onClick={() => {
                            const raw = localStorage.getItem("trilobit_registered_users");
                            if (!raw) return;
                            const all: RegisteredUser[] = JSON.parse(raw);
                            const updated = all.map((u) => u.email === member.email ? { ...u, role: "leader" as const } : u);
                            localStorage.setItem("trilobit_registered_users", JSON.stringify(updated));
                            setMembers(updated);
                            showFeedback(`${member.name} je nyní vedoucí!`);
                          }}
                          className="text-xs text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1"
                        >
                          <Shield className="w-3 h-3" />Nastavit jako vedoucí
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const raw = localStorage.getItem("trilobit_registered_users");
                            if (!raw) return;
                            const all: RegisteredUser[] = JSON.parse(raw);
                            const updated = all.map((u) => u.email === member.email ? { ...u, role: "parent" as const } : u);
                            localStorage.setItem("trilobit_registered_users", JSON.stringify(updated));
                            setMembers(updated);
                            showFeedback(`${member.name} je opět rodič`);
                          }}
                          className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-200 transition-colors"
                        >
                          Odebrat vedoucí
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Stats Panel */}
        {activePanel === "stats" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Statistiky</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <p className="text-3xl font-bold text-blue-900">48</p><p className="text-sm text-stone-600 mt-1">Celkem dětí</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                <p className="text-3xl font-bold text-green-700">87%</p><p className="text-sm text-stone-600 mt-1">Průměrná účast</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <p className="text-3xl font-bold text-amber-700">{events.length}</p><p className="text-sm text-stone-600 mt-1">Akcí celkem</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center">
                <p className="text-3xl font-bold text-purple-700">{members.length}</p><p className="text-sm text-stone-600 mt-1">Registrovaných členů</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-stone-600 uppercase tracking-wider">Účast dle programu</h3>
              {[
                { name: "Malý kmen", attendance: 92, members: 18 },
                { name: "Velký kmen", attendance: 85, members: 15 },
                { name: "Výpravy", attendance: 78, members: 30 },
                { name: "Příměstské tábory", attendance: 95, members: 25 },
              ].map((prog) => (
                <div key={prog.name} className="flex items-center gap-4">
                  <span className="text-sm text-stone-700 w-40 flex-shrink-0">{prog.name}</span>
                  <div className="flex-1 bg-stone-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-900 h-full rounded-full transition-all" style={{ width: `${prog.attendance}%` }} />
                  </div>
                  <span className="text-sm font-medium text-stone-700 w-12 text-right">{prog.attendance}%</span>
                  <span className="text-xs text-stone-500 w-20 text-right">{prog.members} členů</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {activePanel === "settings" && (
          <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900">Nastavení</h2>
              <button onClick={() => setActivePanel(null)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-500" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-600 uppercase tracking-wider">Kontaktní údaje</h3>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Email kmene</label>
                  <input type="email" defaultValue="kmentrilobit@gmail.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Telefon</label>
                  <input type="tel" defaultValue="602 801 010" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Adresa</label>
                  <input type="text" defaultValue="Choltice a okolí" className={inputCls} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-600 uppercase tracking-wider">Web</h3>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Název kmene</label>
                  <input type="text" defaultValue="TRILOBIT" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-1">Popis (motto)</label>
                  <input type="text" defaultValue="Dobrodružství venku, přátelství na celý život" className={inputCls} />
                </div>
                <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition-colors font-medium">
                  Uložit nastavení
                </button>
              </div>
            </div>
          </div>
        )}

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
  const [user, setUser] = useState<TrilobitUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try new key first
    const stored = localStorage.getItem("trilobit_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("trilobit_user");
      }
    }
    // Backward compat: migrate old key
    if (!stored && localStorage.getItem("trilobit_admin") === "true") {
      const adminUser: TrilobitUser = { email: "admin@trilobit.cz", name: "Administrátor", role: "admin" };
      localStorage.setItem("trilobit_user", JSON.stringify(adminUser));
      localStorage.removeItem("trilobit_admin");
      setUser(adminUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("trilobit_user");
    localStorage.removeItem("trilobit_admin");
    setUser(null);
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
        {!user ? (
          <LoginForm onLogin={(u) => setUser(u)} />
        ) : user.role === "admin" ? (
          <AdminDashboard user={user} onLogout={handleLogout} />
        ) : user.role === "leader" ? (
          <LeaderDashboard user={user} onLogout={handleLogout} />
        ) : user.role === "teen" ? (
          <TeenDashboard user={user} onLogout={handleLogout} />
        ) : (
          <ParentDashboard user={user} onLogout={handleLogout} />
        )}
      </main>
      <Footer />
    </div>
  );
}
