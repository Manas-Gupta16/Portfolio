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
    if(!isExpanded) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    overlay.classList.add('hidden');
    mobileMenu.classList.add('hidden');
    body.classList.remove('menu-open');
    body.style.overflow = '';
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

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Nav Link Update on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Stats Count Up (Triggered when footer comes into view)
  const statValues = document.querySelectorAll('.stat-value');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach((stat, i) => {
    stat.dataset.index = i;
    statsObserver.observe(stat);
  });

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function startCounting(el) {
    const target = parseFloat(el.dataset.val);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const suffix = el.dataset.suffix || '';
    const index = parseInt(el.dataset.index) || 0;
    
    const duration = 1500 + (index * 150);
    
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
  }
});
