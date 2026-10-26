import { useEffect, useState } from 'react'
import { Menu as MenuIcon, Phone, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site'
import useActiveSection from '../hooks/useActiveSection'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const OBSERVED = ['home', ...NAV_LINKS.map((l) => l.id), 'reservation']

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(OBSERVED)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open
  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-line bg-bg/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#home" aria-label={`${SITE.name} home`} className={solid ? 'text-fg' : 'text-white'}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-sm font-medium tracking-wide transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-500 after:transition-all ${
                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  } ${
                    solid
                      ? isActive ? 'text-accent' : 'text-fg hover:text-accent'
                      : isActive ? 'text-gold-300' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} onDark={!solid} />
          <a href="#reservation" className="btn-primary hidden px-5! py-2.5! md:inline-flex">
            Book a Table
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid size-10 place-items-center rounded-full border md:hidden ${
              solid ? 'border-line text-fg' : 'border-white/25 text-white'
            }`}
          >
            {open ? <X size={20} aria-hidden="true" /> : <MenuIcon size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden">
          <ul className="container-x flex flex-col py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={close}
                  className={`block border-b border-line py-4 font-display text-3xl font-semibold ${
                    active === link.id ? 'text-accent' : 'text-fg'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x flex flex-col gap-3 pb-10">
            <a href="#reservation" onClick={close} className="btn-primary">
              Book a Table
            </a>
            <a href={SITE.phoneHref} className="btn-outline">
              <Phone size={16} aria-hidden="true" /> {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}