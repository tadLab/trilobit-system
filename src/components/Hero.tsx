"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { useCtaText } from "@/hooks/useCtaText";

export function Hero() {
  const ctaText = useCtaText();
  return (
    <section className="relative bg-stone-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1635278531368-a5865aa4675b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhbXBmaXJlJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NzA4MTQ0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Children outdoor adventure"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/70 to-stone-900/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Tribal motif */}
          <div className="flex items-center gap-3 mb-6">
            <svg
              className="w-8 h-8 text-blue-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 2C12 2 8 6 8 12C8 15 9.5 17 12 17C14.5 17 16 15 16 12C16 6 12 2 12 2Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 17L11 22" strokeLinecap="round" />
            </svg>
            <span className="text-blue-700 text-sm tracking-wider uppercase">
              Kmen Trilobit
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Dobrodružství venku, přátelství na celý život
          </h1>
          <p className="text-xl sm:text-2xl text-stone-200 mb-10">
            Pravidelné výpravy, hry a zážitky v přírodě pro děti. Choltice a
            okolí.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/prihlasit"
              className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-950 transition-colors text-lg text-center"
            >
              {ctaText}
            </Link>
            <Link
              href="/kalendar"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-colors text-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Kalendář akcí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
