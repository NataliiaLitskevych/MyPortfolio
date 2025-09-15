document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

 
  if (typeof gsap !== 'undefined') {
    gsap.from(".hero-flex .title", { opacity: 0, x: -50, duration: 2, ease: "power2.out" });
    gsap.from(".hero-text .hero-title", { opacity: 0, x: 50, duration: 2, delay: 0.3, ease: "power2.out" });
    gsap.from(".hero-text .hero-subtitle", { opacity: 0, x: 50, duration: 1, delay: 0.6, ease: "power2.out" });
  }

  
  function typeText(elementId, text, speed = 60) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      }
    }
    typeChar();
  }
  setTimeout(() => typeText("typing-about", "About Me"), 500);

  
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: false, mirror: true, duration: 800, easing: 'ease-in-out' });
  }

  const projectGrid = document.querySelector(".project-grid");
  const showMoreBtn = document.getElementById("show-more-btn");
  if (showMoreBtn && projectGrid) {
    showMoreBtn.addEventListener("click", () => {
      projectGrid.classList.toggle("show-all-projects");
      showMoreBtn.textContent = projectGrid.classList.contains("show-all-projects")
        ? "Show Less"
        : "Show All Projects";
      if (typeof AOS !== 'undefined') AOS.refresh();
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = this.name;
      const emailInput = this.email;
      const messageInput = this.message;
      const messageBox = document.querySelector('.form-message.success-message');

      if (!nameInput.value.trim()) return alert('Please enter your name.');
      if (!validateEmail(emailInput.value.trim())) return alert('Please enter a valid email address.');
      if (!messageInput.value.trim()) return alert('Please enter your message.');

      messageBox.classList.add('show');
      setTimeout(() => {
        messageBox.classList.remove('show');
        this.reset();
      }, 5000);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".contact-media a", {
      opacity: 0,
      scale: 0.5,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: { trigger: ".contact-media", start: "top 80%", toggleActions: "play none none reset" }
    });
  }
});
