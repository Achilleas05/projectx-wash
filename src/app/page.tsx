"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const D: React.CSSProperties = { fontFamily: "var(--font-display)" };
const IG = "https://www.instagram.com/projectx.wash.cy/";

/* ── Reveal hook ─────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

const sg = (v: boolean, d: string) => `reveal-up ${v ? "in" : ""} ${d}`;

/* ── Data ────────────────────────────────────────── */
const STATS = [
  { val: "500+", lbl: "Cars Detailed" },
  { val: "4.9★", lbl: "Client Rating" },
  { val: "3", lbl: "Packages" },
  { val: "100%", lbl: "Paint-Safe" },
];

const MARQUEE = [
  "Deep Gloss Finish",
  "Ceramic Spray Coating",
  "Interior Detailing",
  "Wheel Reconditioning",
  "Exhaust Reconditioning",
  "Leather Reconditioning",
  "Fabric Reconditioning",
  "Paint-Safe Methods",
  "Nicosia · Cyprus",
];

/* Exact data from uploaded images */
const PACKAGES = [
  {
    num: "01",
    title: "RAW",
    sub: "The essentials, done right",
    badge: "Entry",
    badgeCls: "bg-white/10 text-white/60",
    accentCls: "neon-rule",
    cardCls: "border-white/[0.09] card-neon",
    ctaStyle: "border border-white/15 text-slate-300",
    ctaHover: "hover:border-[#9efc3f]/40 hover:text-[#9efc3f]",
    items: ["Pre-wash", "Interior wash", "Interior vacuum", "Contact wash"],
  },
  {
    num: "02",
    title: "ELITE",
    sub: "Full reconditioning",
    badge: "Most Popular",
    badgeCls: "bg-[#9efc3f]/15 text-[#9efc3f]",
    accentCls: "neon-rule",
    cardCls:
      "border-[#9efc3f]/20 card-neon shadow-[0_0_50px_rgba(158,252,63,0.07)]",
    ctaStyle: "bg-[#9efc3f] text-black",
    ctaHover: "",
    items: [
      "Pre-wash",
      "Full wheel reconditioning",
      "Interior detailing",
      "Contact wash",
      "Full exhaust reconditioning",
      "Interior vacuum",
    ],
  },
  {
    num: "03",
    title: "DIAMOND",
    sub: "The complete treatment",
    badge: "Premium",
    badgeCls: "bg-[#f9b54a]/15 text-[#f9b54a]",
    accentCls: "gold-rule",
    cardCls: "border-[#f9b54a]/15 card-gold",
    ctaStyle: "border border-[#f9b54a]/25 text-[#f9b54a]/80",
    ctaHover: "hover:border-[#f9b54a]/50 hover:text-[#f9b54a]",
    items: [
      "Pre-wash",
      "Full wheel reconditioning",
      "Full floor mats reconditioning",
      "Interior detailing",
      "Contact wash",
      "Full exhaust reconditioning",
      "Interior vacuum",
      "Ceramic spray coating",
    ],
  },
];

const GALLERY = [
  {
    src: "/cars/porsche911gt3.jpeg",
    cs: "col-span-2",
    rs: "row-span-2",
    lbl: "Porsche 911 GT3",
  },
  { src: "/cars/audiq8.jpeg", cs: "", rs: "", lbl: "Audi Q8" },
  { src: "/cars/cullinan.jpeg", cs: "", rs: "", lbl: "Rolls-Royce Cullinan" },
  { src: "/cars/amggt.jpeg", cs: "", rs: "", lbl: "Mercedes-AMG GT" },
  { src: "/cars/mercedessl300.jpeg", cs: "", rs: "", lbl: "Mercedes SL300" },
  {
    src: "/cars/porsche_carrera.jpeg",
    cs: "col-span-2",
    rs: "",
    lbl: "Porsche Carrera",
  },
  { src: "/cars/bmw.jpeg", cs: "", rs: "", lbl: "BMW M Series" },
  { src: "/cars/audiq8_4.jpeg", cs: "", rs: "", lbl: "Audi Q8" },
];

