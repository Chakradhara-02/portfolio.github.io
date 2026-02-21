// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingAnimation();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
  initSmoothScroll();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== ACTIVE NAV HIGHLIGHT =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(item => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const subtitleEl = document.querySelector('.typed-text');
  if (!subtitleEl) return;

  const phrases = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Creative Problem Solver',
    'Open Source Enthusiast'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 800);
      return;
    }

    if (!isDeleting) {
      subtitleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 80);
    } else {
      subtitleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 1200);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.btn-submit');

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      statusEl.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      statusEl.className = 'form-status show success';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      form.reset();

      setTimeout(() => {
        statusEl.classList.remove('show');
      }, 5000);
    }, 1500);
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== FADE IN UP ANIMATION =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
