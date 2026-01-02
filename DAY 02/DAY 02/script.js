// script.js
// ==================== FIXED PRELOADER ====================
const preloader = document.getElementById('preloader');
const progressBar = document.querySelector('.preloader__progress-bar');
const preloaderText = document.querySelector('.preloader__text');

// Simulate loading progress - FIXED: Changed === to >=
let progress = 0;
const loadingInterval = setInterval(() => {
  progress += Math.random() * 15;
  
  // FIXED: Ensure we cap at 100 and use >= instead of ===
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
    setTimeout(hidePreloader, 500);
  }
  
  progressBar.style.width = `${progress}%`;
  
  // Update text based on progress
  if (progress < 30) {
    preloaderText.textContent = 'Summoning dragons...';
  } else if (progress < 60) {
    preloaderText.textContent = 'Igniting flames...';
  } else if (progress < 90) {
    preloaderText.textContent = 'Sharpening claws...';
  } else {
    preloaderText.textContent = 'Dragons awakened!';
  }
}, 200);

function hidePreloader() {
  preloader.classList.add('preloader--hidden');
  
  // Initialize main content after preloader
  setTimeout(() => {
    initMainContent();
  }, 300);
}

// ==================== Main Content Initialization ====================
function initMainContent() {
  const $cont = document.querySelector('.cont');
  const $els = [...document.querySelectorAll('.el')];
  const $closeBtns = [...document.querySelectorAll('.el__close-btn')];
  
  // Remove inactive state with staggered animation
  $cont.classList.remove('s--inactive');
  
  // Animate panels in with stagger
  gsap.fromTo($els, 
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      onComplete: () => {
        // Enable interactions after animation
        $els.forEach($el => $el.style.pointerEvents = 'auto');
      }
    }
  );
  
  // Open panel handler
  $els.forEach(($el, index) => {
    $el.addEventListener('click', function() {
      if (this.classList.contains('s--active')) return;
      
      // Deactivate all panels
      $els.forEach(el => el.classList.remove('s--active'));
      
      // Activate clicked panel
      $cont.classList.add('s--el-active');
      this.classList.add('s--active');
      
      // Animate content in
      const contentInner = this.querySelector('.el__content-inner');
      gsap.fromTo(contentInner.children, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
      
      // Prevent body scroll on mobile
      if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close panel handler
  $closeBtns.forEach($btn => {
    $btn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const activeEl = document.querySelector('.el.s--active');
      if (activeEl) {
        // Animate out before removing class
        const contentInner = activeEl.querySelector('.el__content-inner');
        gsap.to(contentInner.children, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            activeEl.classList.remove('s--active');
            $cont.classList.remove('s--el-active');
            document.body.style.overflow = '';
          }
        });
      }
    });
  });
  
  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeEl = document.querySelector('.el.s--active');
      if (activeEl) {
        const contentInner = activeEl.querySelector('.el__content-inner');
        gsap.to(contentInner.children, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            activeEl.classList.remove('s--active');
            $cont.classList.remove('s--el-active');
            document.body.style.overflow = '';
          }
        });
      }
    }
  });
  
  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeEl = document.querySelector('.el.s--active');
      if (activeEl && window.innerWidth > 768) {
        const contentInner = activeEl.querySelector('.el__content-inner');
        gsap.to(contentInner.children, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            activeEl.classList.remove('s--active');
            $cont.classList.remove('s--el-active');
            document.body.style.overflow = '';
          }
        });
      }
    }, 250);
  });
  
  // Mouse parallax effect for desktop
  if (window.innerWidth > 1024) {
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      $els.forEach(($el, index) => {
        const speed = 1 - (index * 0.1);
        gsap.to($el.querySelector('.el__bg'), {
          x: x * speed,
          y: y * speed,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    });
  }
}

// ==================== Background Canvas Animation ====================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system
const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.3 + 0.05;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(174, 35, 35, ${this.opacity})`;
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animation loop
function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(174, 35, 35, ${0.1 * (1 - distance / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });
  
  requestAnimationFrame(animateCanvas);
}

// Start canvas animation after preloader
setTimeout(() => {
  animateCanvas();
}, 1500);

// ==================== Fallback for slow connections ====================
// Force hide preloader after 10 seconds maximum
setTimeout(() => {
  if (!preloader.classList.contains('preloader--hidden')) {
    console.warn('Preloader timeout - forcing initialization');
    hidePreloader();
  }
}, 10000);