type Particle = {
  id: number;
  size: number;
  left: string;
  delay: string;
  dur: string;
};

/* ── Before/After ──────────────────────────────── */
function BeforeAfter() {
  const [pct, setPct] = useState(50);
  return (
    <div
      className="ba-slider overflow-hidden rounded-2xl border border-white/[0.08]"
      style={{ aspectRatio: "4/3" }}
    >
      <Image
        src="/cars/amggt.jpeg"
        alt="After ProjectX detail"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src="/cars/amggt_foam.jpeg"
          alt="Before ProjectX detail"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="ba-line" style={{ left: `${pct}%` }}>
        <div className="ba-handle">⟺</div>
      </div>
      <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-black/65 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-md bg-[#9efc3f] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-black">
        After
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(+e.target.value)}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function Home() {
  const [hv, setHv] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHv(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Client-only particles */
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1.5,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        dur: `${5 + Math.random() * 6}s`,
      }))
    );
  }, []);

  const s_services = useReveal(0.07);
  const s_packages = useReveal(0.07);
  const s_gallery = useReveal(0.07);
  const s_about = useReveal(0.08);
  const s_contact = useReveal(0.12);

  return (
    <div className="px-ambient">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cars/porsche911gt3_2.jpeg"
            alt="ProjectX Wash hero"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-transform ${
              hv ? "hero-img-enter" : "scale-[1.07]"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-[#050509]/55 to-[#050509]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050509]/85 via-[#050509]/25 to-transparent" />
          <div className="spotlight-sweep" />
        </div>

        {/* Particles */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={
                {
                  width: p.size,
                  height: p.size,
                  left: p.left,
                  bottom: "8%",
                  "--delay": p.delay,
                  "--dur": p.dur,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 md:px-10 md:pb-28 md:pt-40">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 delay-75 ${
              hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="h-px w-8 bg-[#9efc3f] shadow-[0_0_10px_rgba(158,252,63,0.6)] md:w-12" />
            <p className="text-[9px] uppercase tracking-[0.32em] text-[#9efc3f]/90 md:text-[10px]">
              Premium Car Detailing · Nicosia, Cyprus
            </p>
          </div>

          {/* Headline */}
          <h1
            className={`mt-4 text-[clamp(3.4rem,14vw,8.5rem)] leading-[0.91] tracking-[0.02em] text-white transition-all duration-700 delay-[120ms] md:mt-5 ${
              hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={D}
          >
            Obsessive
            <br />
            <span className="text-[#9efc3f]">Detailing.</span>
            <br />
            Precision.
          </h1>

          {/* Body — hidden on very small screens to save space */}
          <p
            className={`mt-5 max-w-[420px] text-[13px] leading-[1.85] text-slate-300/85 transition-all duration-700 delay-200 md:max-w-[460px] md:text-[15px] ${
              hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Deep-gloss finishes, precision interior work, and a clean process
            engineered for performance and luxury vehicles.
          </p>

          {/* CTAs */}
          <div
            className={`mt-6 flex flex-wrap items-center gap-3 transition-all duration-700 delay-300 md:mt-8 ${
              hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="btn-neon rounded-full bg-[#9efc3f] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black md:px-7 md:py-3.5 md:text-[11px]"
              style={{ minHeight: "auto" }}
            >
              Book via Instagram
            </a>
            <a
              href="#services"
              className="btn-outline rounded-full border border-white/30 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white hover:border-[#f9b54a]/50 hover:text-[#f9b54a] md:px-7 md:py-3.5 md:text-[11px]"
              style={{ minHeight: "auto" }}
            >
              View Packages
            </a>
          </div>

          {/* Stats — 2-col on mobile, 4-col on sm+ */}
          <div
            className={`mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-10 transition-all duration-700 delay-[420ms] md:mt-14 ${
              hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {STATS.map((s, i) => (
              <div
                key={s.lbl}
                className="tick-in"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <p
                  className="text-[1.85rem] leading-none text-white md:text-[2.1rem]"
                  style={D}
                >
                  {s.val}
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-slate-500 md:text-[9px]">
                  {s.lbl}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        <div
          className={`absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 transition-all duration-700 delay-[600ms] md:flex ${
            hv ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="scroll-bounce h-10 w-px bg-gradient-to-b from-transparent via-[#9efc3f]/50 to-[#9efc3f]/80" />
          <p className="text-[8px] uppercase tracking-[0.32em] text-slate-600">
            Scroll
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#0a0a10]/70 py-3 backdrop-blur-sm md:py-[14px]">
        <div className="marquee-track flex w-max">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-6 px-6 md:gap-8 md:px-8"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 md:text-[10px]">
                {item}
              </span>
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#9efc3f]/45" />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SERVICES — Package cards
      ══════════════════════════════════════ */}
      <section
        id="services"
        ref={s_services.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-36"
      >
        <div className={sg(s_services.vis, "delay-75")}>
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
            Services & Packages
          </p>
          <h2
            className="mt-2 text-[clamp(2.6rem,10vw,6rem)] leading-[0.91] tracking-[0.03em] text-white"
            style={D}
          >
            SIGNATURE
            <br />
            LINEUP
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-7 text-slate-400 md:text-sm">
            Every package uses paint-safe methods and premium products. Choose
            the level of care your vehicle deserves.
          </p>
        </div>

        {/* Package cards — single column mobile, 3-col desktop */}
        <div className="mt-10 grid gap-4 md:mt-14 md:gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <article
              key={pkg.num}
              className={`${sg(
                s_services.vis,
                i === 0
                  ? "delay-[100ms]"
                  : i === 1
                  ? "delay-[180ms]"
                  : "delay-[260ms]"
              )} service-card rounded-2xl border bg-[#0c0c12] p-5 md:p-7 ${
                pkg.cardCls
              }`}
            >
              {/* Badge */}
              <span
                className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] md:top-5 md:right-5 md:px-3 md:py-1 md:text-[9px] ${pkg.badgeCls}`}
              >
                {pkg.badge}
              </span>

              {/* Ghost number */}
              <p
                className="select-none text-[3.5rem] leading-none text-white/[0.07] md:text-[4.5rem]"
                style={D}
              >
                {pkg.num}
              </p>

              {/* Title block */}
              <div className="mt-1">
                <div
                  className={`${pkg.accentCls} mb-2.5 w-8 md:mb-3 md:w-10`}
                />
                <h3
                  className="text-[2.1rem] tracking-[0.06em] text-white md:text-[2.6rem]"
                  style={D}
                >
                  {pkg.title}
                </h3>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-slate-500 md:text-[10px]">
                  {pkg.sub}
                </p>
              </div>

              {/* Items list */}
              <ul className="mt-5 space-y-2.5 md:mt-7 md:space-y-3">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[12.5px] text-slate-300 md:text-[13.5px]"
                  >
                    <span className="pkg-check mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA — ALL link to Instagram */}
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className={`btn-neon mt-6 flex w-full items-center justify-center rounded-full py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 md:mt-8 md:py-3.5 ${pkg.ctaStyle} ${pkg.ctaHover}`}
                style={{ minHeight: "auto" }}
              >
                Get a Quote
              </a>
            </article>
          ))}
        </div>

        {/* Extra services */}
        <div
          className={`${sg(
            s_services.vis,
            "delay-[340ms]"
          )} mt-4 rounded-2xl border border-white/[0.07] bg-black/35 p-5 md:mt-5 md:p-6`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9efc3f]/75 md:text-[10px]">
                Extra Services
              </p>
              <p className="mt-1.5 text-[13px] text-slate-300 md:text-[14px]">
                Leather reconditioning &nbsp;·&nbsp; Fabric reconditioning
              </p>
            </div>
            <a
              href={IG}
              target="_blank"
              rel="noreferrer"
              className="btn-outline self-start rounded-full border border-white/15 px-5 py-2.5 text-[9px] uppercase tracking-[0.18em] text-slate-400 hover:border-[#9efc3f]/35 hover:text-[#9efc3f] sm:self-auto md:text-[10px]"
              style={{ minHeight: "auto" }}
            >
              DM for Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEFORE/AFTER + MONTHLY PLANS
      ══════════════════════════════════════ */}
      <section
        id="packages"
        ref={s_packages.ref as React.RefObject<HTMLElement>}
        className="border-y border-white/[0.06] bg-[#070710]/50"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-36">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Before/After */}
            <div className={sg(s_packages.vis, "delay-75")}>
              <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
                The Proof
              </p>
              <h2
                className="mt-2 text-[clamp(2.2rem,9vw,4.8rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={D}
              >
                BEFORE
                <br />
                &amp; AFTER
              </h2>
              <p className="mt-3 text-[13px] leading-[1.8] text-slate-400 md:text-sm">
                Drag the handle to reveal the transformation. Every ProjectX
                detail is showroom-grade.
              </p>
              <div className="mt-6 md:mt-8">
                <BeforeAfter />
              </div>
            </div>

            {/* Monthly Plans */}
            <div className={sg(s_packages.vis, "delay-[160ms]")}>
              <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
                Save More
              </p>
              <h2
                className="mt-2 text-[clamp(2.2rem,9vw,4.8rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={D}
              >
                MONTHLY
                <br />
                PLANS
              </h2>
              <p className="mt-3 text-[13px] leading-[1.8] text-slate-400 md:text-sm">
                Keep your car in showroom condition with a scheduled maintenance
                plan.
              </p>

              <div className="mt-6 grid gap-4 md:mt-8 md:gap-5">
                {/* 1 Month */}
                <article className="service-card card-neon rounded-2xl border border-white/[0.09] bg-[#0c0c12] p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[1.6rem] tracking-[0.06em] text-white md:text-[1.9rem]"
                        style={D}
                      >
                        1 MONTH PLAN
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400 md:text-[12px]">
                        1 Elite Wash &amp; 3 Raw Washes
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[#9efc3f]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9efc3f] md:px-3 md:py-1.5 md:text-[10px]">
                      15% off
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 md:mt-5">
                    <p className="text-[10px] text-slate-600 md:text-[11px]">
                      Pricing varies by vehicle
                    </p>
                    <a
                      href={IG}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-neon flex-shrink-0 rounded-full bg-[#9efc3f] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black md:text-[10px]"
                      style={{ minHeight: "auto" }}
                    >
                      Book Now
                    </a>
                  </div>
                </article>

                {/* 2 Month */}
                <article className="service-card card-gold rounded-2xl border border-[#f9b54a]/15 bg-[#0c0c12] p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[1.6rem] tracking-[0.06em] text-white md:text-[1.9rem]"
                        style={D}
                      >
                        2 MONTH PLAN
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400 md:text-[12px]">
                        1 Diamond + 2 Elite + 3 Raw Washes
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[#f9b54a]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#f9b54a] md:px-3 md:py-1.5 md:text-[10px]">
                      30% off
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 md:mt-5">
                    <p className="text-[10px] text-slate-600 md:text-[11px]">
                      Pricing varies by vehicle
                    </p>
                    <a
                      href={IG}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-neon flex-shrink-0 rounded-full bg-[#f9b54a] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black md:text-[10px]"
                      style={{ minHeight: "auto" }}
                    >
                      Book Now
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section
        id="gallery"
        ref={s_gallery.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-36"
      >
        <div className={sg(s_gallery.vis, "delay-75")}>
          <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
            Gallery
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-4">
            <h2
              className="text-[clamp(2.6rem,10vw,6rem)] leading-[0.91] tracking-[0.03em] text-white"
              style={D}
            >
              REAL RESULTS
            </h2>
            <div className="mb-1 hidden flex-1 md:block">
              <div className="neon-rule" />
            </div>
          </div>
          <p className="mt-2 text-[12px] text-slate-500 md:text-sm">
            Every car detailed by ProjectX Wash, Nicosia.
          </p>
        </div>

        {/* Grid — 2 col mobile, richer on desktop */}
        <div
          className={`${sg(
            s_gallery.vis,
            "delay-150"
          )} mt-8 grid grid-cols-2 gap-2.5 md:mt-10 md:gap-3 md:grid-cols-2 lg:grid-cols-4`}
          style={{ gridAutoRows: "clamp(140px, 22vw, 215px)" }}
        >
          {GALLERY.map(({ src, cs, rs, lbl }, i) => (
            <div
              key={src}
              className={`gallery-item overflow-hidden rounded-xl border border-white/[0.07] ${cs} ${rs}`}
            >
              <Image
                src={src}
                alt={lbl}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500"
              />
              {/* Label visible on mobile (always shows), desktop hover only via CSS */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 md:p-3">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/70 md:text-[9px]">
                  {lbl}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section
        id="about"
        ref={s_about.ref as React.RefObject<HTMLElement>}
        className="border-t border-white/[0.06] bg-[#060609]/60"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-36">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className={sg(s_about.vis, "delay-75")}>
              <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
                About ProjectX
              </p>
              <h2
                className="mt-2 text-[clamp(2.6rem,10vw,6rem)] leading-[0.91] tracking-[0.03em] text-white"
                style={D}
              >
                THE ART
                <br />
                OF CLEAN
              </h2>
              <div className="mt-5 space-y-4 text-[13px] leading-[1.9] text-slate-400 md:mt-7 md:text-[15px]">
                <p>
                  We focus exclusively on performance and luxury vehicles —
                  using paint-safe decontamination methods and meticulous
                  interior work to deliver a cleaner, richer finish every single
                  visit.
                </p>
                <p>
                  The process is controlled and consistent. Premium products,
                  precision application, zero compromise. Because your car
                  deserves nothing less.
                </p>
              </div>
              {/* Tags — wrap nicely on mobile */}
              <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
                {[
                  "Paint-safe",
                  "Premium products",
                  "Wheel reconditioning",
                  "Ceramic coating",
                  "Exhaust detailing",
                  "Nicosia based",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-slate-500 md:px-4 md:text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* IG link */}
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="link-neon mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-500 md:mt-8 md:text-[11px]"
                style={{ minHeight: "auto" }}
              >
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @projectx.wash.cy
              </a>
            </div>

            {/* Image — full width on mobile, clipped on desktop */}
            <div className={sg(s_about.vis, "delay-[180ms]")}>
              <div className="clip-diagonal relative h-[320px] overflow-hidden rounded-2xl border border-white/[0.07] md:h-[480px] lg:h-[560px]">
                <Image
                  src="/cars/cullinan_3.jpeg"
                  alt="ProjectX Wash detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════ */}
      <section
        id="contact"
        ref={s_contact.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-32"
      >
        <div
          className={`${sg(
            s_contact.vis,
            "delay-75"
          )} neon-pulse relative overflow-hidden rounded-3xl border border-[#9efc3f]/14 bg-gradient-to-br from-[#0c1208] via-[#080b06] to-[#050509] p-7 md:p-14 lg:p-16`}
        >
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#9efc3f]/[0.055] blur-[70px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#f9b54a]/[0.04] blur-[60px]" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.34em] text-[#9efc3f]/80 md:text-[10px]">
                Instagram · @projectx.wash.cy
              </p>
              <h3
                className="mt-3 text-[clamp(2.4rem,10vw,5.5rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={D}
              >
                BOOK YOUR
                <br />
                <span className="text-[#9efc3f]">DETAIL TODAY</span>
              </h3>
              <p className="mt-3 max-w-sm text-[13px] leading-[1.85] text-slate-400 md:mt-4 md:text-[14px]">
                Send a DM on Instagram for a custom quote. Limited slots
                available each week.
              </p>
            </div>

            {/* CTA buttons — stacked on mobile, side-by-side on sm */}
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:min-w-[190px]">
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="btn-neon flex items-center justify-center rounded-full bg-[#9efc3f] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black md:text-[11px]"
                style={{ minHeight: "auto" }}
              >
                DM on Instagram
              </a>
              <a
                href="#services"
                className="btn-outline flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 hover:border-[#f9b54a]/40 hover:text-[#f9b54a] md:text-[11px]"
                style={{ minHeight: "auto" }}
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
