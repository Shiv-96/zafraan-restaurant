import { useState } from 'react'
import { CalendarCheck, CircleCheck, Clock, LoaderCircle, Phone, Users } from 'lucide-react'
import { SITE } from '../data/site'
import SectionHeading from './SectionHeading'

function buildSlots() {
  const slots = []
  for (let mins = 12 * 60; mins <= 22 * 60 + 30; mins += 30) {
    const h24 = Math.floor(mins / 60)
    const m = mins % 60
    const h12 = ((h24 + 11) % 12) + 1
    slots.push(`${h12}:${m.toString().padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`)
  }
  return slots
}
const TIME_SLOTS = buildSlots()

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function Reservation() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setStatus('sending')

    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 800))
        console.info('[DEV] Netlify Forms sirf deploy ke baad chalta hai. Data:', Object.fromEntries(formData))
      } else {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        })
        if (!res.ok) throw new Error(`Status ${res.status}`)
      }
      form.reset()
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_80%_10%,rgba(201,162,74,.12),transparent_55%)]" />
      <div className="container-x grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            id="reservation-title"
            align="left"
            eyebrow="Reservations"
            title="Reserve Your Table"
            subtitle="Book online and our team will confirm your table by call or WhatsApp within 30 minutes."
          />
          <ul className="reveal mt-8 space-y-5 text-sm">
            <li className="flex gap-3">
              <Clock size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold">Opening hours</p>
                {SITE.hours.map((h) => (
                  <p key={h.days} className="text-muted">{h.days}: {h.time}</p>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <Users size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold">Groups &amp; events</p>
                <p className="text-muted">For parties above 10 guests, please call us directly.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold">Prefer to call?</p>
                <a href={SITE.phoneHref} className="text-muted underline-offset-4 hover:text-accent hover:underline">
                  {SITE.phone}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="reveal lg:col-span-3">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-xl sm:p-8">
            {status === 'success' ? (
              <div className="py-10 text-center" role="status">
                <CircleCheck size={56} className="mx-auto text-green-600" aria-hidden="true" />
                <h3 className="mt-4 font-display text-3xl font-bold">Shukriya!</h3>
                <p className="mx-auto mt-2 max-w-sm text-muted">
                  Your request has been received. We&rsquo;ll confirm your table shortly on the phone number you shared.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6">
                  Make another booking
                </button>
              </div>
            ) : (
              <form
                name="reservation"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="grid gap-5 sm:grid-cols-2"
              >
                <input type="hidden" name="form-name" value="reservation" />
                <p className="hidden">
                  <label>
                    Don&rsquo;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="sm:col-span-2">
                  <label htmlFor="r-name" className="field-label">Full name *</label>
                  <input id="r-name" name="name" type="text" required autoComplete="name" placeholder="e.g. Aditi Sharma" className="field" />
                </div>

                <div>
                  <label htmlFor="r-phone" className="field-label">Phone *</label>
                  <input
                    id="r-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$"
                    title="Enter a valid 10-digit Indian mobile number"
                    placeholder="98765 43210"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="r-email" className="field-label">Email</label>
                  <input id="r-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="field" />
                </div>

                <div>
                  <label htmlFor="r-date" className="field-label">Date *</label>
                  <input id="r-date" name="date" type="date" required min={todayISO()} className="field" />
                </div>

                <div>
                  <label htmlFor="r-time" className="field-label">Time *</label>
                  <select id="r-time" name="time" required defaultValue="" className="field">
                    <option value="" disabled>Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="r-guests" className="field-label">Guests *</label>
                  <select id="r-guests" name="guests" required defaultValue="2" className="field">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>{g} {g === 1 ? 'guest' : 'guests'}</option>
                    ))}
                    <option value="10+">10+ guests</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="r-occasion" className="field-label">Occasion</label>
                  <select id="r-occasion" name="occasion" defaultValue="" className="field">
                    <option value="">None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business meal</option>
                    <option>Family gathering</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="r-message" className="field-label">Special requests</label>
                  <textarea id="r-message" name="message" rows={3} placeholder="Seating preference, allergies, cake arrangement..." className="field resize-y" />
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending...
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={18} aria-hidden="true" /> Request Reservation
                      </>
                    )}
                  </button>
                  <p aria-live="polite" className="mt-3 text-center text-sm">
                    {status === 'error' && (
                      <span className="text-red-500">
                        Something went wrong. Please try again or call us at {SITE.phone}.
                      </span>
                    )}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}