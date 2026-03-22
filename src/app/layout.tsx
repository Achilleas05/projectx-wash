import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Bebas_Neue, DM_Sans } from "next/font/google";
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

const NAV_LINKS = [
  "home",
  "services",
  "packages",
  "gallery",
  "about",
  "contact",
] as const;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body
        className="bg-[#050509] text-slate-100 antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Script id="scroll-class" strategy="afterInteractive">{`
          (() => {
            const tick = () => document.body.classList.toggle("is-scrolled", window.scrollY > 30);
            tick();
            window.addEventListener("scroll", tick, { passive: true });
          })();
        `}</Script>

        <div className="flex min-h-screen flex-col">
          {/* ════ HEADER ════════════════════════════════════ */}
          <header className="site-header sticky top-0 z-50 border-b border-transparent bg-transparent backdrop-blur-xl">
            <nav className="site-nav mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-6">
              {/* ── Logo ── */}
              <a href="#home" className="group flex items-center gap-3">
                {/* Glow ring around logo */}
                <div className="logo-ring relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/logo.jpeg"
                    alt="ProjectX Wash"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[22px] tracking-[0.18em] text-white transition-colors duration-200 group-hover:text-[#9efc3f]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    PROJECTX
                  </span>
                  <span className="mt-0.5 text-[8px] uppercase tracking-[0.38em] text-slate-500">
                    Wash · Cyprus
                  </span>
                </div>
              </a>

              {/* ── Nav ── */}
              <div className="flex items-center gap-1 md:gap-3">
                <div className="hidden items-center gap-0.5 md:flex">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link}
                      href={`#${link}`}
                      className="group px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-slate-400"
                    >
                      <span className="nav-link capitalize">{link}</span>
                    </a>
                  ))}
                </div>

                {/* Book Now CTA */}
                <a
                  href="https://www.instagram.com/projectx.wash.cy/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon ml-1 rounded-full bg-[#9efc3f] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black"
                >
                  Book Now
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          {/* ════ FOOTER ══════════════════════════════════ */}
          <footer className="border-t border-white/[0.06] bg-[#030306]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.jpeg"
                  alt="ProjectX Wash"
                  width={32}
                  height={32}
                  className="rounded-full object-cover opacity-70"
                />
                <span
                  className="text-lg tracking-[0.2em] text-slate-400"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PROJECTX WASH
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">
                Premium Car Detailing · Nicosia, Cyprus
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/projectx.wash.cy/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-neon text-[11px] uppercase tracking-[0.2em] text-slate-500"
                >
                  @projectx.wash.cy
                </a>
                <span className="text-[11px] text-slate-700">
                  © {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
