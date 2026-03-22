"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const IG = "https://www.instagram.com/projectx.wash.cy/";
const NAV = [
  "home",
  "services",
  "packages",
  "gallery",
  "about",
  "contact",
] as const;
const D = { fontFamily: "var(--font-display)" };

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-[rgba(158,252,63,0.09)] bg-[rgba(4,4,8,0.96)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-all duration-200 md:px-10 ${
          scrolled ? "py-3" : "py-4 md:py-5"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={close}
          className="group flex items-center gap-3"
        >
          <div className="logo-ring relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full md:h-10 md:w-10">
            <Image
              src="/logo.jpeg"
              alt="ProjectX Wash"
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[19px] tracking-[0.18em] text-white transition-colors duration-200 group-hover:text-[#9efc3f] md:text-[22px]"
              style={D}
            >
              PROJECTX
            </span>
            <span className="text-[7px] uppercase tracking-[0.36em] text-slate-500 md:text-[8px]">
              Wash · Cyprus
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="nav-group px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-slate-400"
            >
              <span className="nav-link capitalize">{link}</span>
            </a>
          ))}
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="btn-neon ml-3 rounded-full bg-[#9efc3f] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black"
          >
            Book Now
          </a>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#9efc3f] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black"
            style={{ minHeight: "auto" }}
          >
            Book
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10 p-2.5 ${
              open ? "ham-open" : ""
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ minHeight: "auto" }}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`mobile-menu border-t border-white/[0.06] bg-[rgba(4,4,8,0.98)] md:hidden ${
          open ? "open" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4">
          {NAV.map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={close}
              className="flex items-center gap-3 border-b border-white/[0.06] py-4 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition-colors hover:text-[#9efc3f]"
              style={{ transitionDelay: `${i * 30}ms`, minHeight: "auto" }}
            >
              <span className="h-px w-4 bg-[#9efc3f]/40" />
              {link}
            </a>
          ))}
          <a
            href={IG}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-[#9efc3f] py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-black"
            style={{ minHeight: "auto" }}
          >
            Book via Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
