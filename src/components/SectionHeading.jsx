export default function SectionHeading({ id, eyebrow, title, subtitle, align = 'center' }) {
  const center = align === 'center'
  return (
    <div className={`reveal max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent uppercase ${
          center ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-current" aria-hidden="true" />}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl leading-tight font-bold sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 leading-relaxed text-muted">{subtitle}</p>}
    </div>
  )
}