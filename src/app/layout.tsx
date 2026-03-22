import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectX Wash · Car Detailing Nicosia",
  description: "Premium mobile car detailing services in Nicosia, Cyprus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-px-bg text-slate-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-px-gold/40 bg-gradient-to-r from-black to-px-bg">
            <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
              <div className="text-xl font-semibold tracking-tight text-px-gold">
                ProjectX Wash
              </div>
              <div className="flex gap-4 text-sm text-slate-300">
                <a
                  href="#services"
                  className="hover:text-px-gold transition-colors"
                >
                  Services
                </a>
                <a
                  href="#gallery"
                  className="hover:text-px-gold transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#about"
                  className="hover:text-px-gold transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="hover:text-px-gold transition-colors"
                >
                  Contact
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-top border-px-gold/20">
            <div className="max-w-5xl mx-auto py-6 px-4 text-xs text-slate-400 flex justify-between">
              <span>© {new Date().getFullYear()} ProjectX Wash</span>
              <span>Website by Achilleas Achilleos</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
