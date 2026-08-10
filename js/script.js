/* ==========================================================================
   LS DEVELOPERS — SITE SCRIPT
   Vanilla JS, no build step required.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('done'), 400);
  });
  // Fallback in case 'load' already fired or media is slow
  setTimeout(() => preloader && preloader.classList.add('done'), 2500);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky navbar solid-on-scroll ---------- */
  const navbar = document.getElementById('navbar');
  const toggleNavSolid = () => {
    if (window.scrollY > 60) navbar.classList.add('solid');
    else navbar.classList.remove('solid');
  };
  toggleNavSolid();
  window.addEventListener('scroll', toggleNavSolid, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Mobile: tap to expand services dropdown instead of hover
  const navDropdown = document.querySelector('.nav-dropdown');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  dropdownTrigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      navDropdown.classList.toggle('open');
    }
  });

  /* ---------- Fade-up on scroll (IntersectionObserver) ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Project filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cats = card.getAttribute('data-category');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hide', !show);
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.g-item'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lbImage.src = galleryItems[index].getAttribute('data-full');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  const showNext = (dir) => {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    lbImage.src = galleryItems[currentIndex].getAttribute('data-full');
  };

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
  });

  /* ---------- Contact form ---------- */
  /* No JS interception here on purpose — the form submits natively straight
     to FormSubmit (see the action="" on the <form> tag in index.html).
     This removes fetch/CORS/file:// as possible points of failure. Once
     latifsons.developers@gmail.com is activated with FormSubmit, submissions
     will arrive by email. The browser will redirect to FormSubmit's own
     confirmation page after submitting. */

});
