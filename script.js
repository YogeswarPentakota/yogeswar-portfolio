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

  const isMobile = window.innerWidth <= 768;
  document.body.classList.add('is-animating');

  if (isMobile) {

    // ── MOBILE ANIMATION ──
    const mobileSep = document.getElementById('mobileSep');

    // phase 1 — title fades up at dead center
    // hero is already flex column centered
    // title group starts at opacity 0, translateY 0
    const mobileTl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-animating');
        initScrollAnimations();
      }
    });

    // title fades up into center
    mobileTl.to(heroTitleGroup, {
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, 0.4);

    // phase 2 — title moves up, video moves down from center
    // move title UP by shifting it upward
    mobileTl.to(heroTitleGroup, {
      y: -20,
      duration: 1,
      ease: 'power2.inOut'
    }, 1.6);

    // separator fades in
    mobileTl.to(mobileSep, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 1.8);

    // video fades in moving down from center
    mobileTl.fromTo(heroRight, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 20,
      duration: 1,
      ease: 'power2.inOut',
      onStart: () => {
        heroVideo.play().catch(() => {});
      }
    }, 1.6);

    // phase 3 — nav fades in
    mobileTl.to(mainNav, {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out'
    }, 2.8);

  } else {

    // ── DESKTOP ANIMATION — unchanged ──
    const leftH  = heroLeft.getBoundingClientRect().height;
    const titleH = heroTitleGroup.getBoundingClientRect().height;
    const navH   = mainNav.getBoundingClientRect().height;
    const centerOffset = -((leftH / 2) - (titleH / 2) - (navH / 2));

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-animating');
        initScrollAnimations();
      }
    });

    tl.to(heroTitleGroup, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, 0.4);

    tl.to(heroTitleGroup, {
      y: centerOffset,
      duration: 2,
      ease: 'power2.inOut'
    }, 1.4);

    tl.to(heroRight, {
  opacity: 1,
  duration: 1.4,
  onStart: () => {
    console.log("Animation reached: Playing video now!"); // This will show in your browser 'Inspect' tool
    const video = document.getElementById('heroVideo');
    video.play();
  }
}, 2);

    tl.to(mainNav, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 3.8);

  }

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