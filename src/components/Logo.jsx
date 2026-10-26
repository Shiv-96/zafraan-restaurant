import { SITE } from '../data/site'

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="#c9a24a" strokeWidth="1.5" />
        <path d="M20 7c3 4.5 3 8.5 0 12-3-3.5-3-7.5 0-12Z" fill="#c9a24a" />
        <path d="M13 14h14l-14 13h14" fill="none" stroke="#c9a24a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 31h18" stroke="#c9a24a" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-2xl font-bold tracking-wide">{SITE.name}</span>
        <span className="mt-0.5 block text-[0.6rem] tracking-[0.3em] uppercase opacity-70">{SITE.city}</span>
      </span>
    </span>
  )
}