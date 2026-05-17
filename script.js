// ══════════════════════════════════════════════
// YOGESWAR PENTAKOTA — portfolio script
// ══════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ── DOM REFERENCES ──
const mainNav       = document.getElementById('mainNav');
const heroTitleGroup = document.getElementById('heroTitleGroup');
const heroRight     = document.getElementById('heroRight');
const heroVideo     = document.getElementById('heroVideo');
const heroLeft      = document.querySelector('.hero-left');

// ── CURSOR ──
const cursor   = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  gsap.to(follower, {
    left: e.clientX,
    top: e.clientY,
    duration: 0.15,
    ease: 'power2.out'
  });
});

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => follower.classList.add('hovering'));
  link.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

// ══════════════════════════════════════════════
// HERO INTRO TIMELINE
// ══════════════════════════════════════════════

window.addEventListener('load', () => {

  // lock scroll during animation
  document.body.classList.add('is-animating');

  // calculate how far up the title needs to travel
  // to reach vertical center of the left panel
  const leftH  = heroLeft.getBoundingClientRect().height;
  const titleH = heroTitleGroup.getBoundingClientRect().height;

  // distance from bottom-aligned position to center
  // subtract nav height so title aligns with video center
  const navH   = mainNav.getBoundingClientRect().height;
  const centerOffset = -((leftH / 2) - (titleH / 2) - (navH / 2));
  
  // build the main timeline
  const tl = gsap.timeline({
    onComplete: () => {
      // unlock scroll after animation finishes
      document.body.classList.remove('is-animating');

      // enable scroll trigger for sections below
      initScrollAnimations();
    }
  });

  // ── PHASE 1 — title fades up at bottom left ──
  // starts from CSS initial state: opacity 0, translateY 60px
  tl.to(heroTitleGroup, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, 0.4); // starts 0.4s after timeline begins

  // ── PHASE 2 — title floats upward to vertical center ──
  // begins while phase 1 is still settling
  tl.to(heroTitleGroup, {
    y: centerOffset,
    duration: 2,
    ease: 'power2.inOut'
  }, 1.4); // starts 1.4s in — overlaps with phase 1 end

  // ── PHASE 3 — video fades in while title is still rising ──
  tl.to(heroRight, {
    opacity: 1,
    duration: 1.4,
    ease: 'power2.inOut',
    onStart: () => {
      heroVideo.play();
    }
  }, 2); // starts 2s in — synchronized with title movement

  // ── PHASE 4 — nav fades in after composition settles ──
  tl.to(mainNav, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, 3.8); // starts after everything has settled

});

// ══════════════════════════════════════════════
// SCROLL ANIMATIONS — runs after intro completes
// ══════════════════════════════════════════════

function initScrollAnimations() {

  gsap.utils.toArray([
    '.works-header',
    '.work-item',
    '.about-top',
    '.about-col',
    '.about-image',
    'footer'
  ]).forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  });

}

// ══════════════════════════════════════════════
// STYLE CARDS — sweep restart on hover
// ══════════════════════════════════════════════

document.querySelectorAll('.style-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const sweep = card.querySelector('.sweep-line');
    sweep.style.animation = 'none';
    sweep.offsetHeight; // force reflow
    sweep.style.animation = '';
  });
});