"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ── CSS var shorthand ────────────────────────────── */
const DISPLAY: React.CSSProperties = { fontFamily: "var(--font-display)" };

/* ── Reveal hook ──────────────────────────────────── */
function useReveal(threshold = 0.12) {
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

/* stagger helper */
const sg = (v: boolean, d: string) =>
  `reveal-up ${v ? "in" : ""} transition-all duration-700 ${d}`;

/* ── Data (from uploaded images) ─────────────────── */
const STATS = [
  { val: "500+", lbl: "Cars Detailed" },
  { val: "4.9★", lbl: "Client Rating" },
  { val: "3", lbl: "Signature Packages" },
  { val: "100%", lbl: "Paint-Safe Methods" },
];

const MARQUEE = [
  "Deep Gloss Finish",
  "Ceramic Spray Coating",
  "Interior Detailing",
  "Wheel Reconditioning",
  "Exhaust Reconditioning",
  "Paint-Safe Process",
  "Leather Reconditioning",
  "Luxury & Performance",
  "Nicosia · Cyprus",
];

const PACKAGES = [
  {
    num: "01",
    title: "RAW",
    sub: "The essentials, done right",
    badge: "Entry",
    badgeCls: "bg-white/10 text-white/55",
    items: ["Pre-wash", "Interior wash", "Interior vacuum", "Contact wash"],
    cta: false,
    borderCls: "border-white/[0.09]",
    hoverCls: "card-neon",
  },
  {
    num: "02",
    title: "ELITE",
    sub: "Full reconditioning",
    badge: "Most Popular",
    badgeCls: "bg-[#9efc3f]/15 text-[#9efc3f]",
    items: [
      "Pre-wash",
      "Full wheel reconditioning",
      "Interior detailing",
      "Contact wash",
      "Full exhaust reconditioning",
      "Interior vacuum",
    ],
    cta: true,
    borderCls: "border-[#9efc3f]/18 shadow-[0_0_48px_rgba(158,252,63,0.07)]",
    hoverCls: "card-neon",
  },
  {
    num: "03",
    title: "DIAMOND",
    sub: "The complete treatment",
    badge: "Premium",
    badgeCls: "bg-[#f9b54a]/15 text-[#f9b54a]",
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
    cta: false,
    borderCls: "border-[#f9b54a]/15",
    hoverCls: "card-gold",
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
  { src: "/cars/amggt.jpeg", cs: "", rs: "", lbl: "Mercedes AMG GT" },
  { src: "/cars/mercedessl300.jpeg", cs: "", rs: "", lbl: "Mercedes SL300" },
  {
    src: "/cars/porsche_carrera.jpeg",
    cs: "col-span-2",
    rs: "",
    lbl: "Porsche Carrera",
  },
  { src: "/cars/bmw.jpeg", cs: "", rs: "", lbl: "BMW" },
  { src: "/cars/audiq8_4.jpeg", cs: "", rs: "", lbl: "Audi Q8" },
];

/* ── Floating particles type ────────────────────── */
type Particle = {
  id: number;
  size: number;
  left: string;
  delay: string;
  dur: string;
};

/* ── Before / After slider ──────────────────────── */
function BeforeAfter() {
  const [pct, setPct] = useState(48);
  return (
    <div
      className="ba-slider rounded-2xl overflow-hidden border border-white/[0.08]"
      style={{ aspectRatio: "16/10" }}
    >
      {/* After */}
      <Image
        src="/cars/amggt.jpeg"
        alt="After"
        fill
        priority={false}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Before clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src="/cars/amggt_foam.jpeg"
          alt="Before"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {/* Divider */}
      <div className="ba-line" style={{ left: `${pct}%` }}>
        <div className="ba-handle">⟺</div>
      </div>
      {/* Labels */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-md bg-[#9efc3f] px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] text-black font-bold">
        After
      </span>
      {/* Range */}
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

/* ════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════ */
export default function Home() {
  /* Hero entrance */
  const [hv, setHv] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHv(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* Particles — client-only, avoids SSR/hydration mismatch */
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        dur: `${5 + Math.random() * 6}s`,
      }))
    );
  }, []);

  const sec_services = useReveal(0.08);
  const sec_packages = useReveal(0.08);
  const sec_gallery = useReveal(0.08);
  const sec_about = useReveal(0.1);
  const sec_contact = useReveal(0.15);

  return (
    <div className="px-ambient">
      {/* ══════════════════════════════════════════
          HERO — Full-bleed cinematic
      ══════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cars/porsche911gt3_2.jpeg"
            alt="ProjectX Wash hero"
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-transform ${
              hv ? "hero-img-enter" : "scale-[1.06]"
            }`}
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-[#050509]/58 to-[#050509]/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050509]/85 via-[#050509]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050509]/30 via-transparent to-transparent" />
          {/* Spotlight sweep */}
          <div className="spotlight-sweep" />
        </div>

        {/* Floating particles */}
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
                  bottom: "5%",
                  "--delay": p.delay,
                  "--dur": p.dur,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-36 md:px-10 md:pb-32">
          <div className="max-w-[700px]">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 delay-75 ${
                hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="h-px w-12 bg-[#9efc3f] shadow-[0_0_12px_rgba(158,252,63,0.6)]" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/90">
                Premium Car Detailing · Nicosia, Cyprus
              </p>
            </div>

            {/* Headline */}
            <h1
              className={`mt-5 text-[clamp(3.8rem,11vw,8.5rem)] leading-[0.92] tracking-[0.02em] text-white transition-all duration-700 delay-[120ms] ${
                hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={DISPLAY}
            >
              Obsessive
              <br />
              <span className="text-[#9efc3f]">Detailing.</span>
              <br />
              Precision.
            </h1>

            {/* Body */}
            <p
              className={`mt-6 max-w-[460px] text-[15px] leading-[1.85] text-slate-300/85 transition-all duration-700 delay-200 ${
                hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Deep-gloss finishes, precision interior work, and a controlled
              process engineered for performance and luxury vehicles.
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-3 transition-all duration-700 delay-300 ${
                hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <a
                href="https://www.instagram.com/projectx.wash.cy/"
                target="_blank"
                rel="noreferrer"
                className="btn-neon rounded-full bg-[#9efc3f] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black"
              >
                Book via Instagram
              </a>
              {/* THIS IS THE FIX — explicit visible styles */}
              <a
                href="#services"
                className="btn-outline rounded-full border border-white/30 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:border-[#f9b54a]/50 hover:text-[#f9b54a]"
              >
                View Packages
              </a>
            </div>

            {/* Stats */}
            <div
              className={`mt-14 grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4 transition-all duration-700 delay-[420ms] ${
                hv ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.lbl}
                  className={`tick-in`}
                  style={{ animationDelay: `${0.55 + i * 0.1}s` }}
                >
                  <p
                    className="text-[2.1rem] leading-none text-white"
                    style={DISPLAY}
                  >
                    {s.val}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-500">
                    {s.lbl}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 transition-all duration-700 delay-[600ms] ${
            hv ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="scroll-bounce h-11 w-px bg-gradient-to-b from-transparent via-[#9efc3f]/50 to-[#9efc3f]/80" />
          <p className="text-[8px] uppercase tracking-[0.34em] text-slate-600">
            Scroll
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#0a0a10]/70 py-[14px] backdrop-blur-sm">
        <div className="marquee-track flex w-max">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 px-8">
              <span className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#9efc3f]/45 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SERVICES — Packages
      ══════════════════════════════════════════ */}
      <section
        id="services"
        ref={sec_services.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-36"
      >
        {/* Section header */}
        <div className={sg(sec_services.vis, "delay-75")}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
            Services & Packages
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-6">
            <h2
              className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.03em] text-white"
              style={DISPLAY}
            >
              SIGNATURE
              <br />
              LINEUP
            </h2>
            <div className="mb-2 hidden flex-1 md:block">
              <div className="neon-rule" />
            </div>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
            Every package uses paint-safe methods and premium products. Choose
            the level of care that matches your vehicle.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <article
              key={pkg.num}
              className={`${sg(
                sec_services.vis,
                i === 0
                  ? "delay-[120ms]"
                  : i === 1
                  ? "delay-200"
                  : "delay-[280ms]"
              )} service-card ${
                pkg.hoverCls
              } rounded-2xl border bg-[#0c0c12] p-7 ${pkg.borderCls}`}
            >
              {/* Badge */}
              <span
                className={`absolute top-5 right-5 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] ${pkg.badgeCls}`}
              >
                {pkg.badge}
              </span>
              {/* Ghost number */}
              <p
                className="text-[4.5rem] leading-none text-white/[0.07] select-none"
                style={DISPLAY}
              >
                {pkg.num}
              </p>
              {/* Title */}
              <div className="mt-1">
                <div
                  className={`${i === 2 ? "gold-rule" : "neon-rule"} mb-3 w-10`}
                />
                <h3
                  className="text-[2.6rem] tracking-[0.06em] text-white"
                  style={DISPLAY}
                >
                  {pkg.title}
                </h3>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  {pkg.sub}
                </p>
              </div>
              {/* Items */}
              <ul className="mt-7 space-y-3">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13.5px] text-slate-300"
                  >
                    <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#9efc3f]/65" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <a
                href="https://www.instagram.com/projectx.wash.cy/"
                target="_blank"
                rel="noreferrer"
                className={`mt-8 block w-full rounded-full py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${
                  pkg.cta
                    ? "btn-neon bg-[#9efc3f] text-black"
                    : "btn-outline border border-white/15 text-slate-300 hover:border-[#9efc3f]/35 hover:text-[#9efc3f]"
                }`}
              >
                Get a Quote
              </a>
            </article>
          ))}
        </div>

        {/* Extra services */}
        <div
          className={`${sg(
            sec_services.vis,
            "delay-[360ms]"
          )} mt-5 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/[0.07] bg-black/35 px-7 py-6`}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#9efc3f]/75">
              Extra Services
            </p>
            <p className="mt-2 text-[14px] text-slate-300">
              Leather reconditioning &nbsp;·&nbsp; Fabric reconditioning
            </p>
          </div>
          <p className="text-[11px] text-slate-500">
            Prices vary by vehicle size &amp; condition — DM for details
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PACKAGES — Before/After + Monthly plans
      ══════════════════════════════════════════ */}
      <section
        id="packages"
        ref={sec_packages.ref as React.RefObject<HTMLElement>}
        className="border-y border-white/[0.06] bg-[#070710]/50"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* ── Before / After ── */}
            <div className={sg(sec_packages.vis, "delay-75")}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
                The Proof
              </p>
              <h2
                className="mt-2 text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={DISPLAY}
              >
                BEFORE
                <br />
                &amp; AFTER
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-[1.85] text-slate-400">
                Drag the handle to reveal the difference. Every ProjectX detail
                is a showroom-grade transformation.
              </p>
              <div className="mt-8">
                <BeforeAfter />
              </div>
            </div>

            {/* ── Monthly Plans ── */}
            <div className={sg(sec_packages.vis, "delay-200")}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
                Save More
              </p>
              <h2
                className="mt-2 text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={DISPLAY}
              >
                MONTHLY
                <br />
                PLANS
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-[1.85] text-slate-400">
                Keep your car in showroom condition with a scheduled maintenance
                plan. Exclusive discounts for recurring clients.
              </p>

              <div className="mt-8 grid gap-5">
                {/* 1 Month */}
                <article className="service-card card-neon group rounded-2xl border border-white/[0.08] bg-[#0c0c12] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[1.9rem] tracking-[0.06em] text-white"
                        style={DISPLAY}
                      >
                        1 MONTH PLAN
                      </p>
                      <p className="mt-1.5 text-[12px] text-slate-400">
                        1 Elite Wash &amp; 3 Raw Washes
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[#9efc3f]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9efc3f]">
                      15% off
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-600">
                      Pricing varies by vehicle — DM to book
                    </p>
                    <a
                      href="https://www.instagram.com/projectx.wash.cy/"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 hover:border-[#9efc3f]/35 hover:text-[#9efc3f] whitespace-nowrap"
                    >
                      Book Now
                    </a>
                  </div>
                </article>

                {/* 2 Month */}
                <article className="service-card card-gold group rounded-2xl border border-[#f9b54a]/15 bg-[#0c0c12] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[1.9rem] tracking-[0.06em] text-white"
                        style={DISPLAY}
                      >
                        2 MONTH PLAN
                      </p>
                      <p className="mt-1.5 text-[12px] text-slate-400">
                        1 Diamond Wash, 2 Elite Washes &amp; 3 Raw Washes
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[#f9b54a]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f9b54a]">
                      30% off
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-600">
                      Pricing varies by vehicle — DM to book
                    </p>
                    <a
                      href="https://www.instagram.com/projectx.wash.cy/"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline rounded-full border border-[#f9b54a]/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#f9b54a]/70 hover:border-[#f9b54a]/50 hover:text-[#f9b54a] whitespace-nowrap"
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

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section
        id="gallery"
        ref={sec_gallery.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-36"
      >
        <div className={sg(sec_gallery.vis, "delay-75")}>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
            Gallery
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-6">
            <h2
              className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.03em] text-white"
              style={DISPLAY}
            >
              REAL RESULTS
            </h2>
            <div className="mb-1 hidden flex-1 md:block">
              <div className="neon-rule" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Every car you see was detailed by ProjectX Wash in Nicosia.
          </p>
        </div>

        <div
          className={`${sg(
            sec_gallery.vis,
            "delay-150"
          )} mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`}
          style={{ gridAutoRows: "215px" }}
        >
          {GALLERY.map(({ src, cs, rs, lbl }, i) => (
            <div
              key={src}
              className={`gallery-item rounded-xl border border-white/[0.07] ${cs} ${rs}`}
            >
              <Image
                src={src}
                alt={lbl}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500"
              />
              {/* Label on hover (via ::after overlay + absolute text) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                  {lbl}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section
        id="about"
        ref={sec_about.ref as React.RefObject<HTMLElement>}
        className="border-t border-white/[0.06] bg-[#060609]/60"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className={sg(sec_about.vis, "delay-75")}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
                About ProjectX
              </p>
              <h2
                className="mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.03em] text-white"
                style={DISPLAY}
              >
                THE ART
                <br />
                OF CLEAN
              </h2>
              <div className="mt-7 space-y-5 text-[15px] leading-[1.9] text-slate-400">
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
              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Paint-safe methods",
                  "Premium products",
                  "Wheel reconditioning",
                  "Ceramic coating",
                  "Exhaust detailing",
                  "Nicosia based",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* IG link */}
              <a
                href="https://www.instagram.com/projectx.wash.cy/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 link-neon"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @projectx.wash.cy
              </a>
            </div>

            {/* Image */}
            <div className={sg(sec_about.vis, "delay-200")}>
              <div className="clip-diagonal relative h-[440px] overflow-hidden rounded-2xl border border-white/[0.07] md:h-[560px]">
                <Image
                  src="/cars/cullinan_3.jpeg"
                  alt="ProjectX Wash detailing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════ */}
      <section
        id="contact"
        ref={sec_contact.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
      >
        <div
          className={`${sg(
            sec_contact.vis,
            "delay-75"
          )} neon-pulse relative overflow-hidden rounded-3xl border border-[#9efc3f]/14 bg-gradient-to-br from-[#0c1208] via-[#080b06] to-[#050509] p-10 md:p-16`}
        >
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-[#9efc3f]/[0.055] blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#f9b54a]/[0.04] blur-[70px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9efc3f]/[0.02] blur-[100px]" />

          <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#9efc3f]/80">
                Instagram · @projectx.wash.cy
              </p>
              <h3
                className="mt-3 text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-[0.03em] text-white"
                style={DISPLAY}
              >
                BOOK YOUR
                <br />
                <span className="text-[#9efc3f]">DETAIL TODAY</span>
              </h3>
              <p className="mt-4 max-w-sm text-[14px] leading-[1.85] text-slate-400">
                Send a DM on Instagram for a custom quote based on your vehicle.
                Limited slots available each week — book early.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:min-w-[200px]">
              <a
                href="https://www.instagram.com/projectx.wash.cy/"
                target="_blank"
                rel="noreferrer"
                className="btn-neon rounded-full bg-[#9efc3f] px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-black"
              >
                DM on Instagram
              </a>
              <a
                href="#services"
                className="btn-outline rounded-full border border-white/15 px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 hover:border-[#f9b54a]/40 hover:text-[#f9b54a]"
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
