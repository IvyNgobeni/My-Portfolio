(function() {
  'use strict';

  // ===== CONFIG =====
  const backendURL = 'http://localhost:5000'; // TODO: change to your Render URL when deploying live

  // ===== NAV =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(l => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ===== ACTIVE LINK =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ===== BACK TO TOP =====
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backBtn.classList.add('visible');
    else backBtn.classList.remove('visible');
  });
  if (backBtn) {
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===== REVEAL ON SCROLL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===== STATS ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  const animateStats = () => {
    if (statsAnimated) return;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target, 10);
      let current = 0;
      const increment = Math.ceil(target / 25);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = current;
        }
      }, 40);
    });
    statsAnimated = true;
  };
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  const statGrid = document.querySelector('.stat-grid');
  if (statGrid) statsObserver.observe(statGrid);

  // ===== SKILL BARS =====
  const skillBars = document.querySelectorAll('.skill-progress');
  let skillsAnimated = false;
  const animateSkills = () => {
    if (skillsAnimated) return;
    skillBars.forEach(bar => {
      const width = bar.dataset.width;
      bar.style.width = width + '%';
    });
    skillsAnimated = true;
  };
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkills();
      skillsObserver.disconnect();
    }
  }, { threshold: 0.2 });
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) skillsObserver.observe(skillsGrid);

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('formName')?.value.trim() || '';
      const email = document.getElementById('formEmail')?.value.trim() || '';
      const message = document.getElementById('formMessage')?.value.trim() || '';
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      const form = this;
      fetch(`${backendURL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
        .then(res => {
          if (!res.ok) throw new Error('Request failed');
          return res.json().catch(() => ({}));
        })
        .then(() => {
          alert('Thank you, Ivy will get back to you shortly!');
          form.reset();
        })
        .catch(() => {
          alert('Sorry, something went wrong sending your message. Please try again later.');
        });
    });
  }

  // ===== DOWNLOAD CV BUTTON =====
  const downloadBtn = document.getElementById('downloadCvBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('CV download will be available soon. Stay tuned!');
    });
  }

})();
