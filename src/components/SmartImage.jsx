import { useState } from 'react'

export default function SmartImage({ src, alt, width, height, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`relative grid place-items-center overflow-hidden bg-linear-to-br from-surface-2 via-surface to-surface-2 ${className}`}
      >
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,var(--color-gold-500),transparent_55%)]" />
        <span className="relative px-6 text-center font-display text-lg text-muted italic">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}