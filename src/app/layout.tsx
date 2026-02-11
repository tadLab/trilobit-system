import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "TRILOBIT - Dobrodružný kmen pro děti",
  description:
    "Pravidelné výpravy, hry a zážitky v přírodě pro děti 6–12 let. Choltice a okolí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
