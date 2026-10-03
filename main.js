document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.menu-overlay');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  function toggleMenu() {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isExpanded);
    overlay.classList.toggle('hidden');
    mobileMenu.classList.toggle('hidden');
    body.classList.toggle('menu-open');
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    overlay.classList.add('hidden');
    mobileMenu.classList.add('hidden');
    body.classList.remove('menu-open');
  }

  if (burger) {
    burger.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  // Stats Count Up
  const statValues = document.querySelectorAll('.stat-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  statValues.forEach((stat, i) => {
    stat.dataset.index = i;
    observer.observe(stat);
  });

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function startCounting(el) {
    const target = parseFloat(el.dataset.val);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const suffix = el.dataset.suffix || '';
    const index = parseInt(el.dataset.index) || 0;
    
    const duration = 1500 + (index * 80);
    const delay = 480 + (index * 90);
    
    setTimeout(() => {
      let startTime = null;
      
      function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentVal = target * easeOutCubic(progress);
        
        el.textContent = currentVal.toFixed(decimals) + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }
      
      requestAnimationFrame(update);
    }, delay);
  }
});
