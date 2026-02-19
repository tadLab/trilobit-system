"use client";

import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCtaText } from "@/hooks/useCtaText";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/programy", label: "Programy/Aktivity" },
  { href: "/kalendar", label: "Kalendář akcí" },
  { href: "/o-nas", label: "O nás" },
  { href: "/jurta", label: "Jurta" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const ctaText = useCtaText();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">T</span>
            </div>
            <span className="text-2xl font-bold text-stone-800">TRILOBIT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? "text-blue-900 font-medium"
                    : "text-stone-700 hover:text-blue-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Admin */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/prihlasit"
              className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors"
            >
              {ctaText}
            </Link>
            <Link
              href="/admin"
              className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
              aria-label="Admin přihlášení"
              title="Admin přihlášení"
            >
              <User className="w-5 h-5 text-stone-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-stone-700" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-blue-900 font-medium"
                      : "text-stone-700 hover:text-blue-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/prihlasit"
                onClick={() => setIsMenuOpen(false)}
                className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition-colors text-center mt-2"
              >
                {ctaText}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
