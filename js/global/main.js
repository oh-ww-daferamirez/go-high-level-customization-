/* ===================================
   SCRIPT PRINCIPAL
   Go High Level Customization
   =================================== */

/**
 * Inicialización cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFormValidation();
  initModals();
  initTooltips();
  initCounters();
  initCountdowns();
  initParallax();
  initSmoothScroll();
  initLazyLoading();
  initMobileMenu();
  initSearch();
  initTheme();
});

/**
 * Inicializa animaciones de scroll
 */
function initScrollAnimations() {
  const scrollAnimation = new ScrollAnimation({
    selector: '.ghl-animate-on-scroll',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
}

/**
 * Inicializa validación de formularios
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.ghl-form[data-validate]');
  forms.forEach(form => {
    const validator = new FormValidator(form, {
      rules: getFormRules(form),
      onSubmit: (form) => {
        handleFormSubmit(form);
      },
      onValidate: (form, isValid) => {
        console.log('Formulario validado:', isValid);
      }
    });
  });
}

/**
 * Obtiene las reglas de validación del formulario
 */
function getFormRules(form) {
  const rules = {};
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    if (input.name) {
      rules[input.name] = getFieldRules(input);
    }
  });
  
  return rules;
}

/**
 * Obtiene las reglas de validación de un campo
 */
function getFieldRules(input) {
  const rules = {};
  
  if (input.required) {
    rules.required = true;
    rules.requiredMessage = input.dataset.requiredMessage || 'Este campo es requerido';
  }
  
  if (input.type === 'email') {
    rules.email = true;
    rules.emailMessage = input.dataset.emailMessage || 'Por favor ingresa un email válido';
  }
  
  if (input.minLength) {
    rules.minLength = parseInt(input.minLength);
    rules.minLengthMessage = input.dataset.minLengthMessage || `Mínimo ${input.minLength} caracteres`;
  }
  
  if (input.maxLength) {
    rules.maxLength = parseInt(input.maxLength);
    rules.maxLengthMessage = input.dataset.maxLengthMessage || `Máximo ${input.maxLength} caracteres`;
  }
  
  if (input.pattern) {
    rules.pattern = new RegExp(input.pattern);
    rules.patternMessage = input.dataset.patternMessage || 'Formato inválido';
  }
  
  return rules;
}

/**
 * Maneja el envío del formulario
 */
function handleFormSubmit(form) {
  // Mostrar indicador de carga
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.classList.add('ghl-btn-loading');
    submitBtn.disabled = true;
  }
  
  // Simular envío (reemplazar con tu lógica real)
  setTimeout(() => {
    // Mostrar notificación de éxito
    new Toast('¡Formulario enviado correctamente!', {
      type: 'success',
      duration: 3000
    }).show();
    
    // Resetear formulario
    form.reset();
    
    // Remover indicador de carga
    if (submitBtn) {
      submitBtn.classList.remove('ghl-btn-loading');
      submitBtn.disabled = false;
    }
  }, 2000);
}

/**
 * Inicializa modales
 */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  const modals = document.querySelectorAll('[data-modal]');
  
  // Inicializar cada modal
  modals.forEach(modal => {
    const modalInstance = new Modal(modal, {
      backdrop: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      onOpen: () => {
        console.log('Modal abierto:', modal.id);
      },
      onClose: () => {
        console.log('Modal cerrado:', modal.id);
      }
    });
    
    // Guardar instancia en el elemento
    modal.modalInstance = modalInstance;
  });
  
  // Agregar event listeners a los triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalTrigger;
      const modal = document.querySelector(`[data-modal="${modalId}"]`);
      if (modal && modal.modalInstance) {
        modal.modalInstance.open();
      }
    });
  });
}

/**
 * Inicializa tooltips
 */
function initTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
      showTooltip(e.target, tooltip.dataset.tooltip);
    });
    
    tooltip.addEventListener('mouseleave', () => {
      hideTooltip();
    });
  });
}

/**
 * Muestra un tooltip
 */
function showTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'ghl-tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.bottom + 8}px`;
  tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
  
  setTimeout(() => {
    tooltip.classList.add('ghl-tooltip-show');
  }, 10);
}

/**
 * Oculta el tooltip
 */
function hideTooltip() {
  const tooltip = document.querySelector('.ghl-tooltip');
  if (tooltip) {
    tooltip.classList.remove('ghl-tooltip-show');
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 200);
  }
}

/**
 * Inicializa contadores animados
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  counters.forEach(counter => {
    const endValue = parseFloat(counter.dataset.counter);
    const startValue = parseFloat(counter.dataset.counterStart) || 0;
    const prefix = counter.dataset.counterPrefix || '';
    const suffix = counter.dataset.counterSuffix || '';
    const decimals = parseInt(counter.dataset.counterDecimals) || 0;
    
    const counterInstance = new AnimatedCounter(counter, {
      startValue,
      endValue,
      duration: 2000,
      delay: 500,
      prefix,
      suffix,
      decimals
    });
    
    // Iniciar animación cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterInstance.animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

/**
 * Inicializa contadores regresivos
 */
