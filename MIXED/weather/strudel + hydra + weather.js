// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @title STRUDEL + HYDRA + P5 + WEATHER ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @by Mario D. Quiroz ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// Minimal integration:
// - Keep your exact Strudel/P5/Hydra structure.
// - Add ONLY: 1 global WX object + 1 fetch + 1 interval.
// - Use WX values inside P5 text and Hydra params.
// - No extra helper functions, no canvas/webgl changes, no extra loops.

// ---------- STRUDEL ----------
let PTN_MUSIC = "3 4 5 [6 7]*2"
MUSIC: n(PTN_MUSIC).scale('c3:minor').fast(1).sound('piano').lpf(1000)

// ---------- WEATHER (minimal) ----------
// Durango lat/lon
window.WX = window.WX || { t: 0, w: 0, c: 0, tempC: 0, windKmh: 0, cloudPct: 0, age: 999, ok: 0 }

// one fetch function (kept inline style, no template strings)
window.WX.fetch = window.WX.fetch || function () {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=24.0135909' +
    '&longitude=-104.7087216' +
    '&current=temperature_2m,wind_speed_10m,cloud_cover' +
    '&timezone=auto'

  return fetch(url)
    .then((r) => r.json())
    .then((j) => {
      const cur = j && j.current
      if (!cur) return

      window.WX.tempC = cur.temperature_2m
      window.WX.windKmh = cur.wind_speed_10m
      window.WX.cloudPct = cur.cloud_cover

      // minimal normalization (no helpers)
      window.WX.t = Math.max(0, Math.min(1, window.WX.tempC / 40))
      window.WX.w = Math.max(0, Math.min(1, window.WX.windKmh / 60))
      window.WX.c = Math.max(0, Math.min(1, window.WX.cloudPct / 100))

      window.WX.ok = 1
      window.WX.ts = Date.now()
    })
    .catch(() => {
      window.WX.ok = 0
    })
}

// prevent multiple intervals on re-run
if (window.WX.timer) clearInterval(window.WX.timer)
window.WX.fetch()
window.WX.timer = setInterval(() => window.WX.fetch(), 60000)

// ---------- P5 ----------
const { mountP5, hydraGate } = await import(
  'https://cdn.jsdelivr.net/gh/darkmarthur/LiveCoding@v1.1.1/utils/strudel-p5.mjs'
)

const api = await mountP5({
  webgl: true,

  setup(p, { g, size }) {
    g.noStroke()
    g.rectMode(g.CENTER)

    const { w, h } = size
    g.SQ = {
      x: 0,
      y: 0,
      s: Math.min(w, h) * 0.12,
      colorIdx: 0,
      colors: [
        [255, 200, 200],
        [200, 255, 200],
        [200, 200, 255],
        [255, 240, 180],
        [240, 180, 255],
      ],
      downPrev: false,
    }
  },

  draw(p, { g, size, pointer }) {
    const { w, h } = size
    if (!w || !h) return

    // background trail
    g.resetMatrix()
    g.rectMode(g.CORNER)
    g.fill(0, 24)
    g.rect(-w / 2, -h / 2, w, h)

    // your square
    const t = p.millis() * 0.001
    const amp = w * 0.3
    const baseX = Math.sin(t) * amp
    const baseY = 0

    const cx = pointer.inside ? pointer.x - w / 2 : baseX
    const cy = pointer.inside ? pointer.y - h / 2 : baseY

    const SQ = g.SQ
    const followRadius = Math.max(w, h) * 0.25
    const dx = cx - SQ.x
    const dy = cy - SQ.y
    const dist = Math.hypot(dx, dy)

    const targetX = pointer.inside && dist < followRadius ? cx : baseX
    const targetY = pointer.inside && dist < followRadius ? cy : baseY

    const ease = 0.12
    SQ.x += (targetX - SQ.x) * ease
    SQ.y += (targetY - SQ.y) * ease

    if (pointer.down && !SQ.downPrev) {
      SQ.colorIdx = (SQ.colorIdx + 1) % SQ.colors.length
    }
    SQ.downPrev = pointer.down

    const col = SQ.colors[SQ.colorIdx]
    g.rectMode(g.CENTER)
    g.fill(col[0], col[1], col[2], 210)
    g.push()
    g.translate(SQ.x, SQ.y, 0)
    g.rect(0, 0, SQ.s, SQ.s)
    g.pop()

    // ---- WEATHER TEXT (minimal, uses same g) ----
    // Compute age (no timers needed)
    const ts = window.WX.ts || 0
    const age = ts ? ((Date.now() - ts) / 1000) : 999
    window.WX.age = age

    // Draw in screen space (top-left)
    g.push()
    g.resetMatrix()
    g.translate(-w / 2, -h / 2, 0)

    g.noStroke()
    g.fill(0, 140)
    g.rect(18, 18, 420, 120, 12)

    g.fill(255, 220)
    g.textSize(18)
    g.text('WEATHER -> HYDRA', 32, 42)

    g.textSize(14)
    g.text('TEMP:  ' + (window.WX.tempC || 0).toFixed(1) + ' C   t=' + (window.WX.t || 0).toFixed(2), 32, 68)
    g.text('WIND:  ' + (window.WX.windKmh || 0).toFixed(1) + ' km/h w=' + (window.WX.w || 0).toFixed(2), 32, 88)
    g.text('CLOUD: ' + (window.WX.cloudPct || 0).toFixed(0) + ' %   c=' + (window.WX.c || 0).toFixed(2), 32, 108)
    g.text('AGE: ' + age.toFixed(0) + 's  ' + (window.WX.ok ? 'ok' : 'err'), 32, 128)

    g.pop()
  },
})

// ---------- HYDRA ----------
await initHydra()
await hydraGate({ sourceIndex: 0 }) // required
window.P5VIS = { on: 1 } // optional

// Make Hydra respond to weather with minimal changes:
// - osc freq reacts to wind (w)
// - drift reacts to clouds (c)
// - color offset reacts to temp (t)
const oscLayer =
  osc(
    () => 12 + (window.WX.w || 0) * 40,
    () => 0.03 + (window.WX.c || 0) * 0.08,
    () => 0.3 + (window.WX.t || 0) * 0.9
  )
  .color(H(PTN_MUSIC))

// GLOBAL MIXER (same structure you had)
src(s0)
  .blend(solid(0, 0, 0), () => 1 - window.P5VIS.on)
  .blend(oscLayer, 0.5)
  .contrast(1.1)
  .brightness(0.02)
  .out(o0)
