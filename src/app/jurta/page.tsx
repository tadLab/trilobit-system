"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { QuickContact } from "@/components/QuickContact";
import Link from "next/link";
import {
  Home, Users, Utensils, Droplets, Tent, TreePine,
  MapPin, Phone, Mail, Send, X, ChevronLeft, ChevronRight,
  CheckCircle, Package, ExternalLink, Calendar,
} from "lucide-react";

/* ── Gallery Images ── */
const galleryImages = [
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop", alt: "Jurta zvenku" },
  { url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&h=800&fit=crop", alt: "Interiér jurty" },
  { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=800&fit=crop", alt: "Louka u jurty" },
  { url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&h=800&fit=crop", alt: "Kuchyně a vybavení" },
  { url: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=1200&h=800&fit=crop", alt: "Příroda v okolí" },
  { url: "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=1200&h=800&fit=crop", alt: "Skupinové aktivity na louce" },
];

/* ── Hero ── */
function JurtaHero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17L11 22" strokeLinecap="round" />
            </svg>
            <span className="text-blue-900 text-sm tracking-wider uppercase">Kmen Trilobit</span>
          </div>
          <h1 className="text-4xl lg:text-5xl text-stone-900 mb-6">Ubytování v jurtě</h1>
          <p className="text-xl text-stone-700 mb-10 leading-relaxed">
            Dvě propojené jurty na louce u Choltického koupaliště. Ideální zázemí pro dětské kolektivy, skauty, sportovní oddíly a další skupiny.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-600 mb-10">
            <div className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-900" /><span>Dvě propojené jurty</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-900" /><span>Kapacita ~15 osob</span></div>
            <div className="flex items-center gap-2"><TreePine className="w-4 h-4 text-blue-900" /><span>Velká louka</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#rezervace" className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center">
              Rezervovat termín
            </a>
            <a href="#o-jurte" className="bg-white text-stone-800 px-8 py-4 rounded-full border-2 border-stone-300 hover:border-blue-900 hover:text-blue-900 transition-colors text-lg text-center">
              Zjistit více
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Gallery with Lightbox ── */
function JurtaGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setSelectedImage((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setSelectedImage((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (selectedImage === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedImage, goNext, goPrev, closeLightbox]);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Jak to u nás vypadá</h2>
          <p className="text-xl text-stone-600">Prohlédněte si jurty a okolí</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="aspect-[4/3] rounded-xl overflow-hidden relative group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/30 rounded-full p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white/80 text-center mt-4 text-sm">
              {galleryImages[selectedImage].alt} — {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Info ── */
function JurtaInfo() {
  return (
    <section id="o-jurte" className="py-16 lg:py-24 bg-stone-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">O jurtě</h2>
          <p className="text-xl text-stone-700 leading-relaxed max-w-3xl mx-auto">
            V roce 2023 jsme na horní louce Choltického koupaliště postavili dvě vzájemně propojené jurty, které slouží jako naše klubovna. Rádi bychom tento krásný prostor nabídli k pronájmu pro dětské kolektivy a podobné skupiny.
          </p>
        </div>

        {/* Main yurt cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Malá jurta */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Utensils className="w-7 h-7 text-blue-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Malá jurta — kuchyně</h3>
                <p className="text-sm text-stone-500">Průměr 5 metrů</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Kuchyňka a malý sklad",
                "Vybavení na vaření — mísy, hrnce, vařečky",
                "Talíře a hrnky pro větší množství osob",
                "Propojená s velkou jurtou",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Velká jurta */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-blue-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Velká jurta — setkávání</h3>
                <p className="text-sm text-stone-500">Průměr 8 metrů</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Prostor k vzájemnému setkávání",
                "Spaní na zemi na vlastních karimatkách",
                "Kapacita při troše skromnosti ~15 lidí",
                "Celoročně obyvatelná",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Facilities cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-900" />
              <h4 className="text-lg font-semibold text-stone-900">Sociální zázemí</h4>
            </div>
            <p className="text-stone-700">Součástí stavby je sociální zázemí s toaletou, umyvadlem a sprchou.</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Tent className="w-6 h-6 text-blue-900" />
              <h4 className="text-lg font-semibold text-stone-900">Velká louka</h4>
            </div>
            <p className="text-stone-700">
              Louka přímo vybízí k hraní her. Dají se na ní postavit stany a jurtu používat jen jako zázemí. K dispozici jsou i tyče na stavbu třech týpí.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ── */
function JurtaPricing() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Cena a co je zahrnuto</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Price card */}
          <div className="bg-blue-900 text-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-wider mb-2">Pronájem za noc</p>
              <p className="text-5xl lg:text-6xl font-bold mb-2">1 000 Kč</p>
              <p className="text-blue-200 mb-6">za noc · oba prostory</p>
              <div className="h-px bg-blue-800 mb-6" />
              <p className="text-blue-100 text-sm mb-2">Kapacita: max. ~15 osob na spaní</p>
              <p className="text-blue-100 text-sm">Primárně pro dětské kolektivy a skupiny</p>
            </div>
            <a
              href="#rezervace"
              className="mt-8 bg-white text-blue-900 px-8 py-4 rounded-full hover:bg-blue-50 transition-colors text-lg font-medium text-center block"
            >
              Rezervovat termín
            </a>
          </div>

          {/* Included + bring */}
          <div className="space-y-6">
            <div className="bg-stone-50 rounded-2xl p-6 lg:p-8 border border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                V ceně zahrnuto
              </h3>
              <ul className="space-y-3">
                {[
                  "Pronájem obou propojených jurt",
                  "Vybavená kuchyně (nádobí, hrnce, příbory, talíře)",
                  "Sprcha, toaleta a umyvadlo",
                  "Přístup na velkou louku",
                  "3 tyče na stavbu týpí",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-700" />
                Co si přinést
              </h3>
              <ul className="space-y-2">
                {[
                  "Karimatky a spacáky",
                  "Jídlo a potraviny",
                  "Osobní věci a hygienické potřeby",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-700">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mock Booked Dates (would come from DB in production) ── */
const bookedRanges = [
  { from: new Date(2026, 2, 6), to: new Date(2026, 2, 8), group: "Skaut Pardubice" },
  { from: new Date(2026, 2, 14), to: new Date(2026, 2, 16), group: "HC Choltice" },
  { from: new Date(2026, 2, 21), to: new Date(2026, 2, 22), group: "Junák Přelouč" },
  { from: new Date(2026, 3, 3), to: new Date(2026, 3, 5), group: "ZŠ Choltice" },
  { from: new Date(2026, 3, 18), to: new Date(2026, 3, 20), group: "Hasiči Heřmanův Městec" },
  { from: new Date(2026, 4, 1), to: new Date(2026, 4, 4), group: "Tábor Trilobit" },
];

/* ── Calendar Helpers ── */
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDateInRange(date: Date, from: Date, to: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const f = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const t = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
  return d >= f && d <= t;
}

function isDateBooked(date: Date) {
  return bookedRanges.some((r) => isDateInRange(date, r.from, r.to));
}

function getBookedGroup(date: Date) {
  const range = bookedRanges.find((r) => isDateInRange(date, r.from, r.to));
  return range?.group;
}

function formatDateCz(date: Date) {
  return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
}

function toDateStr(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const CZ_MONTHS = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];
const CZ_DAYS_SHORT = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

/* ── Availability Calendar ── */
function AvailabilityCalendar({
  checkIn,
  checkOut,
  onSelect,
}: {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (checkIn: Date | null, checkOut: Date | null) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const goPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const goNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  // Monday = 0, Sunday = 6
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(new Date(viewYear, viewMonth, d));
  // pad end to fill last row
  while (days.length % 7 !== 0) days.push(null);

  const handleDayClick = (date: Date) => {
    if (date < today) return;
    if (isDateBooked(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Start fresh selection
      onSelect(date, null);
    } else {
      // We have checkIn but no checkOut
      if (date < checkIn) {
        // Clicked before checkIn → reset to this date
        onSelect(date, null);
      } else if (isSameDay(date, checkIn)) {
        // Clicked same day → deselect
        onSelect(null, null);
      } else {
        // Check if any booked date falls in the range
        const rangeHasBooking = bookedRanges.some((r) => {
          const rFrom = new Date(r.from.getFullYear(), r.from.getMonth(), r.from.getDate()).getTime();
          const rTo = new Date(r.to.getFullYear(), r.to.getMonth(), r.to.getDate()).getTime();
          const selFrom = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()).getTime();
          const selTo = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          return rFrom <= selTo && rTo >= selFrom;
        });
        if (rangeHasBooking) {
          // Can't select range that overlaps booking → reset to clicked date
          onSelect(date, null);
        } else {
          onSelect(checkIn, date);
        }
      }
    }
  };

  const getDayClasses = (date: Date) => {
    const isPast = date < today;
    const booked = isDateBooked(date);
    const isCheckIn = checkIn && isSameDay(date, checkIn);
    const isCheckOut = checkOut && isSameDay(date, checkOut);
    const isInSelectedRange = checkIn && checkOut && isDateInRange(date, checkIn, checkOut);
    const isInHoverRange = checkIn && !checkOut && hoverDate && hoverDate > checkIn && isDateInRange(date, checkIn, hoverDate) && !booked;

    if (isPast) return "text-stone-300 cursor-not-allowed";
    if (booked) return "bg-rose-100 text-rose-400 cursor-not-allowed line-through";
    if (isCheckIn || isCheckOut) return "bg-blue-900 text-white font-bold rounded-lg";
    if (isInSelectedRange) return "bg-blue-100 text-blue-900 font-medium";
    if (isInHoverRange) return "bg-blue-50 text-blue-800";
    return "text-stone-700 hover:bg-stone-100 cursor-pointer";
  };

  // Can't go before current month
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-stone-600 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-rose-100 border border-rose-200" />
          <span>Obsazeno</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-white border border-stone-200" />
          <span>Volné</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-blue-900" />
          <span>Váš výběr</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-blue-100 border border-blue-200" />
          <span>Vybraný rozsah</span>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-stone-700" />
        </button>
        <h4 className="text-lg font-semibold text-stone-900">
          {CZ_MONTHS[viewMonth]} {viewYear}
        </h4>
        <button type="button" onClick={goNextMonth} className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
          <ChevronRight className="w-5 h-5 text-stone-700" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {CZ_DAYS_SHORT.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-stone-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
          const booked = isDateBooked(date);
          const bookedGroup = booked ? getBookedGroup(date) : null;
          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleDayClick(date)}
              onMouseEnter={() => setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
              disabled={date < today || booked}
              title={booked ? `Obsazeno: ${bookedGroup}` : formatDateCz(date)}
              className={`aspect-square flex items-center justify-center text-sm rounded-md transition-colors ${getDayClasses(date)}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Selected range summary */}
      {checkIn && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
          <div className="flex items-center gap-2 text-blue-900">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              {checkOut
                ? `${formatDateCz(checkIn)} → ${formatDateCz(checkOut)}`
                : `Příjezd: ${formatDateCz(checkIn)} — klikněte na datum odjezdu`
              }
            </span>
          </div>
          {checkIn && checkOut && (
            <p className="text-blue-700 mt-1">
              {Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}{" "}
              {Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) === 1 ? "noc" :
               Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) < 5 ? "noci" : "nocí"}
              {" · "}
              {Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) * 1000} Kč
            </p>
          )}
          {checkIn && (
            <button
              type="button"
              onClick={() => onSelect(null, null)}
              className="text-blue-700 hover:text-blue-900 text-xs underline mt-1"
            >
              Zrušit výběr
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Reservation Form ── */
function JurtaReservation() {
  const [formData, setFormData] = useState({
    contactName: "", email: "", phone: "", groupName: "",
    numberOfPeople: "", checkIn: "", checkOut: "", message: "",
    gdprConsent: false,
  });
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleDateSelect = (newCheckIn: Date | null, newCheckOut: Date | null) => {
    setCheckInDate(newCheckIn);
    setCheckOutDate(newCheckOut);
    setFormData((prev) => ({
      ...prev,
      checkIn: newCheckIn ? toDateStr(newCheckIn) : "",
      checkOut: newCheckOut ? toDateStr(newCheckOut) : "",
    }));
  };

  if (isSubmitted) {
    return (
      <section id="rezervace" className="py-16 lg:py-24 bg-stone-50 scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 rounded-2xl p-8 lg:p-12 border border-green-200">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl text-stone-900 mb-4">Děkujeme za rezervaci!</h2>
            <p className="text-xl text-stone-700 mb-6">Ozveme se do 24 hodin s potvrzením dostupnosti a dalšími informacemi.</p>
            <p className="text-stone-600">Pokud chcete promluvit hned, zavolejte na <strong>602 801 010</strong></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rezervace" className="py-16 lg:py-24 bg-stone-50 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Rezervace jurty</h2>
          <p className="text-xl text-stone-600">Vyberte volný termín v kalendáři a vyplňte formulář</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Availability calendar */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-200 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-900" />
              Dostupnost
            </h3>
            <AvailabilityCalendar
              checkIn={checkInDate}
              checkOut={checkOutDate}
              onSelect={handleDateSelect}
            />
          </div>

          {/* Right: Form */}
          <form onSubmit={(e) => { e.preventDefault(); if (!formData.checkIn || !formData.checkOut) return; setIsSubmitted(true); }} className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-200 shadow-sm">
            <div className="space-y-5">
              {/* Selected dates display */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg border text-center ${formData.checkIn ? "border-blue-200 bg-blue-50" : "border-stone-200 bg-stone-50"}`}>
                  <p className="text-xs text-stone-500 mb-1">Příjezd</p>
                  <p className={`font-medium ${formData.checkIn ? "text-blue-900" : "text-stone-400"}`}>
                    {checkInDate ? formatDateCz(checkInDate) : "Vyberte v kalendáři"}
                  </p>
                </div>
                <div className={`p-3 rounded-lg border text-center ${formData.checkOut ? "border-blue-200 bg-blue-50" : "border-stone-200 bg-stone-50"}`}>
                  <p className="text-xs text-stone-500 mb-1">Odjezd</p>
                  <p className={`font-medium ${formData.checkOut ? "text-blue-900" : "text-stone-400"}`}>
                    {checkOutDate ? formatDateCz(checkOutDate) : "Vyberte v kalendáři"}
                  </p>
                </div>
              </div>

              {/* Hidden inputs for form validation */}
              <input type="hidden" name="checkIn" value={formData.checkIn} required />
              <input type="hidden" name="checkOut" value={formData.checkOut} required />

              {/* Contact name */}
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-stone-900 mb-2">Jméno kontaktní osoby *</label>
                <input type="text" id="contactName" name="contactName" required value={formData.contactName} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors"
                  placeholder="Vaše jméno" />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-2">Email *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors"
                    placeholder="email@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-900 mb-2">Telefon *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors"
                    placeholder="+420 123 456 789" />
                </div>
              </div>

              {/* Group name */}
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-stone-900 mb-2">Název skupiny / organizace</label>
                <input type="text" id="groupName" name="groupName" value={formData.groupName} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors"
                  placeholder="např. Skaut Pardubice" />
              </div>

              {/* Number of people */}
              <div>
                <label htmlFor="numberOfPeople" className="block text-sm font-medium text-stone-900 mb-2">Počet osob *</label>
                <input type="number" id="numberOfPeople" name="numberOfPeople" required min="1" max="20" value={formData.numberOfPeople} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors"
                  placeholder="max. 15 na spaní" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-900 mb-2">Zpráva</label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 outline-none transition-colors resize-none"
                  placeholder="Účel pobytu, speciální požadavky..." />
              </div>

              {/* GDPR */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="gdprConsent" name="gdprConsent" required checked={formData.gdprConsent} onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-blue-900 focus:ring-blue-900" />
                <label htmlFor="gdprConsent" className="text-sm text-stone-700">
                  Souhlasím se zpracováním osobních údajů pro účely vyřízení rezervace. *
                </label>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={!formData.checkIn || !formData.checkOut}
                  className="w-full bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />Odeslat rezervaci
                </button>
                {!formData.checkIn && (
                  <p className="text-sm text-amber-600 text-center mt-3">← Nejprve vyberte termín v kalendáři</p>
                )}
                {formData.checkIn && !formData.checkOut && (
                  <p className="text-sm text-amber-600 text-center mt-3">← Klikněte na datum odjezdu v kalendáři</p>
                )}
                {formData.checkIn && formData.checkOut && (
                  <p className="text-sm text-stone-600 text-center mt-3">Ozveme se do 24 hodin.</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Location ── */
function JurtaLocation() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-stone-900 mb-4">Kde nás najdete</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Info card */}
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-1">Adresa</h3>
                <p className="text-stone-700">Okružní 236</p>
                <p className="text-stone-700">Choltice 533 61</p>
                <p className="text-stone-700">Česká republika</p>
              </div>
            </div>

            <div className="h-px bg-stone-200" />

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-1">Poloha</h3>
                <p className="text-stone-700">Na horní louce u Choltického koupaliště. Jurty jsou na velké louce vedle koupaliště.</p>
              </div>
            </div>

            <div className="h-px bg-stone-200" />

            <div className="space-y-3">
              <a href="tel:+420602801010" className="flex items-center gap-3 text-stone-700 hover:text-blue-900 transition-colors">
                <Phone className="w-5 h-5 text-blue-900" />
                <span>+420 602 801 010</span>
              </a>
              <a href="mailto:kmen.trilobit@gmail.com" className="flex items-center gap-3 text-stone-700 hover:text-blue-900 transition-colors">
                <Mail className="w-5 h-5 text-blue-900" />
                <span>kmen.trilobit@gmail.com</span>
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=Okružní+236,+Choltice+533+61"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 font-medium transition-colors"
            >
              Otevřít v Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=15.62%2C49.99%2C15.65%2C50.00&layer=mapnik&marker=49.9955%2C15.634"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Mapa — Jurta Trilobit, Choltice"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function JurtaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <JurtaHero />
        <JurtaGallery />
        <SectionDivider />
        <JurtaInfo />
        <SectionDivider />
        <JurtaPricing />
        <SectionDivider />
        <JurtaReservation />
        <SectionDivider />
        <JurtaLocation />
        <QuickContact />
      </main>
      <Footer />
    </div>
  );
}
