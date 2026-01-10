/* ---------- CONFIG ---------- */
const TOTAL_FRAMES = 1000;
const FRAME_URL    = i => `assets/frame_${String(i).padStart(4,'0')}.jpeg`;

const canvas = document.getElementById('video-canvas');
const ctx    = canvas.getContext('2d');
const frames = [];

/* 1.  load every image, count successes -------------------- */
let loaded = 0;
for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const img = new Image();
  img.onload = function () {
    loaded++;
    if (loaded === TOTAL_FRAMES) onAllLoaded();
  };
  img.onerror = () => console.error('Missing: ' + FRAME_URL(i));
  img.src = FRAME_URL(i);
  frames.push(img);
}

/* 2.  resize & draw helpers -------------------------------- */
function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.scale(dpr, dpr);
}

function drawFrame(idx) {
  const img = frames[idx];
  if (!img?.complete) return;               // safety check
  const cw = canvas.width  / (window.devicePixelRatio || 1);
  const ch = canvas.height / (window.devicePixelRatio || 1);

  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth  * scale;
  const sh = img.naturalHeight * scale;
  const dx = (cw - sw) / 2;
  const dy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, sw, sh);
}

/* 3.  initialise GSAP after all images --------------------- */
function onAllLoaded() {
  resize();
  drawFrame(0);

  gsap.registerPlugin(ScrollTrigger);

  const obj = { frame: 0 };

  gsap.to(obj, {
    frame: TOTAL_FRAMES - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.video-scroll',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    onUpdate: () => drawFrame(Math.round(obj.frame))
  });
  /* 4-a.  GSAP text animation (parallax + fade) ---------------------------- */
gsap.to('.hero-text', {
  y: -70,               // float up while scrolling
  opacity: 0.1,         // fade out
  ease: 'none',
  scrollTrigger: {
    trigger: '.video-scroll',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});
}

window.addEventListener('resize', resize);