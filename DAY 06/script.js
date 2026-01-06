const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ---
let sticky = document.getElementById("sticky");
let sticky2 = document.getElementById("sticky2");
let scroll_down_progress = 0;

lenis.on('scroll', (e) => {
  scroll_down_progress = ((document.documentElement.scrollTop / ( e.dimensions.scrollHeight - e.dimensions.height ) ) * 100).toFixed(1);
  sticky.style.top = `${scroll_down_progress}%`
  sticky2.style.top = `${scroll_down_progress}%`
})