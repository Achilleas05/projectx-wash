"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────
   Reveal hook
───────────────────────────────────────────────────── */
function useReveal(threshold = 0.14) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const sg = (v: boolean, delay: string) =>
  `transition-all duration-700 ${delay} ${
    v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

const displayFont = { fontFamily: "var(--font-display)" } as const;

/* ─── Data ──────────────────────────────────────────── */
const STATS = [
  { value: "500+", label: "Cars Detailed" },
  { value: "4.9★", label: "Client Rating" },
  { value: "3", label: "Signature Packages" },
  { value: "100%", label: "Paint-Safe Methods" },
];

const MARQUEE_ITEMS = [
  "Deep Gloss Finish",
  "Ceramic Coating",
  "Interior Detailing",
  "Wheel Reconditioning",
  "Paint Correction",
  "Luxury & Performance",
  "Nicosia · Cyprus",
];

const PACKAGES = [
  {
    id: "raw",
    title: "RAW",
    subtitle: "Essential precision",
    badge: "Entry",
    badgeClass: "bg-white/10 text-white/60",
    items: ["Pre-wash", "Interior wash", "Interior vacuum", "Contact wash"],
    accent: false,
  },
  {
    id: "elite",
    title: "ELITE",
    subtitle: "Full reconditioning",
    badge: "Popular",
    badgeClass: "bg-px-neon/15 text-px-neon",
    items: [
      "Pre-wash",
      "Full wheel reconditioning",
      "Interior detailing",
      "Contact wash",
      "Full exhaust reconditioning",
      "Interior vacuum",
    ],
    accent: true,
  },
  {
    id: "diamond",
    title: "DIAMOND",
    subtitle: "The complete treatment",
    badge: "Premium",
    badgeClass: "bg-px-gold/15 text-px-gold",
    items: [
      "Pre-wash",
      "Full wheel reconditioning",
      "Floor mats reconditioning",
      "Interior detailing",
      "Contact wash",
      "Exhaust reconditioning",
      "Interior vacuum",
      "Ceramic spray coating",
    ],
    accent: false,
  },
];

const GALLERY: { src: string; colSpan: string; rowSpan: string }[] = [
  {
    src: "/cars/porsche911gt3.jpeg",
    colSpan: "col-span-2",
    rowSpan: "row-span-2",
  },
  { src: "/cars/audiq8.jpeg", colSpan: "", rowSpan: "" },
  { src: "/cars/cullinan.jpeg", colSpan: "", rowSpan: "" },
  { src: "/cars/amggt.jpeg", colSpan: "", rowSpan: "" },
  { src: "/cars/mercedessl300.jpeg", colSpan: "", rowSpan: "" },
  { src: "/cars/porsche_carrera.jpeg", colSpan: "col-span-2", rowSpan: "" },
  { src: "/cars/bmw.jpeg", colSpan: "", rowSpan: "" },
  { src: "/cars/audiq8_4.jpeg", colSpan: "", rowSpan: "" },
];

/* ─── Before / After slider ─────────────────────────── */
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pct, setPct] = useState(50);
  return (
    <div className="ba-slider rounded-2xl" style={{ aspectRatio: "4/3" }}>
      {/* After (base layer) */}
      <Image
        src={after}
        alt="After detailing"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Before (clipped on top) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Before detailing"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {/* Divider line + handle */}
      <div className="ba-divider" style={{ left: `${pct}%` }}>
        <div className="ba-handle">⟺</div>
      </div>
      {/* Labels */}
      <div className="pointer-events-none absolute top-3 left-3 rounded bg-black/50 px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-white/80">
        Before
      </div>
      <div className="pointer-events-none absolute top-3 right-3 rounded bg-px-neon/80 px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-black">
        After
      </div>
      {/* Invisible range input covers entire area */}
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────── */
export default function Home() {
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  const services = useReveal(0.1);
  const plans = useReveal(0.1);
  const gallery = useReveal(0.1);
  const about = useReveal(0.12);
  const contact = useReveal(0.18);

  return (
    <div className="px-ambient">
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        {/* Full-bleed bg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cars/porsche911gt3_2.jpeg"
            alt="ProjectX Wash hero car"
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-transform duration-[2.4s] ease-out ${
              heroVis ? "scale-100" : "scale-105"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-[#050509]/60 to-[#050509]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050509]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-10 md:pb-28">
          <div className="max-w-2xl">
            <div
              className={`${sg(
                heroVis,
                "delay-75"
              )} mb-5 flex items-center gap-3`}
            >
              <div className="h-px w-10 bg-px-neon/80 shadow-[0_0_10px_rgba(158,252,63,0.5)]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/90">
                Premium Car Detailing · Nicosia, Cyprus
              </p>
            </div>

            <h1
              className={`${sg(
                heroVis,
                "delay-100"
              )} text-[clamp(4rem,12vw,8.5rem)] leading-[0.93] tracking-[0.02em] text-white`}
              style={displayFont}
            >
              Obsessive
              <br />
              <span className="text-px-neon">Detailing</span>
              <br />
              Precision
            </h1>

            <p
              className={`${sg(
                heroVis,
                "delay-200"
              )} mt-7 max-w-md text-base leading-7 text-slate-300/90`}
            >
              Deep-gloss finishes, precision interior work, and a clean process
              engineered for performance and luxury vehicles.
            </p>

            <div
              className={`${sg(
                heroVis,
                "delay-300"
              )} mt-9 flex flex-wrap gap-3`}
            >
              <a
                href="https://www.instagram.com/projectx.wash.cy"
                target="_blank"
                rel="noreferrer"
                className="btn-neon rounded-full bg-px-neon px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black"
              >
                Book via Instagram
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300 transition-all duration-300 hover:border-px-gold/40 hover:text-px-gold"
              >
                View Packages
              </a>
            </div>

            {/* Stats row */}
            <div
              className={`${sg(
                heroVis,
                "delay-[400ms]"
              )} mt-14 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4`}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl tracking-wider text-white"
                    style={displayFont}
                  >
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`${sg(
            heroVis,
            "delay-[500ms]"
          )} absolute bottom-7 right-8 z-10 flex flex-col items-center gap-2`}
        >
          <div className="h-12 w-px bg-gradient-to-b from-transparent to-px-neon/60" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">
            Scroll
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE TICKER
      ════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-px-card/60 py-4">
        <div className="marquee-track flex w-max gap-0">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-7 px-7">
              <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-px-neon/50" />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section
        id="services"
        ref={services.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
      >
        <div className={sg(services.visible, "delay-75")}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
            Services & Packages
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2
              className="text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-[0.03em] text-white"
              style={displayFont}
            >
              SIGNATURE
              <br />
              LINEUP
            </h2>
            <div className="neon-rule mb-3 hidden h-px flex-1 max-w-[200px] sm:block" />
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <article
              key={pkg.id}
              className={`${sg(
                services.visible,
                i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"
              )} service-card rounded-2xl border bg-px-card p-7 ${
                pkg.accent
                  ? "border-px-neon/20 shadow-[0_0_40px_rgba(158,252,63,0.07)]"
                  : "border-white/[0.08]"
              }`}
            >
              <span className={`service-card-badge ${pkg.badgeClass}`}>
                {pkg.badge}
              </span>
              <p className="text-6xl text-white/10" style={displayFont}>
                0{i + 1}
              </p>
              <div className="mt-2">
                <div className="neon-rule mb-3 w-10" />
                <h3
                  className="text-4xl tracking-[0.06em] text-white"
                  style={displayFont}
                >
                  {pkg.title}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {pkg.subtitle}
                </p>
              </div>
              <ul className="mt-7 space-y-3">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[14px] text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-px-neon/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.instagram.com/projectx.wash.cy"
                target="_blank"
                rel="noreferrer"
                className={`mt-8 block w-full rounded-full py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  pkg.accent
                    ? "bg-px-neon text-black hover:shadow-[0_0_20px_rgba(158,252,63,0.5)]"
                    : "border border-white/15 text-slate-300 hover:border-px-neon/30 hover:text-px-neon"
                }`}
              >
                Get Quote
              </a>
            </article>
          ))}
        </div>

        <div
          className={`${sg(
            services.visible,
            "delay-[400ms]"
          )} mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-black/30 px-6 py-5`}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-px-neon/80">
              Add-on Services
            </p>
            <p className="mt-1.5 text-sm text-slate-300">
              Leather reconditioning &nbsp;·&nbsp; Fabric reconditioning
            </p>
          </div>
          <p className="text-[11px] text-slate-500">
            Pricing varies by vehicle — DM for a quote
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BEFORE / AFTER + MONTHLY PLANS
      ════════════════════════════════════════ */}
      <section
        id="packages"
        ref={plans.ref as React.RefObject<HTMLElement>}
        className="border-y border-white/[0.06] bg-px-card/40"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Before / After */}
            <div className={sg(plans.visible, "delay-100")}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
                The Proof
              </p>
              <h2
                className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] leading-none tracking-[0.03em] text-white"
                style={displayFont}
              >
                BEFORE
                <br />
                &amp; AFTER
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                Drag the slider to see the difference a ProjectX detail makes.
              </p>
              <div className="mt-8">
                <BeforeAfter
                  before="/cars/amggt_foam.jpeg"
                  after="/cars/amggt.jpeg"
                />
              </div>
            </div>

            {/* Monthly plans */}
            <div className={sg(plans.visible, "delay-200")}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
                Save More
              </p>
              <h2
                className="mt-2 text-[clamp(2.4rem,6vw,4.5rem)] leading-none tracking-[0.03em] text-white"
                style={displayFont}
              >
                MONTHLY
                <br />
                PLANS
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                Keep your car immaculate year-round with a scheduled maintenance
                plan.
              </p>

              <div className="mt-8 grid gap-5">
                <article className="service-card rounded-2xl border border-white/[0.08] bg-px-card p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="text-2xl tracking-[0.08em] text-white"
                        style={displayFont}
                      >
                        1 MONTH PLAN
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        1 Elite + 3 Raw washes
                      </p>
                    </div>
                    <span className="rounded-full bg-px-neon/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-px-neon">
                      15% off
                    </span>
                  </div>
                  <p className="mt-4 text-[12px] text-slate-600">
                    Pricing based on vehicle size — DM to book
                  </p>
                </article>

                <article className="service-card rounded-2xl border border-px-gold/15 bg-px-card p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="text-2xl tracking-[0.08em] text-white"
                        style={displayFont}
                      >
                        2 MONTH PLAN
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        1 Diamond + 2 Elite + 3 Raw washes
                      </p>
                    </div>
                    <span className="rounded-full bg-px-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-px-gold">
                      30% off
                    </span>
                  </div>
                  <p className="mt-4 text-[12px] text-slate-600">
                    Pricing based on vehicle size — DM to book
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GALLERY
      ════════════════════════════════════════ */}
      <section
        id="gallery"
        ref={gallery.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
      >
        <div className={sg(gallery.visible, "delay-75")}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
            Gallery
          </p>
          <h2
            className="mt-2 text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-[0.03em] text-white"
            style={displayFont}
          >
            REAL RESULTS
          </h2>
        </div>

        <div
          className={`${sg(
            gallery.visible,
            "delay-150"
          )} mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`}
          style={{ gridAutoRows: "220px" }}
        >
          {GALLERY.map(({ src, colSpan, rowSpan }, i) => (
            <div
              key={src}
              className={`gallery-item rounded-xl border border-white/[0.07] ${colSpan} ${rowSpan}`}
            >
              <Image
                src={src}
                alt={`ProjectX Wash result ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section
        id="about"
        ref={about.ref as React.RefObject<HTMLElement>}
        className="border-t border-white/[0.06] bg-px-card/30"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className={sg(about.visible, "delay-75")}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
                About ProjectX
              </p>
              <h2
                className="mt-3 text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.03em] text-white"
                style={displayFont}
              >
                THE ART
                <br />
                OF CLEAN
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-400">
                <p>
                  We focus exclusively on performance and luxury vehicles, using
                  paint-safe decontamination methods and meticulous interior
                  work to deliver a cleaner, richer finish every visit.
                </p>
                <p>
                  Our process is controlled and consistent. Premium products,
                  precision application, and zero compromise — because your car
                  deserves nothing less.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Paint-safe methods",
                  "Premium products",
                  "Luxury & performance",
                  "Nicosia based",
                ].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/[0.1] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-slate-400"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className={sg(about.visible, "delay-200")}>
              <div className="hero-image-wrap relative h-[420px] overflow-hidden rounded-2xl border border-white/[0.08] md:h-[520px]">
                <Image
                  src="/cars/cullinan_3.jpeg"
                  alt="Detailing close-up"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT / CTA
      ════════════════════════════════════════ */}
      <section
        id="contact"
        ref={contact.ref as React.RefObject<HTMLElement>}
        className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
      >
        <div
          className={`${sg(
            contact.visible,
            "delay-100"
          )} neon-pulse-border relative overflow-hidden rounded-3xl border border-px-neon/15 bg-gradient-to-br from-[#0d1308] via-[#090c09] to-[#050509] p-10 md:p-16`}
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-px-neon/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-px-gold/[0.04] blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-px-neon/80">
                Instagram · @projectx.wash.cy
              </p>
              <h3
                className="mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-[0.03em] text-white"
                style={displayFont}
              >
                BOOK YOUR
                <br />
                <span className="text-px-neon">DETAIL TODAY</span>
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                Reach out on Instagram to get a custom quote based on your
                vehicle. Limited slots available each week.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="https://www.instagram.com/projectx.wash.cy"
                target="_blank"
                rel="noreferrer"
                className="btn-neon rounded-full bg-px-neon px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-black"
              >
                DM on Instagram
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/15 px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 transition-all duration-300 hover:border-px-gold/30 hover:text-px-gold"
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
