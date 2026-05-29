/* ============================================
   JOHN MIKE L. SERNA - PORTFOLIO SCRIPT
   ============================================ */

/* ── Navbar: scroll & hamburger ── */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  // Sticky shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active link on scroll
  highlightActiveLink();

  // Back-to-top button visibility
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Active link highlight on scroll ── */
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── Back-to-top button ── */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Typing Effect (Hero) ── */
const phrases = [
  'Beginner Web Developer',
  'Frontend Developer',
  'Laravel Developer',
  'UI/UX Enthusiast',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typingEl  = document.getElementById('typing-text');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }
  if (isDeleting && charIndex < 0) {
    isDeleting   = false;
    phraseIndex  = (phraseIndex + 1) % phrases.length;
    charIndex    = 0;
    setTimeout(typeEffect, 400);
    return;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 90);
}
typeEffect();

/* ── Intersection Observer: fade-in + skill bars ── */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* Animate skill bars when section is in view */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ── Page-load animation ── */
window.addEventListener('load', () => {
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = 1; }, 50);
});

/* ── Contact Form Validation ── */
function submitForm() {
  const name    = document.getElementById('cName');
  const email   = document.getElementById('cEmail');
  const message = document.getElementById('cMessage');

  const errName  = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errMsg   = document.getElementById('err-msg');

  // Reset errors
  [errName, errEmail, errMsg].forEach(el => el.textContent = '');
  [name, email, message].forEach(el => el.parentElement.style.borderColor = '');

  let valid = true;

  if (!name.value.trim()) {
    errName.textContent = 'Please enter your full name.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    errEmail.textContent = 'Please enter your email address.';
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    errEmail.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (!message.value.trim()) {
    errMsg.textContent = 'Please enter a message.';
    valid = false;
  } else if (message.value.trim().length < 10) {
    errMsg.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  // Show success message
  const successEl = document.getElementById('form-success');
  successEl.style.display = 'block';
  successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Clear form
  name.value    = '';
  email.value   = '';
  message.value = '';

  // Hide after 5 seconds
  setTimeout(() => { successEl.style.display = 'none'; }, 5000);
}

/* ── Lightbox ── */
function openLightbox(src, caption) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src    = src;
  img.alt    = caption;
  cap.textContent = caption;
  lb.showModal();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb.open) lb.close();
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});

document.getElementById('lightbox').addEventListener('close', () => {
  document.body.style.overflow = '';
});