// ── GSAP SETUP ──
gsap.registerPlugin(ScrollTrigger);

// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  gsap.to(follower, {
    left: e.clientX,
    top: e.clientY,
    duration: 0.15,
    ease: 'power2.out'
  });
});

// grow follower on links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => follower.classList.add('hovering'));
  link.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

// ── HERO ANIMATION (on load) ──
gsap.from('.hero h1', {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: 'power4.out',
  delay: 0.2
});

gsap.from('.hero .subtitle', {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: 'power4.out',
  delay: 0.6
});

gsap.from('nav', {
  y: -30,
  opacity: 0,
  duration: 1,
  ease: 'power4.out',
  delay: 0.1
});

// ── SCROLL FADE-IN ──
gsap.utils.toArray('.works-header, .work-item, .about-top, .about-col, .about-image, footer').forEach(el => {
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

