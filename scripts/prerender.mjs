/* ====================================================================
 * Build-time prerender (SSG) via headless Chrome.
 *
 * Why a headless BROWSER and not Node SSR: the app is framer-motion-heavy
 * and reads `window` (useScroll/parallax). Rendering in a real browser
 * sidesteps all "window is undefined" SSR breakage.
 *
 * Flow: serve dist/ with `vite preview` → load it in Chrome → scroll the
 * whole page to trip every `whileInView` reveal → wait for the hero
 * entrance to settle → snapshot the fully-rendered DOM → overwrite
 * dist/index.html. The raw HTML now contains all headings/copy, the
 * JSON-LD <script>, and the static <head> meta — visible to every crawler,
 * including those that don't run JS.
 *
 * Requires a Chrome/Chromium binary. Override with PUPPETEER_EXECUTABLE_PATH.
 * ==================================================================== */
import { spawn } from 'node:child_process'
import { writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import puppeteer from 'puppeteer-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 4317
const URL = `http://localhost:${PORT}/`

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  return candidates.find((p) => existsSync(p))
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForServer(timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(URL)
      if (res.ok) return
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error(`vite preview did not start on ${URL}`)
}

async function main() {
  const executablePath = findChrome()
  if (!executablePath) {
    throw new Error(
      'No Chrome/Chromium found. Set PUPPETEER_EXECUTABLE_PATH to a Chrome binary and re-run.',
    )
  }

  // Serve the freshly built dist/.
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: 'ignore',
  })

  let browser
  try {
    await waitForServer()
    browser = await puppeteer.launch({
      executablePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 900 })
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })

    // Scroll through the page so every `whileInView` section reveals,
    // then return to top.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 250))
      }
      window.scrollTo(0, 0)
    })

    // Let the hero entrance (longest delay ~2.2s) settle to opacity:1.
    await sleep(3500)

    const html = await page.content()
    writeFileSync(resolve(root, 'dist/index.html'), html)
    console.log('✓ prerendered dist/index.html (' + html.length + ' bytes)')
  } finally {
    if (browser) await browser.close()
    server.kill('SIGTERM')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
