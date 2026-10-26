import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle, onDark = false }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`grid size-10 place-items-center rounded-full border transition ${
        onDark
          ? 'border-white/25 text-white hover:bg-white/10'
          : 'border-line text-fg hover:border-gold-500 hover:text-accent'
      }`}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}