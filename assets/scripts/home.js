/* ══════════════════════════════════════
   1. LOADER
══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ══════════════════════════════════════
   2. PARTICLES
══════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3 - 0.15;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.life  = 0;
      this.maxLife = Math.random() * 300 + 150;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
    }
    draw() {
      const progress = this.life / this.maxLife;
      const fade = progress < 0.1 ? progress / 0.1 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,158,255,${this.alpha * fade})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife; // stagger
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw faint connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(155,111,212,${0.08 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ══════════════════════════════════════
   3. SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings inside .links
      const delay = entry.target.closest('.links') ? 0 : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger link cards
reveals.forEach((el, i) => {
  if (el.classList.contains('link-card')) {
    el.style.transitionDelay = (i * 0) + 's'; // handled per card below
  }
  revealObs.observe(el);
});

// Stagger link cards individually
document.querySelectorAll('.link-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});

// Stagger photo cells
document.querySelectorAll('.photo-cell').forEach((cell, i) => {
  cell.style.opacity = '0';
  cell.style.transform = 'translateY(20px) scale(0.97)';
  cell.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`;
});

const gridObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.photo-cell').forEach(cell => {
        cell.style.opacity = '1';
        cell.style.transform = 'translateY(0) scale(1)';
      });
      gridObs.disconnect();
    }
  });
}, { threshold: 0.1 });
const grid = document.querySelector('.photo-grid');
if (grid) gridObs.observe(grid);

/* ══════════════════════════════════════
   4. COUNTER ANIMATION
══════════════════════════════════════ */
function animateCounter(el, target, suffix, duration = 1400) {
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.stats');
if (statsEl) statsObs.observe(statsEl);

/* ══════════════════════════════════════
   5. MAGNETIC CTA BUTTON
══════════════════════════════════════ */
const cta = document.querySelector('.cta-btn');
if (cta) {
  cta.addEventListener('mousemove', e => {
    const rect = cta.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    cta.style.transform = `translateY(-4px) translate(${x * 0.12}px, ${y * 0.12}px) scale(1.03)`;
  });
  cta.addEventListener('mouseleave', () => {
    cta.style.transform = '';
  });
}

/* ══════════════════════════════════════
   6. TILT on LINK CARDS
══════════════════════════════════════ */
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateX(6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});