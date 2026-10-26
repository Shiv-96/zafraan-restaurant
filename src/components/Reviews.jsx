import { Quote, Star } from 'lucide-react'
import { REVIEWS } from '../data/reviews'
import SectionHeading from './SectionHeading'

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < rating ? 'fill-gold-500 text-gold-500' : 'text-line'}
        />
      ))}
    </div>
  )
}

const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('')

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-y border-line bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="reviews-title"
          eyebrow="Guest Reviews"
          title="Words from Our Mehmaan"
          subtitle="Nothing makes our kitchen happier than an empty plate and a kind word."
        />

        <ul className="no-scrollbar reveal -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li
              key={r.name}
              className="relative flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-line bg-bg p-6 sm:w-[60%] md:w-auto"
            >
              <Quote size={34} aria-hidden="true" className="absolute top-5 right-5 text-gold-500/25" />
              <Stars rating={r.rating} />
              <p className="mt-4 flex-1 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-gold-500/15 text-sm font-semibold text-accent">
                  {initials(r.name)}
                </span>
                <div className="text-sm">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-muted">{r.place} · {r.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}