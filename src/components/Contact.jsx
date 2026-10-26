import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { SITE } from '../data/site'
import SectionHeading from './SectionHeading'

const q = encodeURIComponent(SITE.mapQuery)
const MAP_EMBED = `https://www.google.com/maps?q=${q}&output=embed`
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${q}`

export default function Contact() {
  const cards = [
    {
      icon: MapPin,
      title: 'Address',
      body: (
        <>
          {SITE.address.line1}, {SITE.address.line2}
          <br />
          {SITE.address.state} {SITE.address.pin}
        </>
      ),
    },
    { icon: Phone, title: 'Phone', body: <a href={SITE.phoneHref} className="hover:text-accent">{SITE.phone}</a> },
    { icon: Mail, title: 'Email', body: <a href={`mailto:${SITE.email}`} className="break-all hover:text-accent">{SITE.email}</a> },
    {
      icon: Clock,
      title: 'Hours',
      body: SITE.hours.map((h) => (
        <span key={h.days} className="block">{h.days}: {h.time}</span>
      )),
    },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Visit Us"
          title="Find Your Way to Zafraan"
          subtitle="A short walk from Hazratganj market, with valet parking available every evening."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="reveal grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {cards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-line bg-bg p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-500/10 text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="text-sm">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{body}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row lg:col-span-1">
              <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
                <Navigation size={16} aria-hidden="true" /> Get Directions
              </a>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-line lg:col-span-3">
            <iframe
              title="Map showing Zafraan restaurant location in Hazratganj, Lucknow"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full border-0 sm:h-96 lg:h-full lg:min-h-[28rem] dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}