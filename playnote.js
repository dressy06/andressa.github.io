// estado global — COMEÇA LIGADO
let soundEnabled = true;

// contexto de áudio
const ctx = new (window.AudioContext || window.webkitAudioContext)();

// escala
const scale = [
  523.25, 587.33, 659.25,
  783.99, 880,
  1046.5, 1174.66, 1318.51
];

let lastEl = null;

// tocar nota
function play(freq) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const fl = ctx.createBiquadFilter();

  o.type = "sine";
  o.frequency.value = freq;

  fl.type = "lowpass";
  fl.frequency.value = 3000;
  fl.Q.value = 8;

  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

  o.connect(fl);
  fl.connect(g);
  g.connect(ctx.destination);

  o.start(ctx.currentTime);
  o.stop(ctx.currentTime + 0.4);
}

// acordar áudio no primeiro gesto
document.addEventListener(
  "mouseover",
  () => {
    if (ctx.state === "suspended") ctx.resume();
  },
  { once: true }
);

// hover sonoro
document.addEventListener("mouseover", (e) => {
  if (!soundEnabled) return;

  const el = e.target;
  if (el !== lastEl) {
    lastEl = el;

    const r = el.getBoundingClientRect();
    const pct = r.top / window.innerHeight;
    const idx = Math.floor(pct * scale.length) % scale.length;

    play(scale[idx]);
  }
});

// botão de áudio (APENAS VISUAL + ESTADO)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("audioControl");
  if (!btn) return;

  // estado inicial correto
  btn.classList.remove("muted");
  document.body.style.cursor = "crosshair";

  btn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      btn.classList.remove("muted");
      document.body.style.cursor = "crosshair";
    } else {
      btn.classList.add("muted");
      document.body.style.cursor = "";
    }
  });
});
