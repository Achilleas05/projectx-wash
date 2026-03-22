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
    "Premium car detailing in Cyprus — showroom-level finishes, precision interior work, and tailored packages for performance and luxury vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body
        className="bg-px-bg text-slate-100 antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Script id="header-scroll" strategy="afterInteractive">
          {`
            (() => {
              const onScroll = () => {
                document.body.classList.toggle("is-scrolled", window.scrollY > 20);
              };
              onScroll();
              window.addEventListener("scroll", onScroll, { passive: true });
            })();
          `}
        </Script>

        <div className="flex min-h-screen flex-col">
          {/* ── Header ── */}
          <header className="site-header sticky top-0 z-50 border-b border-white/[0.07] bg-gradient-to-r from-black/60 via-px-bg/50 to-black/60 backdrop-blur-2xl">
            <nav className="site-nav mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
              {/* Logo */}
              <a href="#home" className="group flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src="/logo.jpeg"
                    alt="ProjectX Wash logo"
                    fill
                    sizes="36px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span
                  className="text-xl tracking-[0.22em] text-slate-100 transition-colors group-hover:text-px-neon"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PROJECTX
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.3em] text-slate-500 sm:block">
                  Wash
                </span>
              </a>

              {/* Nav links */}
              <div className="flex flex-wrap items-center justify-end gap-1 text-[10px] uppercase tracking-[0.22em] text-slate-400 md:gap-4 md:text-[11px]">
                {[
                  "home",
                  "services",
                  "packages",
                  "gallery",
                  "about",
                  "contact",
                ].map((link) => (
                  <a key={link} href={`#${link}`} className="group px-1 py-0.5">
                    <span className="nav-link capitalize">{link}</span>
                  </a>
                ))}
                <a
                  href="https://www.instagram.com/projectx.wash.cy"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon ml-2 hidden rounded-full bg-px-neon px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black sm:block"
                >
                  Book Now
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          {/* ── Footer ── */}
          <footer className="border-t border-white/[0.07] bg-gradient-to-r from-black/50 via-px-bg/30 to-black/50">
            <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 px-5 py-8 md:flex-row md:items-center md:px-10">
              <div className="flex items-center gap-3">
                <span
                  className="text-lg tracking-[0.22em] text-slate-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PROJECTX
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-slate-600">
                  Wash
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-600">
                Premium Car Detailing · Nicosia, Cyprus
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/projectx.wash.cy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-px-neon"
                >
                  @projectx.wash.cy
                </a>
                <span className="text-[11px] uppercase tracking-[0.12em] text-slate-700">
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
