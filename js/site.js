/*
  Potter Team landing (mobile-first)
  - WhatsApp deep links with per-button message
  - Scroll reveal animations
  - Subtle interactions (no heavy libs)
*/

(function () {
  const PHONE = '5571981988973';

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

  // Optional: only one FAQ open at a time (clean + fast)
  function initAccordion() {
    const details = document.querySelectorAll('.accordion details');
    if (!details.length) return;

    details.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (!d.open) return;
        details.forEach((other) => {
          if (other !== d) other.removeAttribute('open');
        });
      });
    });
  }

  // WhatsApp flutuante: aparece depois que o usuário sai do hero
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
    initReveal();
    initAccordion();
    initFloatingWhatsApp();
  });
})();
