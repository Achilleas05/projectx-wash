import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectX Wash · Car Detailing Nicosia",
  description:
    "Premium car detailing in Cyprus with showroom-level finishes, tailored packages, and monthly plans.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-px-bg text-slate-100 antialiased">
        <Script id="header-scroll" strategy="afterInteractive">
          {`
            (() => {
              const onScroll = () => {
                if (window.scrollY > 20) {
                  document.body.classList.add("is-scrolled");
                } else {
                  document.body.classList.remove("is-scrolled");
                }
              };
              onScroll();
              window.addEventListener("scroll", onScroll, { passive: true });
            })();
          `}
        </Script>

        <div className="flex min-h-screen flex-col">
          <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-black/55 via-px-bg/45 to-black/55 backdrop-blur-xl">
            <nav className="site-nav mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
              <a href="#home" className="group flex items-center gap-3">
                <Image
                  src="/logo.jpeg"
                  alt="ProjectX Wash logo"
                  width={40}
                  height={40}
                  className="rounded-full border border-white/20 object-cover"
                />
                <span className="text-base font-medium uppercase tracking-[0.2em] text-slate-100 transition-colors group-hover:text-px-gold md:text-lg">
                  ProjectX Wash
                </span>
              </a>

              <div className="flex flex-wrap items-center justify-end gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-300 md:gap-5 md:text-xs">
                <a href="#home" className="group">
                  <span className="nav-link">Home</span>
                </a>
                <a href="#services" className="group">
                  <span className="nav-link">Services</span>
                </a>
                <a href="#packages" className="group">
                  <span className="nav-link">Packages</span>
                </a>
                <a href="#gallery" className="group">
                  <span className="nav-link">Gallery</span>
                </a>
                <a href="#about" className="group">
                  <span className="nav-link">About</span>
                </a>
                <a href="#contact" className="group">
                  <span className="nav-link">Contact</span>
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-white/10 bg-black/30">
            <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-[11px] uppercase tracking-[0.12em] text-slate-500 sm:flex-row sm:items-center md:px-8">
              <span>© {new Date().getFullYear()} ProjectX Wash</span>
              <span>Cyprus · @projectx.wash.cy</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
