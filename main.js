/* ── main.js – Portfolio interactivity ── */

/* 1. STICKY HEADER SHADOW */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* 2. ACTIVE NAV LINK – highlights the section in view */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* 3. HAMBURGER MENU (mobile) */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
    bars[1].style.cssText = 'opacity: 0';
    bars[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
  } else {
    bars.forEach(b => (b.style.cssText = ''));
  }
});

// Close menu when a link is clicked (mobile)
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => (b.style.cssText = ''));
  });
});

/* 4. SCROLL FADE-IN ANIMATION */
const fadeEls = document.querySelectorAll(
  '.stat-card, .skill-group, .project-card, .timeline-item, .contact-item, .training-card, .info-item'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on element's sibling index
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* 5. PROFILE IMAGE FALLBACK */
const profileImg    = document.getElementById('profile-img');
const photoFallback = document.getElementById('photo-fallback');

if (profileImg) {
  profileImg.style.display = 'none'; // Hide until load confirmed
  profileImg.addEventListener('load', () => {
    profileImg.style.display = 'block';
    photoFallback.style.display = 'none';
  });
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    photoFallback.style.display = 'flex';
  });
  // Trigger check if already cached
  if (profileImg.complete && profileImg.naturalWidth > 0) {
    profileImg.dispatchEvent(new Event('load'));
  } else if (profileImg.complete) {
    profileImg.dispatchEvent(new Event('error'));
  }
}

/* 6. SMOOTH SCROLL OFFSET (accounts for fixed header height) */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
