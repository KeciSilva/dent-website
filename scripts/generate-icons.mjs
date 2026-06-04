/* ====================================================================
 * Generates the favicon / PWA icon set and a branded OG cover image
 * from the SVG brand mark (public/favicons/icon.svg), using sharp.
 *
 * Outputs:
 *   public/favicons/icon-192.png
 *   public/favicons/icon-512.png
 *   public/favicons/icon-512-maskable.png   (extra safe-zone padding)
 *   public/favicons/apple-touch-icon.png    (180×180, opaque bg)
 *   public/favicon.ico                       (32 + 48)
 *   public/og/og-cover-1200x630.jpg          (social share cover)
 *
 * Run: node scripts/generate-icons.mjs  (also runs as part of `prebuild`)
 * TODO(launch): replace the auto-generated OG cover with designed art.
 * ==================================================================== */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FAV = resolve(root, 'public/favicons')
const OG = resolve(root, 'public/og')
mkdirSync(FAV, { recursive: true })
mkdirSync(OG, { recursive: true })

const ESPRESSO = '#0E3B40'
const CREAM = '#E6F5F7'

const iconSvg = readFileSync(resolve(FAV, 'icon.svg'))

// Maskable icon: same mark but shrunk into the inner 80% safe zone.
const maskableSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${ESPRESSO}"/>
  <g stroke="${CREAM}" stroke-width="36" stroke-linecap="round">
    <line x1="256" y1="186" x2="256" y2="326"/>
    <line x1="186" y1="256" x2="326" y2="256"/>
  </g>
</svg>`)

// Branded 1200×630 OG cover.
const ogSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="18%" cy="22%" r="60%">
      <stop offset="0%" stop-color="#1BA8B5" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1BA8B5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="86%" cy="88%" r="60%">
      <stop offset="0%" stop-color="#60CEDB" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#60CEDB" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${ESPRESSO}"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g stroke="${CREAM}" stroke-width="9" stroke-linecap="round" opacity="0.95" transform="translate(600,150)">
    <line x1="0" y1="-34" x2="0" y2="34"/>
    <line x1="-34" y1="0" x2="34" y2="0"/>
  </g>
  <text x="600" y="330" text-anchor="middle" fill="${CREAM}"
    font-family="Manrope, Arial, sans-serif" font-size="78" font-weight="800"
    letter-spacing="2">VALOIS ORAL WELLNESS</text>
  <text x="600" y="400" text-anchor="middle" fill="#9FD7DE"
    font-family="Inter, Arial, sans-serif" font-size="34" font-weight="400"
    letter-spacing="6">THE ARCHITECTURE OF A SMILE</text>
  <text x="600" y="500" text-anchor="middle" fill="#7FBFC8"
    font-family="Inter, Arial, sans-serif" font-size="26" letter-spacing="10">GENEVA · DUBAI · NEW YORK</text>
</svg>`)

async function main() {
  await sharp(iconSvg).resize(192, 192).png().toFile(resolve(FAV, 'icon-192.png'))
  await sharp(iconSvg).resize(512, 512).png().toFile(resolve(FAV, 'icon-512.png'))
  await sharp(maskableSvg).resize(512, 512).png().toFile(resolve(FAV, 'icon-512-maskable.png'))
  await sharp(iconSvg)
    .resize(180, 180)
    .flatten({ background: ESPRESSO })
    .png()
    .toFile(resolve(FAV, 'apple-touch-icon.png'))

  // favicon.ico from 32 + 48 px PNG buffers.
  const ico32 = await sharp(iconSvg).resize(32, 32).png().toBuffer()
  const ico48 = await sharp(iconSvg).resize(48, 48).png().toBuffer()
  writeFileSync(resolve(root, 'public/favicon.ico'), await pngToIco([ico32, ico48]))

  await sharp(ogSvg).jpeg({ quality: 82, mozjpeg: true }).toFile(resolve(OG, 'og-cover-1200x630.jpg'))

  console.log('✓ icons + OG cover generated')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
