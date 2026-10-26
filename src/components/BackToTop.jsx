import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-gold-500 text-ink shadow-lg transition-all duration-300 hover:bg-gold-400 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      tabIndex={show ? 0 : -1}
    >
      <ChevronUp size={22} aria-hidden="true" />
    </a>
  )
}