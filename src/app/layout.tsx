import type { Metadata } from "next";
import Image from "next/image";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Header from "./Header";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProjectX Wash · Premium Car Detailing Cyprus",
  description:
    "Premium car detailing in Nicosia, Cyprus — showroom-level finishes, precision interior work, and tailored packages for performance and luxury vehicles.",
};

const IG = "https://www.instagram.com/projectx.wash.cy/";
const D = { fontFamily: "var(--font-display)" };
const NAV = [
  "home",
  "services",
  "packages",
  "gallery",
  "about",
  "contact",
] as const;
const SVCS = [
  "Raw Package",
  "Elite Package",
  "Diamond Package",
  "1 Month Plan (15% off)",
  "2 Month Plan (30% off)",
  "Leather Reconditioning",
  "Fabric Reconditioning",
  "Ceramic Spray Coating",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body
        className="bg-[#050509] text-slate-100 antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>

          {/* ══ FOOTER ══════════════════════════════════════════════ */}
          <footer className="border-t border-white/[0.07] bg-[#020205]">
            {/* Neon accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#9efc3f]/28 to-transparent" />

            <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-8 md:px-10 md:pt-16 md:pb-10">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo.jpeg"
                      alt="ProjectX Wash"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <span
                      className="text-[19px] tracking-[0.16em] text-white md:text-[21px] md:tracking-[0.18em]"
                      style={D}
                    >
                      PROJECTX
                    </span>
                  </div>
                  <p className="mt-3 max-w-[260px] text-[11px] leading-[1.7] text-slate-500 md:mt-4 md:text-[12px]">
                    Premium car detailing in Nicosia, Cyprus. Obsessive
                    precision for performance and luxury vehicles.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-slate-500 md:mt-5 md:px-3.5 md:py-2 md:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9efc3f]/60" />
                    Nicosia, Cyprus
                  </div>
                  <div className="mt-2.5">
                    <a
                      href={IG}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-slate-400 transition-all duration-200 hover:border-[#9efc3f]/30 hover:text-[#9efc3f] md:px-3.5 md:py-2 md:text-[10px]"
                    >
                      <svg
                        className="h-3 w-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      @projectx.wash.cy
                    </a>
                  </div>
                </div>

                {/* Navigation */}
                <div className="hidden sm:block">
                  <p className="mb-4 text-[8px] uppercase tracking-[0.32em] text-[#9efc3f]/65">
                    Navigation
                  </p>
                  <ul className="space-y-2.5">
                    {NAV.map((link) => (
                      <li key={link}>
                        <a
                          href={`#${link}`}
                          className="flex items-center gap-2.5 text-[12px] capitalize text-slate-500 transition-colors duration-150 hover:text-slate-300"
                          style={{ minHeight: "auto" }}
                        >
                          <span className="h-px w-3 bg-white/15" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="hidden md:block">
                  <p className="mb-4 text-[8px] uppercase tracking-[0.32em] text-[#9efc3f]/65">
                    Services
                  </p>
                  <ul className="space-y-2.5">
                    {SVCS.map((s) => (
                      <li key={s}>
                        <a
                          href="#services"
                          className="flex items-start gap-2.5 text-[12px] text-slate-500 transition-colors duration-150 hover:text-slate-300"
                          style={{ minHeight: "auto" }}
                        >
                          <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-[#9efc3f]/35" />
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book CTA */}
                <div>
                  <p className="mb-4 text-[8px] uppercase tracking-[0.32em] text-[#9efc3f]/65">
                    Book Now
                  </p>
                  <p className="text-[11px] leading-[1.7] text-slate-500 md:text-[12px]">
                    DM on Instagram for a quote tailored to your vehicle.
                    Limited weekly slots.
                  </p>
                  <a
                    href={IG}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-neon mt-4 flex w-full items-center justify-center rounded-full bg-[#9efc3f] py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black md:mt-5 md:py-3.5"
                    style={{ minHeight: "auto" }}
                  >
                    DM on Instagram
                  </a>
                  <div className="mt-5 hidden space-y-2.5 md:block">
                    {[
                      "Paint-safe methods only",
                      "Performance & luxury vehicles",
                      "Showroom-grade results",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center gap-2 text-[10px] text-slate-600"
                      >
                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#9efc3f]/45" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.05]">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-1.5 px-5 py-4 sm:flex-row sm:items-center md:px-10 md:py-5">
                <span className="text-[9px] uppercase tracking-[0.12em] text-slate-700 md:text-[10px] md:tracking-[0.16em]">
                  © {new Date().getFullYear()} ProjectX Wash · All rights
                  reserved
                </span>
                <span className="text-[9px] uppercase tracking-[0.12em] text-slate-700 md:text-[10px] md:tracking-[0.16em]">
                  Nicosia, Cyprus · Premium Car Detailing
                </span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
