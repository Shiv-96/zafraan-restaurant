import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { GALLERY } from '../data/gallery'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const n = GALLERY.length

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n])
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="Moments from Our Dastarkhwan"
          subtitle="A glimpse of the food, the fire and the evenings our guests remember."
        />

        <div className="reveal mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open image: ${img.alt}`}
              className="group mb-3 block w-full overflow-hidden rounded-2xl break-inside-avoid sm:mb-4"
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {index !== null && (
        <Lightbox image={GALLERY[index]} position={`${index + 1} / ${n}`} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  )
}

function Lightbox({ image, position, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [onClose, onPrev, onNext])

  const ctrl = 'grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <figure className="relative max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <SmartImage
          src={image.src}
          alt={image.alt}
          width={image.w}
          height={image.h}
          priority
          className="max-h-[80svh] w-auto rounded-xl object-contain"
        />
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white/80">
          <span>{image.alt}</span>
          <span className="shrink-0 text-white/50">{position}</span>
        </figcaption>
      </figure>

      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={`${ctrl} absolute top-4 right-4`}>
        <X size={22} aria-hidden="true" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous image" className={`${ctrl} absolute top-1/2 left-3 -translate-y-1/2`}>
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next image" className={`${ctrl} absolute top-1/2 right-3 -translate-y-1/2`}>
        <ChevronRight size={24} aria-hidden="true" />
      </button>
    </div>
  )
}