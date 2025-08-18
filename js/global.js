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

// Système de traduction simple
let currentLanguage = 'fr';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
  
  // Mettre à jour le bouton
  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';
  }
  
  // Traductions sécurisées - seulement les éléments spécifiques
  const translations = {
    fr: {
      'nav-home': 'Accueil',
      'nav-about': 'À propos', 
      'nav-experience': 'Expériences',
      'nav-education': 'Formations',
      'nav-services': 'Services',
      'nav-skills': 'Compétences',
      'nav-portfolio': 'Projets',
      'nav-contact': 'Contact',
      'hero-title': 'Bonjour, je suis Sidiki SAWADOGO',
      'hero-subtitle': 'Freelance disponible – Projets Web & Data Science',
      'btn-cv': 'Télécharger mon CV',
      'btn-portfolio': 'Voir mon portfolio',
      'section-about': 'À propos',
      'about-subtitle': 'Qui suis-je ?',
      'btn-discover': 'Découvrir mes projets',
      'section-experience': 'Expériences professionnelles',
      'experience-desc': 'Mon parcours professionnel dans le développement web et la data science.',
      'section-education': 'Formations & Certifications',
      'education-desc': 'Mon parcours académique et mes certifications professionnelles.',
      'section-services': 'Mes services',
      'services-desc': 'Solutions complètes pour vos projets web et data science.',
      'section-skills': 'Mes compétences',
      'skills-desc': 'Un savoir-faire complet en développement web, data science et gestion de projet.',
      'section-portfolio': 'Projets récents',
      'portfolio-desc': 'Découvrez mes dernières réalisations en développement web et data science.',
      'section-contact': 'Contact',
      'contact-desc': 'Discutons de votre projet ensemble.',
      'btn-details': 'Détails',
      'about-p1': 'Développeur web full stack et data scientist passionné, je combine expertise technique et vision stratégique pour créer des solutions digitales innovantes. Avec plus de 5 ans d\'expérience dans le développement web et la data science, je me spécialise dans la conception d\'applications robustes et évolutives utilisant les technologies modernes.',
      'about-p2': 'Expert en automatisation des workflows avec n8n et spécialiste de la digitalisation des formulaires avec SurveyJS, je transforme les processus métier complexes en solutions automatisées intelligentes. Mon approche se base sur une compréhension approfondie des besoins métier, une architecture solide et des bonnes pratiques de développement.',
      'about-p3': 'Je m\'efforce de livrer des solutions qui non seulement répondent aux exigences techniques mais apportent une réelle valeur ajoutée aux utilisateurs finaux, en privilégiant l\'automatisation intelligente et la digitalisation des processus traditionnels.',
      'job-title-1': 'Développeur Web Full Stack Senior',
      'job-title-2': 'Développeur Web Full Stack',
      'job-title-3': 'Stagiaire Développeur',
      'education-title-1': 'Master 2 en Data Science & Intelligence Artificielle en Santé',
      'education-title-2': 'Licence en Génie Logiciel',
      'education-title-3': 'Certifications professionnelles',
      'skills-web': 'Développement web',
      'skills-data': 'Data Science & IA',
      'skills-tools': 'Outils & DevOps'
    },
    en: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-experience': 'Experience', 
      'nav-education': 'Education',
      'nav-services': 'Services',
      'nav-skills': 'Skills',
      'nav-portfolio': 'Projects',
      'nav-contact': 'Contact',
      'hero-title': 'Hello, I\'m Sidiki SAWADOGO',
      'hero-subtitle': 'Available Freelancer – Web & Data Science Projects',
      'btn-cv': 'Download my CV',
      'btn-portfolio': 'View Portfolio',
      'section-about': 'About',
      'about-subtitle': 'Who am I?',
      'btn-discover': 'Discover my projects',
      'section-experience': 'Professional Experience',
      'experience-desc': 'My professional journey in web development and data science.',
      'section-education': 'Education & Certifications',
      'education-desc': 'My academic background and professional certifications.',
      'section-services': 'My Services',
      'services-desc': 'Complete solutions for your web and data science projects.',
      'section-skills': 'My Skills',
      'skills-desc': 'Complete expertise in web development, data science and project management.',
      'section-portfolio': 'Recent Projects',
      'portfolio-desc': 'Discover my latest achievements in web development and data science.',
      'section-contact': 'Contact',
      'contact-desc': 'Let\'s discuss your project together.',
      'btn-details': 'Details',
      'about-p1': 'Passionate full stack web developer and data scientist, I combine technical expertise and strategic vision to create innovative digital solutions. With over 5 years of experience in web development and data science, I specialize in designing robust and scalable applications using modern technologies.',
      'about-p2': 'Expert in workflow automation with n8n and specialist in form digitalization with SurveyJS, I transform complex business processes into intelligent automated solutions. My approach is based on a deep understanding of business needs, solid architecture and development best practices.',
      'about-p3': 'I strive to deliver solutions that not only meet technical requirements but bring real added value to end users, prioritizing intelligent automation and digitalization of traditional processes.',
      'job-title-1': 'Senior Full Stack Web Developer',
      'job-title-2': 'Full Stack Web Developer',
      'job-title-3': 'Developer Intern',
      'education-title-1': 'Master 2 in Data Science & Artificial Intelligence in Health',
      'education-title-2': 'Bachelor in Software Engineering',
      'education-title-3': 'Professional Certifications',
      'skills-web': 'Web Development',
      'skills-data': 'Data Science & AI',
      'skills-tools': 'Tools & DevOps'
    }
  };
  
  // Appliquer les traductions par ID
  Object.keys(translations[currentLanguage]).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = translations[currentLanguage][id];
    }
  });
  
  // Sauvegarder la préférence
  localStorage.setItem('language', currentLanguage);
}

// Initialiser la langue au chargement
function initLanguage() {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && savedLanguage !== 'fr') {
    currentLanguage = 'fr';
    toggleLanguage();
  }
}

// Fonctions pour les modales
function openDocSecureModal() {
  document.getElementById('docsecure-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDocSecureModal() {
  document.getElementById('docsecure-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function openAutomationModal() {
  document.getElementById('automation-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAutomationModal() {
  document.getElementById('automation-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function openDafaniModal() {
  document.getElementById('dafani-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDafaniModal() {
  document.getElementById('dafani-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function openVaxBudgetModal() {
  document.getElementById('vaxbudget-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeVaxBudgetModal() {
  document.getElementById('vaxbudget-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function openSDPlannerModal() {
  document.getElementById('sdplanner-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSDPlannerModal() {
  document.getElementById('sdplanner-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function openCollecteModal() {
  document.getElementById('collecte-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCollecteModal() {
  document.getElementById('collecte-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Initialisation de toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initLanguage();
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


