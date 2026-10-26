import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { MENU } from '../data/menu'
import SectionHeading from './SectionHeading'
import VegMark from './VegMark'

const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`

export default function Menu() {
  const [activeId, setActiveId] = useState(MENU[0].id)
  const [vegOnly, setVegOnly] = useState(false)

  const category = MENU.find((c) => c.id === activeId)
  const items = vegOnly ? category.items.filter((i) => i.veg) : category.items

  return (
    <section id="menu" aria-labelledby="menu-title" className="border-y border-line bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="menu-title"
          eyebrow="Our Menu"
          title="A Feast Fit for Nawabs"
          subtitle="Every dish is cooked to order. Prices are in INR and exclusive of GST. Please tell our team about any allergies."
        />

        <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Menu categories"
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {MENU.map((c) => {
              const isActive = c.id === activeId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'border-gold-500 bg-gold-500 text-ink'
                      : 'border-line text-fg hover:border-gold-500 hover:text-accent'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          <label className="inline-flex cursor-pointer items-center gap-3 self-start text-sm font-medium lg:self-auto">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
            />
            <span
              aria-hidden="true"
              className="relative h-6 w-11 rounded-full bg-line transition peer-checked:bg-green-700 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-500 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5"
            />
            Veg only
          </label>
        </div>

        <h3 className="mt-10 font-display text-2xl font-semibold text-accent italic">{category.note}</h3>

        <div id="menu-panel" aria-live="polite" className="mt-6 grid gap-x-14 gap-y-7 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.name} className="flex gap-3">
              <VegMark veg={item.veg} className="mt-1.5" />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <h4 className="font-display text-xl leading-tight font-semibold">{item.name}</h4>
                  <span aria-hidden="true" className="hidden flex-1 -translate-y-1 border-b border-dotted border-muted/40 sm:block" />
                  <span className="ml-auto shrink-0 font-semibold text-accent sm:ml-0">{formatPrice(item.price)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                {item.special && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide text-accent uppercase">
                    <Sparkles size={12} aria-hidden="true" /> Chef&rsquo;s Special
                  </span>
                )}
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <p className="text-muted md:col-span-2">No vegetarian dishes in this category. Try another one!</p>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-6 text-xs text-muted">
          <span className="inline-flex items-center gap-2"><VegMark veg /> Vegetarian</span>
          <span className="inline-flex items-center gap-2"><VegMark veg={false} /> Non-vegetarian</span>
          <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-accent" aria-hidden="true" /> Chef&rsquo;s Special</span>
        </div>
      </div>
    </section>
  )
}