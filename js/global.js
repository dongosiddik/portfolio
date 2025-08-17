/* Portfolio JavaScript - Fonctionnalités modernes */

// Mode sombre
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const body = document.body;
  
  // Vérifier la préférence utilisateur
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark');
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Menu mobile amélioré
function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');
  const overlay = document.querySelector('.mobile-overlay');

  if (btn) {
    btn.addEventListener('click', () => {
      header.classList.toggle('show-nav');
      document.body.classList.toggle('no-scroll');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
      document.body.classList.remove('no-scroll');
    });
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      header.classList.remove('show-nav');
      document.body.classList.remove('no-scroll');
    });
  }
}

// Navigation fluide
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Filtres de portfolio améliorés
function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    });
  };

  const showProjets = (filter) => {
    projets.forEach(projet => {
      const category = projet.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        projet.parentNode.classList.remove('hide');
        projet.style.animation = 'fadeInUp 0.6s ease forwards';
      } else {
        projet.parentNode.classList.add('hide');
      }
    });
  };

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      const filter = elem.getAttribute('data-filter');
      
      resetActiveLinks();
      elem.classList.add('active');
      showProjets(filter);
    });
  });
}

// Détails des projets
function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
  };

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      const targetModal = document.querySelector(`[id=${elem.dataset.id}]`);
      
      if (targetModal) {
        targetModal.classList.add('show');
        document.body.classList.add('no-scroll');
      }
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', hideModals);
  });

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModals();
    }
  });
}

// Animations d'intersection observer améliorées
function initIntersectionObserver() {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');
  const cards = document.querySelectorAll('.card-gradient');

  // Animation des sections
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
  });

  // Animation des compétences
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width || '0';
        entry.target.style.width = width + '%';
        entry.target.style.transition = 'width 1.2s ease';
      }
    });
  }, {
    threshold: 0.5
  });

  skills.forEach(skill => {
    skill.style.width = '0';
    skillsObserver.observe(skill);
  });

  // Animation des cartes
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  cards.forEach(card => {
    cardObserver.observe(card);
  });
}

// Typing effect pour le titre principal
function initTypingEffect() {
  const titleElement = document.querySelector('.hero-title');
  if (!titleElement) return;

  const text = titleElement.textContent;
  titleElement.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      titleElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Démarrer l'effet quand la section est visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriter();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(titleElement);
}

// Validation du formulaire
function initFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  });
}

// Effet de parallaxe subtil
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Initialisation de toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  menuMobile();
  smoothScroll();
  tabsFilters();
  showProjectDetails();
  initIntersectionObserver();
  initTypingEffect();
  initFormValidation();
  initParallax();
  
  console.log('Portfolio chargé avec succès !');
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  const header = document.querySelector('.header');
  if (window.innerWidth > 768) {
    header.classList.remove('show-nav');
    document.body.classList.remove('no-scroll');
  }
});


