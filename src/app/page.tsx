"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode | ((isVisible: boolean) => React.ReactNode);
};

function RevealSection({ id, className, children }: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    >
      {typeof children === "function" ? children(isVisible) : children}
    </section>
  );
}

const staggerClass = (visible: boolean, delay: string) =>
  `transform-gpu transition-all duration-700 ${delay} ${
    visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

const servicePackages = [
  {
    title: "RAW PACKAGE",
    items: ["Pre-wash", "Interior wash", "Interior vacuum", "Contact wash"],
  },
  {
    title: "ELITE PACKAGE",
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
    title: "DIAMOND PACKAGE",
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

const galleryImages = [
  "/cars/porsche911gt3.jpeg",
  "/cars/audiq8.jpeg",
  "/cars/cullinan.jpeg",
  "/cars/amggt.jpeg",
  "/cars/mercedessl300.jpeg",
  "/cars/porsche_carrera.jpeg",
  "/cars/bmw.jpeg",
  "/cars/audiq8_4.jpeg",
];

export default function Home() {
  return (
    <div id="home" className="px-noise">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-28 px-5 py-12 md:px-8 md:py-16 lg:gap-36">
        <RevealSection className="pt-3 md:pt-8">
          {(isVisible) => (
            <div className="grid items-center gap-10 md:grid-cols-[0.92fr_1.08fr] lg:gap-14">
              <div className="space-y-7">
                <div className={staggerClass(isVisible, "delay-75")}>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                    Premium Car Detailing · Cyprus
                  </p>
                  <div className="mt-3 h-px w-20 bg-px-neon/70 shadow-[0_0_14px_rgba(158,252,63,0.45)]" />
                </div>

                <h1
                  className={`${staggerClass(
                    isVisible,
                    "delay-150"
                  )} max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-slate-100 sm:text-5xl lg:text-6xl`}
                >
                  Obsessive detailing for performance and luxury cars.
                </h1>

                <p
                  className={`${staggerClass(
                    isVisible,
                    "delay-200"
                  )} max-w-lg text-base leading-7 text-slate-300`}
                >
                  ProjectX Wash delivers deep-gloss finishes, precision interior
                  work, and a clean, understated process designed for premium
                  vehicles.
                </p>

                <div
                  className={`flex flex-wrap gap-3 ${staggerClass(
                    isVisible,
                    "delay-300"
                  )}`}
                >
                  <a
                    href="https://www.instagram.com/projectx.wash.cy"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-px-neon px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform transition-shadow duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(158,252,63,0.7)]"
                  >
                    View Instagram
                  </a>
                  <a
                    href="#services"
                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-px-gold/30 hover:text-px-gold"
                  >
                    View services
                  </a>
                </div>
              </div>

              <div className={staggerClass(isVisible, "delay-300")}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-px-card/80">
                  <Image
                    src="/cars/porsche911gt3_2.jpeg"
                    alt="Luxury car detailing result"
                    width={1600}
                    height={1000}
                    priority
                    className="h-[26rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:h-[32rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-black/25 to-black/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-px-neon/90">
                      Project X Finish
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      Refined surface depth and interior clarity.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-px-card/80">
                    <Image
                      src="/cars/amggt_foam.jpeg"
                      alt="Before detailing"
                      width={900}
                      height={700}
                      className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <p className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                      Before
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-px-card/80">
                    <Image
                      src="/cars/amggt.jpeg"
                      alt="After detailing"
                      width={900}
                      height={700}
                      className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <p className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-px-neon/90">
                      After
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </RevealSection>

        <RevealSection id="services">
          {(isVisible) => (
            <div className="space-y-10">
              <div className={staggerClass(isVisible, "delay-75")}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                  Services & Packages
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-100 sm:text-4xl">
                  Signature package lineup
                </h2>
                <div className="mt-3 h-px w-16 bg-px-neon/70" />
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {servicePackages.map((pkg, index) => (
                  <article
                    key={pkg.title}
                    className={`${staggerClass(
                      isVisible,
                      index === 0
                        ? "delay-100"
                        : index === 1
                        ? "delay-200"
                        : "delay-300"
                    )} rounded-2xl border border-white/10 bg-px-card/70 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-px-gold/25`}
                  >
                    <div className="mb-4 h-px w-12 bg-px-neon/70" />
                    <h3 className="text-2xl font-medium tracking-[0.03em] text-px-gold">
                      {pkg.title}
                    </h3>
                    <ul className="mt-5 space-y-3 text-[15px] leading-6 text-slate-300">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-px-neon/80" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div
                className={`${staggerClass(
                  isVisible,
                  "delay-300"
                )} rounded-2xl border border-white/10 bg-black/25 p-6`}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-px-neon/90">
                  Extra Services
                </p>
                <p className="mt-3 text-base text-slate-300">
                  Leather reconditioning · Fabric reconditioning
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Prices vary by vehicle size & condition – DM for quote.
                </p>
              </div>
            </div>
          )}
        </RevealSection>

        <RevealSection id="packages">
          {(isVisible) => (
            <div className="space-y-10">
              <div className={staggerClass(isVisible, "delay-75")}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                  Plans
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-100 sm:text-4xl">
                  Monthly maintenance plans
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <article
                  className={`${staggerClass(
                    isVisible,
                    "delay-150"
                  )} rounded-2xl border border-white/10 bg-px-card/70 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-px-gold/25`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      1 Month Package
                    </p>
                    <span className="rounded-full bg-px-neon/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-px-neon">
                      15% off
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2 text-[15px] text-slate-300">
                    <li>1 Elite wash</li>
                    <li>3 Raw washes</li>
                  </ul>
                  <p className="mt-4 text-sm text-slate-400">
                    Prices vary by vehicle size & condition – DM for quote.
                  </p>
                </article>

                <article
                  className={`${staggerClass(
                    isVisible,
                    "delay-300"
                  )} rounded-2xl border border-white/10 bg-px-card/70 p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-px-gold/25`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      2 Month Package
                    </p>
                    <span className="rounded-full bg-px-neon/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-px-neon">
                      30% off
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2 text-[15px] text-slate-300">
                    <li>1 Diamond wash</li>
                    <li>2 Elite washes</li>
                    <li>3 Raw washes</li>
                  </ul>
                  <p className="mt-4 text-sm text-slate-400">
                    Prices vary by vehicle size & condition – DM for quote.
                  </p>
                </article>
              </div>
            </div>
          )}
        </RevealSection>

        <RevealSection id="gallery">
          {(isVisible) => (
            <div className="space-y-10">
              <div className={staggerClass(isVisible, "delay-75")}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                  Gallery
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-100 sm:text-4xl">
                  Real ProjectX results
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((src) => (
                  <div
                    key={src}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-px-card/80"
                  >
                    <Image
                      src={src}
                      alt="ProjectX Wash gallery"
                      width={800}
                      height={600}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </RevealSection>

        <RevealSection id="about">
          {(isVisible) => (
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-10">
              <div className={staggerClass(isVisible, "delay-100")}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                  About
                </p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-slate-100 sm:text-5xl">
                  About ProjectX Wash
                </h2>
              </div>

              <div className="space-y-5">
                <p
                  className={`${staggerClass(
                    isVisible,
                    "delay-200"
                  )} text-base leading-8 text-slate-300`}
                >
                  We focus on performance and luxury vehicles, using paint-safe
                  methods and meticulous interior detailing to deliver a
                  cleaner, richer finish every time.
                </p>
                <p
                  className={`${staggerClass(
                    isVisible,
                    "delay-300"
                  )} text-base leading-8 text-slate-300`}
                >
                  The approach is simple: controlled process, premium products,
                  and consistent outcomes that match high client standards.
                </p>
                <div className={staggerClass(isVisible, "delay-300")}>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-px-card/80">
                    <Image
                      src="/cars/cullinan_3.jpeg"
                      alt="Close-up detailing finish"
                      width={1200}
                      height={850}
                      className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </RevealSection>

        <RevealSection id="contact">
          {(isVisible) => (
            <div
              className={`${staggerClass(
                isVisible,
                "delay-100"
              )} neon-pulse-border rounded-3xl border border-white/10 bg-gradient-to-r from-black/55 via-px-bg/40 to-black/55 p-7 md:p-9`}
            >
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">
                    Instagram · @projectx.wash.cy
                  </p>
                  <h3 className="mt-2 text-2xl font-medium tracking-[-0.01em] text-slate-100 sm:text-3xl">
                    Book your detailing plan today.
                  </h3>
                </div>
                <a
                  href="https://www.instagram.com/projectx.wash.cy"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-px-neon px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-black transition-transform transition-shadow duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(158,252,63,0.7)]"
                >
                  View Instagram
                </a>
              </div>
            </div>
          )}
        </RevealSection>
      </div>
    </div>
  );
}
