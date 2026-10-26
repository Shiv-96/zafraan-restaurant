import { NAV_LINKS, SITE } from '../data/site'
import { FacebookIcon, InstagramIcon } from './Icons'
import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0b0908] text-white/70">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#home" className="text-white" aria-label={`${SITE.name} home`}>
            <Logo />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {SITE.tagline} serving the flavours of the Nawabs in Hazratganj, Lucknow, since {SITE.since}.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Zafraan on Instagram" className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-gold-500 hover:text-gold-400">
              <InstagramIcon className="size-[18px]" />
            </a>
            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Zafraan on Facebook" className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-gold-500 hover:text-gold-400">
              <FacebookIcon className="size-[18px]" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition hover:text-gold-400">{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#reservation" className="transition hover:text-gold-400">Reservations</a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-semibold text-white">Opening Hours</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SITE.hours.map((h) => (
              <li key={h.days}>
                <span className="block text-white">{h.days}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>
            Demo website: {SITE.name} is a fictional restaurant. Designed &amp; built by{' '}
            <a href={SITE.designer.url} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:underline">
              {SITE.designer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}