/*
  Glúteo FitPro landing (mobile-first)
  - WhatsApp deep links with per-button message
  - Scroll reveal animations
  - Premium background slots (troque em js/media.js)
*/

(function () {
  const PHONE = '55SEUNUMEROAQUI';

  function waUrl(text) {
    const base = `https://wa.me/${PHONE}`;
    const clean = (text || '').trim();
    if (!clean) return base;
    return `${base}?text=${encodeURIComponent(clean)}`;
  }

  function initWhatsAppLinks() {
    const links = document.querySelectorAll('.wa-link');
    links.forEach((a) => {
      const msg = a.getAttribute('data-wa-text') || '';
      a.setAttribute('href', waUrl(msg));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -12% 0px' }
    );

    nodes.forEach((n) => io.observe(n));
  }

  function initPremiumBackgrounds() {
    const media = window.MEDIA || {};
    const sections = document.querySelectorAll('[data-premium-bg]');

    sections.forEach((section) => {
      const key = section.getAttribute('data-premium-bg');
      const config = media[key];
      if (!config) return;

      // Troque os paths em js/media.js.
      section.style.setProperty('--bg-desktop', `url("${config.desktop}")`);
      section.style.setProperty('--bg-mobile', `url("${config.mobile}")`);

      const overlay = section.getAttribute('data-overlay');
      if (overlay) section.style.setProperty('--overlay', overlay);

      const positionDesktop = section.getAttribute('data-position-desktop');
      if (positionDesktop) {
        section.style.setProperty('--bg-position-desktop', positionDesktop);
      }

      const positionMobile = section.getAttribute('data-position-mobile');
      if (positionMobile) {
        section.style.setProperty('--bg-position-mobile', positionMobile);
      }

      const minHeight = section.getAttribute('data-min-height');
      if (minHeight) section.style.setProperty('--bg-min-height', minHeight);
    });
  }

  function initFloatingWhatsApp() {
    const btn = document.querySelector('.whatsapp-float');
    const hero = document.querySelector('.hero');
    if (!btn || !hero) return;

    function toggle() {
      const heroH = hero.offsetHeight || 0;
      const y = window.scrollY || window.pageYOffset || 0;
      if (y > Math.max(120, heroH - 120)) btn.classList.add('show');
      else btn.classList.remove('show');
    }

    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    window.addEventListener('resize', toggle);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppLinks();
    initPremiumBackgrounds();
    initReveal();
    initFloatingWhatsApp();
  });
})();