function initCountdowns() {
  const countdowns = document.querySelectorAll('[data-countdown]');
  
  countdowns.forEach(countdown => {
    const targetDate = countdown.dataset.countdown;
    const format = countdown.dataset.countdownFormat || 'd:h:m:s';
    
    const countdownInstance = new CountdownTimer(countdown, targetDate, {
      format,
      onTick: (time) => {
        // Actualizar elementos individuales si existen
        const daysEl = countdown.querySelector('[data-countdown-days]');
        const hoursEl = countdown.querySelector('[data-countdown-hours]');
        const minutesEl = countdown.querySelector('[data-countdown-minutes]');
        const secondsEl = countdown.querySelector('[data-countdown-seconds]');
        
        if (daysEl) daysEl.textContent = time.days;
        if (hoursEl) hoursEl.textContent = time.hours;
        if (minutesEl) minutesEl.textContent = time.minutes;
        if (secondsEl) secondsEl.textContent = time.seconds;
      },
      onComplete: () => {
        new Toast('¡El tiempo ha terminado!', {
          type: 'info',
          duration: 5000
        }).show();
      }
    });
    
    countdownInstance.start();
  });
}

/**
 * Inicializa efectos de parallax
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.5;
    const direction = element.dataset.parallaxDirection || 'vertical';
    
    const parallaxInstance = new ParallaxEffect(element, {
      speed,
      direction
    });
  });
}

/**
 * Inicializa scroll suave
 */
function initSmoothScroll() {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        Utils.scrollToElement(target, {
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Inicializa lazy loading de imágenes
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('ghl-lazy-loaded');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores antiguos
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('ghl-lazy-loaded');
    });
  }
}

/**
 * Inicializa menú móvil
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      Utils.toggleClass(menu, 'ghl-menu-open');
      Utils.toggleClass(menuToggle, 'ghl-menu-toggle-active');
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('ghl-menu-open');
        menuToggle.classList.remove('ghl-menu-toggle-active');
      }
    });
  }
}

/**
 * Inicializa búsqueda
 */
function initSearch() {
  const searchInput = document.querySelector('[data-search]');
  const searchResults = document.querySelector('[data-search-results]');
  
  if (searchInput && searchResults) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(e.target.value, searchResults);
      }, 300);
    });
  }
}

/**
 * Realiza búsqueda
 */
function performSearch(query, resultsContainer) {
  if (query.length < 2) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  // Simular búsqueda (reemplazar con tu lógica real)
  const results = [
    { title: 'Resultado 1', url: '#' },
    { title: 'Resultado 2', url: '#' },
    { title: 'Resultado 3', url: '#' }
  ];
  
  const filtered = results.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filtered.length > 0) {
    resultsContainer.innerHTML = filtered.map(result => `
      <a href="${result.url}" class="ghl-search-result">
        ${result.title}
      </a>
    `).join('');
  } else {
    resultsContainer.innerHTML = `
      <div class="ghl-search-no-results">
        No se encontraron resultados
      </div>
    `;
  }
}

/**
 * Inicializa tema (claro/oscuro)
 */
function initTheme() {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const savedTheme = Utils.getLocalStorage('ghl-theme');
  
  if (savedTheme) {
    applyTheme(savedTheme);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      Utils.setLocalStorage('ghl-theme', newTheme);
    });
  }
}

/**
 * Aplica el tema
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Agrega estilos globales
 */
function addGlobalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .ghl-tooltip {
      position: fixed;
      background: #1f2937;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      z-index: 9999;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.2s ease-in-out;
      pointer-events: none;
    }
    
    .ghl-tooltip-show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .ghl-lazy-loaded {
      animation: ghl-fadeIn 0.5s ease-in-out;
    }
    
    .ghl-menu-open {
      display: block;
    }
    
    .ghl-search-result {
      display: block;
      padding: 0.75rem 1rem;
      color: #374151;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    
    .ghl-search-result:hover {
      background-color: #f3f4f6;
    }
    
    .ghl-search-no-results {
      padding: 0.75rem 1rem;
      color: #6b7280;
      font-size: 0.875rem;
    }
    
    [data-theme="dark"] {
      --color-white: #111827;
      --color-black: #ffffff;
      --color-gray-50: #1f2937;
      --color-gray-100: #374151;
      --color-gray-200: #4b5563;
      --color-gray-300: #6b7280;
      --color-gray-400: #9ca3af;
      --color-gray-500: #d1d5db;
      --color-gray-600: #e5e7eb;
      --color-gray-700: #f3f4f6;
      --color-gray-800: #f9fafb;
      --color-gray-900: #ffffff;
    }
  `;
  document.head.appendChild(style);
}

// Agregar estilos globales
addGlobalStyles();

// Exportar funciones para uso externo
window.GHL = {
  Utils,
  FormValidator,
  Toast,
  Modal,
  AnimatedCounter,
  CountdownTimer,
  ScrollAnimation,
  FadeInAnimation,
  SlideAnimation,
  ScaleAnimation,
  RotateAnimation,
  BounceAnimation,
  ShakeAnimation,
  PulseAnimation,
  TypingAnimation,
  ParallaxEffect,
  StickyAnimation
};

console.log('Go High Level Customization inicializado correctamente');
