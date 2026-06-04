import manifest from './imageManifest.json'

/**
 * Responsive <picture> that serves AVIF → WebP → JPEG from the variants
 * produced by scripts/optimize-images.mjs (described in imageManifest.json).
 * Adds intrinsic width/height (no CLS) and lazy loading by default.
 *
 * Falls back to a plain <img> when the manifest has no entry for `src`
 * (e.g. during `npm run dev` before the optimizer has run).
 */
export default function Picture({
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  draggable,
  style,
}) {
  const entry = manifest[src]

  const imgCommon = {
    alt,
    className,
    loading,
    decoding,
    fetchPriority,
    draggable,
    style,
  }

  // No optimized variants yet → plain img on the original source.
  if (!entry) {
    return <img src={src} {...imgCommon} />
  }

  const srcset = (list) => list.map(([p, w]) => `${p} ${w}w`).join(', ')

  return (
    <picture>
      <source type="image/avif" srcSet={srcset(entry.formats.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(entry.formats.webp)} sizes={sizes} />
      <img
        src={entry.fallback}
        srcSet={srcset(entry.formats.jpg)}
        sizes={sizes}
        width={entry.width || undefined}
        height={entry.height || undefined}
        {...imgCommon}
      />
    </picture>
  )
}
