// Headless render verification for the workshop scene.
// Launches its own isolated Chromium; captures only that process.
// Uses CDP captureScreenshot to avoid Playwright's stability wait on a rAF loop.
import { chromium } from '/opt/homebrew/lib/node_modules/playwright/index.mjs'
import fs from 'node:fs'

const URL = process.env.URL || 'http://localhost:5174'
const OUT = process.env.OUT || './verify'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
  ],
})

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

const errors = []
const warnings = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
  else if (m.type() === 'warning') warnings.push(m.text())
})
page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`))

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 45000 })
await page.waitForTimeout(6000)

const webgl = await page.evaluate(() => {
  const c = document.createElement('canvas')
  const gl = c.getContext('webgl2') || c.getContext('webgl')
  if (!gl) return { ok: false }
  const dbg = gl.getExtension('WEBGL_debug_renderer_info')
  return {
    ok: true,
    version: gl.getParameter(gl.VERSION),
    renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
  }
})

const dom = await page.evaluate(() => ({
  canvases: Array.from(document.querySelectorAll('canvas')).map((c) => ({
    pw: c.width, ph: c.height, cw: c.clientWidth, ch: c.clientHeight,
  })),
  rootChildren: document.getElementById('root')?.children.length ?? -1,
  bodyBg: getComputedStyle(document.body).backgroundColor,
  hudPresent: !!document.querySelector('.hud'),
  title: document.querySelector('.hud-title')?.textContent ?? null,
}))

// CDP screenshot: bypasses Playwright's "wait for stable" logic
const cdp = await ctx.newCDPSession(page)

async function shot(name) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  const buf = Buffer.from(data, 'base64')
  fs.writeFileSync(`${OUT}/${name}.png`, buf)
  return buf.length
}

// Decode PNG stats to detect all-black frames
function pngStats(buf) {
  // crude: count distinct-ish bytes in the compressed stream is not enough.
  // Instead, sample the raw PNG via a canvas-free heuristic: PNG size.
  return { bytes: buf.length }
}

const sizes = []
sizes.push(['beat-01-establish', await shot('beat-01-establish')])

const beats = ['approach', 'reveal', 'participate', 'scale', 'resolve']
const BEAT_TITLES = [
  'A room with samples.', 'Focus on the glass.', 'Light passes through.',
  'One control. Every material.', 'Inside the token.', 'Your configuration.',
]

// Poll until the HUD title matches the expected beat, so SwiftShader's slow
// software-GL scrub animation has visibly caught up before capture.
async function waitForBeat(title, timeoutMs = 12000) {
  const deadline = Date.now() + timeoutMs
  let last = null
  while (Date.now() < deadline) {
    last = await page.evaluate(() => document.querySelector('.hud-title')?.textContent ?? null)
    if (last === title) return true
    await page.waitForTimeout(400)
  }
  console.error(`WARN: beat title never matched "${title}" (last: "${last}")`)
  return false
}

for (let i = 0; i < beats.length; i++) {
  await page.evaluate((idx) => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    // Scroll to just inside the beat: CameraRig sets t=0 at local=0, so the
    // camera sits exactly at this beat's preset (it blends toward the next
    // preset as local grows, so mid-beat captures catch transitional views).
    window.scrollTo({ top: (total * (idx + 0.05)) / 6, behavior: 'instant' })
  }, i + 1)
  await waitForBeat(BEAT_TITLES[i + 1])
  await page.waitForTimeout(800)
  sizes.push([`beat-0${i + 2}-${beats[i]}`, await shot(`beat-0${i + 2}-${beats[i]}`)])
}

console.log('RESULT_JSON', JSON.stringify({
  webgl,
  dom,
  errors: errors.slice(0, 15),
  warnings: warnings.slice(0, 8),
  screenshots: sizes,
}, null, 2))

await browser.close()
