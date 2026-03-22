export default function Home() {
  return (
    <div className="px-noise">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-24">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center pt-10">
          <div className="space-y-6">
            <div>
              <div className="h-[2px] w-24 bg-px-neon/80 shadow-[0_0_25px_rgba(158,252,63,1)] mb-4" />
              <h1 className="text-5xl font-bold text-px-gold tracking-tight leading-tight">
                Showroom-Ready Detail
              </h1>
            </div>
            <p className="text-lg text-slate-300">
              Premium mobile car detailing in Nicosia. We bring the showroom to
              your driveway with meticulous attention to every detail.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/357XXXXXXXX?text=Hi%20I%27d%20like%20to%20book%20a%20detail"
                className="bg-px-neon text-black px-5 py-3 rounded-full text-sm font-medium
                           hover:scale-105 hover:shadow-[0_0_25px_rgba(158,252,63,0.7)]
                           transition-transform transition-shadow duration-200"
              >
                Book via WhatsApp
              </a>
              <a
                href="#services"
                className="border border-px-gold/60 text-px-gold px-5 py-3 rounded-full text-sm font-medium
                           hover:bg-px-gold hover:text-black transition-colors duration-200"
              >
                View Services
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-px-neon/20 to-px-gold/10 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">✨</div>
              <p className="text-slate-300">Premium Detailing</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="space-y-10">
          <div>
            <h2 className="text-4xl font-bold text-px-gold mb-2">
              Our Services
            </h2>
            <div className="h-[2px] w-16 bg-px-neon/80 shadow-[0_0_20px_rgba(158,252,63,0.9)]" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "RAW PACKAGE",
                price: "€49",
                items: ["Exterior wash", "Wheel cleaning", "Tire shine"],
              },
              {
                title: "ESSENTIAL PACKAGE",
                price: "€89",
                items: [
                  "Raw + Interior vacuum",
                  "Dashboard clean",
                  "Windows detail",
                ],
              },
              {
                title: "PREMIUM PACKAGE",
                price: "€149",
                items: ["Essential +", "Wax coat", "Interior protection"],
              },
            ].map((pkg, idx) => (
              <div
                key={idx}
                className="bg-px-card border border-px-gold/40 rounded-2xl p-5 flex flex-col gap-3
                           transition-transform transition-shadow duration-200
                           hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,0,0,0.7)]"
              >
                <div className="h-[2px] w-12 bg-px-neon/80 shadow-[0_0_15px_rgba(158,252,63,0.9)]" />
                <h3 className="text-lg font-semibold text-px-gold tracking-wide">
                  {pkg.title}
                </h3>
                <p className="text-3xl font-bold text-px-neon">{pkg.price}</p>
                <ul className="space-y-2 text-sm text-slate-300 flex-1">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-px-neon">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="space-y-10">
          <div>
            <h2 className="text-4xl font-bold text-px-gold mb-2">Gallery</h2>
            <div className="h-[2px] w-16 bg-px-neon/80 shadow-[0_0_20px_rgba(158,252,63,0.9)]" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-px-card border border-px-gold/40 rounded-2xl h-64 flex items-center justify-center
                           hover:shadow-[0_0_40px_rgba(158,252,63,0.3)] transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">📷</div>
                  <p className="text-slate-400">Gallery Item</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-px-gold mb-2">About Us</h2>
            <div className="h-[2px] w-16 bg-px-neon/80 shadow-[0_0_20px_rgba(158,252,63,0.9)]" />
          </div>
          <div className="bg-px-card border border-px-gold/40 rounded-2xl p-8 space-y-4">
            <p className="text-slate-300">
              Project X Wash is Nicosia's premier mobile car detailing service.
              We bring professional-grade detailing directly to your location,
              using premium products and techniques to ensure your vehicle looks
              showroom-ready.
            </p>
            <p className="text-slate-300">
              With years of experience and a passion for perfection, every
              detail matters. From exterior finish to interior conditioning, we
              treat your car with the care it deserves.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          id="contact"
          className="rounded-3xl bg-gradient-to-r from-black via-px-bg to-black
                     border border-px-neon/70 px-6 py-8 mt-10
                     flex flex-col md:flex-row items-center justify-between
                     gap-4 shadow-[0_0_35px_rgba(0,0,0,0.8)]"
        >
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-[0.25em] mb-1">
              BOOK YOUR DETAILING PLAN TODAY
            </p>
            <h3 className="text-2xl font-semibold text-px-neon mb-2">
              Ready for a showroom-ready car?
            </h3>
            <p className="text-sm text-slate-300">
              Message us on WhatsApp or Instagram @projectx.wash.cy to get your
              quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-end">
            <a
              href="https://wa.me/357XXXXXXXX?text=Hi%20I%27d%20like%20to%20book%20a%20detail"
              className="bg-px-neon text-black px-6 py-3 rounded-full text-sm font-semibold
                         hover:scale-105 hover:shadow-[0_0_25px_rgba(158,252,63,1)]
                         transition-transform transition-shadow duration-200 whitespace-nowrap"
            >
              Book via WhatsApp
            </a>
            <a
              href="https://www.instagram.com/projectx.wash.cy"
              className="border border-px-gold/60 text-px-gold px-6 py-3 rounded-full text-sm font-semibold
                         hover:bg-px-gold hover:text-black transition-colors duration-200 whitespace-nowrap"
            >
              View Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
