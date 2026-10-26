export default function VegMark({ veg, className = '' }) {
  const color = veg ? '#15803d' : '#92400e'
  const label = veg ? 'Vegetarian' : 'Non-vegetarian'
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`inline-grid size-4 shrink-0 place-items-center rounded-[3px] border-2 bg-white ${className}`}
      style={{ borderColor: color }}
    >
      {veg ? (
        <span className="size-1.5 rounded-full" style={{ background: color }} />
      ) : (
        <span className="h-1.5 w-2 [clip-path:polygon(50%_0,100%_100%,0_100%)]" style={{ background: color }} />
      )}
    </span>
  )
}