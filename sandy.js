document.addEventListener('DOMContentLoaded', () => {

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


  const cursorEl = document.getElementById('cursor');
  const ringEl   = document.getElementById('cursorRing');

  if (cursorEl && ringEl) {
    document.querySelectorAll('.skill-tag').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorEl.classList.add('hover');
        ringEl.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorEl.classList.remove('hover');
        ringEl.classList.remove('hover');
      });
    });
  }


  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-item').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stats-band').forEach(s => statsObserver.observe(s));


  function animateCounter(el, target, suffix, duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
          const raw    = el.textContent.trim();
          const suffix = raw.replace(/[0-9]/g, '');
          const value  = parseInt(raw.replace(/\D/g, ''), 10);
          el.textContent = '0' + suffix;
          animateCounter(el, value, suffix);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-band').forEach(s => counterObserver.observe(s));
});