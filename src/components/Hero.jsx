import { useState } from 'react'
import { ArrowRight, ChevronDown, UtensilsCrossed } from 'lucide-react'
import { SITE } from '../data/site'

const STATS = [
  { value: `${new Date().getFullYear() - SITE.since}+`, label: 'Years of legacy' },
  { value: '60+', label: 'Awadhi dishes' },
  { value: '4.8★', label: 'Guest rating' },
]

export default function Hero() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#140f0b] text-white"
    >
      {imgOk && (
        <img
          src="/images/hero.webp"
          alt="Awadhi curries served in copper handis with naan on a wooden table"
          width="1600"
          height="1000"
          fetchPriority="high"
          decoding="async"
          onError={() => setImgOk(false)}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-black/55 to-black/90" />
      <div className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_20%_30%,rgba(201,162,74,.22),transparent_60%)]" />

      <div className="container-x pt-28 pb-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.25em] text-gold-300 uppercase backdrop-blur">
            <UtensilsCrossed size={14} aria-hidden="true" />
            Hazratganj · Since {SITE.since}
          </p>

          <h1 id="hero-title" className="mt-6 font-display text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
            The Royal Taste <br className="hidden sm:block" />
            of <span className="text-gold-400 italic">Awadh</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Slow-cooked dum pukht biryanis, melt-in-the-mouth Galouti kebabs and recipes passed down
            from the kitchens of the Nawabs, served in the heart of Lucknow.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#reservation" className="btn-primary">
              Reserve a Table <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#menu" className="btn-ghost-light">
              Explore the Menu
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-gold-300">{s.value}</dd>
                <dd className="mt-1 text-xs text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/60 hover:text-white sm:block"
      >
        <ChevronDown size={28} aria-hidden="true" />
      </a>
    </section>
  )
}