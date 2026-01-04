// =======================
// 1) DATA + MAPPING LAYER
// =======================
const state = {
  // valores crudos
  tempC: 20,
  windKmh: 0,
  cloudPct: 0,

  // valores normalizados (0..1)
  t: 0, // temp
  w: 0, // wind
  c: 0, // clouds

  lastUpdate: 0,
};

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, t) => a + (b - a) * t;

// Open-Meteo: sin API key y normalmente CORS-friendly
async function fetchWeather(lat = 18.92, lon = -99.23) { // ajusta coords
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,wind_speed_10m,cloud_cover` +
      `&timezone=auto`;

    const res = await fetch(url);
    const json = await res.json();

    const cur = json.current;
    state.tempC = cur.temperature_2m;
    state.windKmh = cur.wind_speed_10m;
    state.cloudPct = cur.cloud_cover;
    state.lastUpdate = Date.now();
  } catch (err) {
    console.warn("fetchWeather failed:", err);
  }
}

// dispara y refresca cada minuto
fetchWeather();
setInterval(fetchWeather, 60_000);

// suaviza cada 50ms para evitar “saltos” visuales
setInterval(() => {
  const tTarget = clamp01((state.tempC - 0) / 40);      // 0..40°C -> 0..1
  const wTarget = clamp01(state.windKmh / 60);          // 0..60 km/h -> 0..1
  const cTarget = clamp01(state.cloudPct / 100);        // 0..100% -> 0..1

  state.t = lerp(state.t, tTarget, 0.05);
  state.w = lerp(state.w, wTarget, 0.05);
  state.c = lerp(state.c, cTarget, 0.05);
}, 50);


// =======================
// 2) VISUAL LAYER (HYDRA)
// =======================

osc(
  () => 15 + state.w * 90,      // frecuencia: viento
  0.02,
  () => 0.6 + state.c * 1.6     // “color offset”: nubes
)
  .modulate(
    noise(() => 1 + state.w * 6, 0.2),
    () => 0.05 + state.c * 0.35
  )
  .color(
    () => 0.2 + state.t * 1.8,  // temp -> rojo
    () => 0.3 + state.c * 0.7,  // nubes -> verde/neutral
    () => 1.1 - state.t * 0.8   // temp -> baja azul
  )
  .rotate(() => state.t * 0.35)
  .scale(() => 1 + state.w * 0.12)
  .contrast(() => 1.05 + state.c * 0.6)
  .out(o0);
