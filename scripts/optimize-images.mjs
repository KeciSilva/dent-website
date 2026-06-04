/* ====================================================================
 * Generates responsive AVIF + WebP + JPEG variants for every bitmap in
 * public/images/, and writes src/seo/imageManifest.json describing them.
 *
 * The originals are 1.7–2.3 MB PNGs — the dominant page-weight / LCP cost.
 * Variants land in public/images/optimized/ as `<name>-<width>.<ext>`.
 * The <Picture> component (src/seo/Picture.jsx) reads the manifest to emit
 * <picture> with srcset/sizes + width/height (no CLS) + lazy loading.
 *
 * Run: node scripts/optimize-images.mjs   (also runs in `prebuild`)
 * ==================================================================== */
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, extname, basename } from 'node:path'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = resolve(root, 'public/images')
const OUT_DIR = resolve(SRC_DIR, 'optimized')
const MANIFEST = resolve(root, 'src/seo/imageManifest.json')

const WIDTHS = [640, 1024, 1600]
const exts = new Set(['.png', '.jpg', '.jpeg'])

mkdirSync(OUT_DIR, { recursive: true })

const files = readdirSync(SRC_DIR).filter((f) => exts.has(extname(f).toLowerCase()))
const manifest = {}

async function processFile(file) {
  const input = resolve(SRC_DIR, file)
  const name = basename(file, extname(file))
  const img = sharp(input)
  const meta = await img.metadata()
  const srcW = meta.width || WIDTHS[WIDTHS.length - 1]
  const srcH = meta.height || 0
  const aspect = srcH && srcW ? srcH / srcW : null

  // Only widths that don't upscale; always keep at least one.
  let widths = WIDTHS.filter((w) => w <= srcW)
  if (widths.length === 0) widths = [srcW]

  const formats = { avif: [], webp: [], jpg: [] }

  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true })
    const a = `optimized/${name}-${w}.avif`
    const wp = `optimized/${name}-${w}.webp`
    const j = `optimized/${name}-${w}.jpg`
    await base.clone().avif({ quality: 50 }).toFile(resolve(SRC_DIR, a))
    await base.clone().webp({ quality: 72 }).toFile(resolve(SRC_DIR, wp))
    await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(resolve(SRC_DIR, j))
    formats.avif.push([`/images/${a}`, w])
    formats.webp.push([`/images/${wp}`, w])
    formats.jpg.push([`/images/${j}`, w])
  }

  const maxJpg = formats.jpg[formats.jpg.length - 1][0]
  manifest[`/images/${file}`] = {
    width: srcW,
    height: srcH,
    aspect,
    formats,
    fallback: maxJpg,
  }
  console.log(`  ✓ ${file} → ${widths.join('/')}w × avif+webp+jpg`)
}

async function main() {
  console.log(`Optimizing ${files.length} images…`)
  for (const f of files) await processFile(f)
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))
  console.log(`✓ wrote ${MANIFEST}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
