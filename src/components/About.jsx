import { Award, ChefHat, Flame } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'

const HIGHLIGHTS = [
  { icon: Flame, title: 'Dum Pukht Cooking', text: 'Sealed handis, slow coal fire and patience. The way it was done in the royal kitchens.' },
  { icon: ChefHat, title: 'Khandani Recipes', text: 'Three generations of Ustads, with spice blends ground fresh in our kitchen every morning.' },
  { icon: Award, title: 'Loved by Lucknow', text: 'From family dinners to wedding feasts, a Hazratganj favourite for over two decades.' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -top-4 -left-4 hidden h-full w-full rounded-3xl border border-gold-500/40 sm:block" aria-hidden="true" />
          <SmartImage
            src="/images/about.webp"
            alt="Our chef plating appetisers under brass heat lamps at a festive dinner"
            width={900}
            height={1100}
            className="relative w-full rounded-3xl object-cover shadow-2xl"
          />
          <figure className="absolute -right-2 -bottom-8 max-w-[15rem] rounded-2xl border border-line bg-surface p-5 shadow-xl sm:-right-8">
            <blockquote className="font-display text-lg leading-snug italic">
              "Awadhi food is not cooked. It is nurtured."
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted">Ustad Rahmat Ali, Head Chef</figcaption>
          </figure>
        </div>

        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="Our Story"
            title="A Legacy Simmered Since 1998"
          />
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              Zafraan began as a small kebab counter near Hazratganj, run by a family of khansamas whose
              ancestors cooked for the Nawabs of Awadh. The recipes never changed; only the dining room grew.
            </p>
            <p>
              Today we serve the same Galouti, the same overnight nihari and the same saffron-scented
              biryani, in a space inspired by Lucknow&rsquo;s chikankari, jharokhas and lantern-lit evenings.
            </p>
          </div>

          <ul className="mt-10 space-y-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-accent">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}