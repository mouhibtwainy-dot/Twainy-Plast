// Generates cinematic particle visuals (3840×2160 PNG) in Twainy Plast colours for the story slides.
// Usage: node deck/visuals/render-visuals.mjs   (needs `playwright`; CHROMIUM=/path/to/chromium for a local build)
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = join(dirname(fileURLToPath(import.meta.url)), 'png')
mkdirSync(out, { recursive: true })

// Everything below runs inside the browser page and draws on a <canvas>
const pageScript = `
const W = 3840, H = 2160
const PALETTE = {
  leaf: [76, 175, 80], mint: [140, 220, 150], green: [46, 125, 58],
  red: [214, 58, 20], gold: [232, 176, 75], white: [235, 245, 238],
}
let seed = 7
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
const pick = (weights) => { let r = rnd(), acc = 0; for (const [k, w] of weights) { acc += w; if (r <= acc) return PALETTE[k] } return PALETTE.white }
const noise = (x, y, z) => Math.sin(x * 1.9 + Math.sin(y * 2.7)) * Math.cos(z * 1.6 + Math.sin(x * 1.3)) + 0.5 * Math.sin(y * 3.1 + z * 2.2)

function background(ctx, cx, cy) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.75)
  g.addColorStop(0, '#10281A'); g.addColorStop(0.45, '#08160E'); g.addColorStop(1, '#030806')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
}

function rotate(p, ax, ay) {
  let { x, y, z } = p
  let c = Math.cos(ay), s = Math.sin(ay); [x, z] = [x * c + z * s, -x * s + z * c]
  c = Math.cos(ax); s = Math.sin(ax); [y, z] = [y * c - z * s, y * s + z * c]
  return { ...p, x, y, z }
}

function drawParticles(ctx, pts, { cx, cy, scale, ax = 0.35, ay = 0.6, f = 3.2 }) {
  const proj = pts.map((p) => rotate(p, ax, ay)).map((p) => {
    const k = f / (f + p.z)
    return { ...p, sx: cx + p.x * scale * k, sy: cy + p.y * scale * k, k, depth: (p.z + 1.4) / 2.8 }
  }).sort((a, b) => b.z - a.z)
  // draw every particle onto an offscreen layer, then blur that layer once for the glow
  const layer = document.createElement('canvas'); layer.width = W; layer.height = H
  const lc = layer.getContext('2d')
  for (const p of proj) {
    const near = 1 - Math.min(1, Math.max(0, p.depth))
    const alpha = 0.9 * (0.25 + 0.75 * near)
    const size = p.size * p.k
    const [r, g, b] = p.color
    lc.beginPath()
    for (let i = 0; i < 3; i++) {
      const a = p.rot + (i * Math.PI * 2) / 3
      const x = p.sx + Math.cos(a) * size, y = p.sy + Math.sin(a) * size
      i ? lc.lineTo(x, y) : lc.moveTo(x, y)
    }
    lc.closePath()
    const col = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')'
    if (p.outline) { lc.strokeStyle = col; lc.lineWidth = 2.2; lc.stroke() } else { lc.fillStyle = col; lc.fill() }
  }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.filter = 'blur(14px)'; ctx.globalAlpha = 0.7; ctx.drawImage(layer, 0, 0); ctx.restore()
  ctx.drawImage(layer, 0, 0)
}

function floaters(ctx, n, opts = {}) {
  // big wireframe triangles drifting in the dark, like the reference
  for (let i = 0; i < n; i++) {
    const x = rnd() * W, y = rnd() * H
    if (opts.avoid && Math.hypot(x - opts.avoid[0], y - opts.avoid[1]) < opts.avoid[2]) continue
    const s = 18 + rnd() * (opts.max || 70), rot = rnd() * 6.28
    const [r, g, b] = pick([['mint', 0.45], ['white', 0.25], ['gold', 0.2], ['red', 0.1]])
    ctx.beginPath()
    for (let k = 0; k < 3; k++) { const a = rot + (k * Math.PI * 2) / 3; const px = x + Math.cos(a) * s, py = y + Math.sin(a) * s; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    ctx.closePath(); ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.12 + rnd() * 0.35) + ')'; ctx.lineWidth = 2 + rnd() * 2.5; ctx.stroke()
  }
}

function sphere(n, rough = 0.22) {
  const pts = []
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963
    let x = Math.cos(th) * r, z = Math.sin(th) * r
    const d = 1 + rough * noise(x * 2, y * 2, z * 2) + (rnd() - 0.5) * 0.06
    pts.push({ x: x * d, y: y * d, z: z * d, size: 5 + rnd() * 9, rot: rnd() * 6.28, outline: rnd() < 0.18,
      color: pick([['leaf', 0.28], ['mint', 0.2], ['gold', 0.2], ['white', 0.17], ['red', 0.15]]) })
  }
  return pts
}

function drop(n) {
  // water-drop surface of revolution: radius = sin t · sin(t/2)^1.4, height = cos t
  const pts = []
  for (let i = 0; i < n; i++) {
    const t = Math.acos(1 - 2 * rnd()), a = rnd() * 6.28
    const r = Math.sin(t) * Math.pow(Math.sin(t / 2), 1.4) * 0.95
    const y = -Math.cos(t) * 1.15 + 0.15
    const j = 1 + (rnd() - 0.5) * 0.05
    pts.push({ x: Math.cos(a) * r * j, y: y * j, z: Math.sin(a) * r * j, size: 4 + rnd() * 8, rot: rnd() * 6.28, outline: rnd() < 0.15,
      color: pick([['mint', 0.3], ['leaf', 0.3], ['white', 0.2], ['gold', 0.1], ['red', 0.1]]) })
  }
  return pts
}

function wave(n) {
  // flowing ribbon of particles, like water in motion
  const pts = []
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 - 1, v = rnd() * 2 - 1
    const x = u * 2.2, z = v * 0.9
    const y = 0.35 * Math.sin(u * 3.2 + v * 1.4) + 0.18 * Math.cos(u * 6 - v * 2) + (rnd() - 0.5) * 0.05
    pts.push({ x, y, z, size: 4 + rnd() * 8, rot: rnd() * 6.28, outline: rnd() < 0.15,
      color: pick([['leaf', 0.3], ['mint', 0.25], ['gold', 0.2], ['white', 0.15], ['red', 0.1]]) })
  }
  return pts
}

function scatter(n) {
  const pts = []
  for (let i = 0; i < n; i++) {
    pts.push({ x: (rnd() * 2 - 1) * 2.6, y: (rnd() * 2 - 1) * 1.5, z: (rnd() * 2 - 1) * 1.2, size: 4 + rnd() * 10, rot: rnd() * 6.28, outline: rnd() < 0.35,
      color: pick([['mint', 0.3], ['white', 0.25], ['gold', 0.2], ['leaf', 0.15], ['red', 0.1]]) })
  }
  return pts
}

window.render = (kind) => {
  seed = { sphere: 7, scatter: 11, drop: 23, wave: 31, field: 41, sphereLeft: 53 }[kind] || 7
  const c = document.getElementById('c'), ctx = c.getContext('2d')
  ctx.clearRect(0, 0, W, H)
  if (kind === 'sphere') { background(ctx, W * 0.68, H * 0.5); floaters(ctx, 70, { avoid: [W * 0.68, H * 0.5, 900] }); drawParticles(ctx, sphere(6000, 0.11), { cx: W * 0.68, cy: H * 0.5, scale: 760 }) }
  if (kind === 'sphereLeft') { background(ctx, W * 0.3, H * 0.5); floaters(ctx, 70, { avoid: [W * 0.3, H * 0.5, 900] }); drawParticles(ctx, sphere(6000, 0.13), { cx: W * 0.3, cy: H * 0.5, scale: 720, ay: 1.4 }) }
  if (kind === 'scatter') { background(ctx, W * 0.5, H * 0.5); floaters(ctx, 140, { max: 90 }); drawParticles(ctx, scatter(2600), { cx: W * 0.5, cy: H * 0.5, scale: 900, ax: 0.2, ay: 0.3 }) }
  if (kind === 'drop') { background(ctx, W * 0.7, H * 0.5); floaters(ctx, 60, { avoid: [W * 0.7, H * 0.5, 900] }); drawParticles(ctx, drop(5600), { cx: W * 0.7, cy: H * 0.5, scale: 820, ax: 0.15, ay: 0.4 }) }
  if (kind === 'wave') { background(ctx, W * 0.5, H * 0.62); floaters(ctx, 60); drawParticles(ctx, wave(7000), { cx: W * 0.55, cy: H * 0.68, scale: 950, ax: 0.42, ay: -0.25 }) }
  if (kind === 'field') { background(ctx, W * 0.5, H * 0.45); floaters(ctx, 120, { max: 60 }); drawParticles(ctx, scatter(1500), { cx: W * 0.5, cy: H * 0.5, scale: 1000, ax: 0.1, ay: 0.2 }) }
}
`

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
await page.setContent(`<html><body style="margin:0;background:#000"><canvas id="c" width="3840" height="2160" style="width:1920px;height:1080px"></canvas><script>${pageScript}</script></body></html>`)
for (const kind of ['sphere', 'sphereLeft', 'scatter', 'drop', 'wave', 'field']) {
  await page.evaluate((k) => window.render(k), kind)
  const data = await page.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.92))
  const { writeFileSync } = await import('node:fs')
  writeFileSync(join(out, `${kind}.jpg`), Buffer.from(data.split(',')[1], 'base64'))
  console.log('rendered', kind)
}
await browser.close()
