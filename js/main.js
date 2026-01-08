/* ===================================
   ARCHIVO JAVASCRIPT CONSOLIDADO
   Go High Level Customization
   =================================== */

/* Importar archivos JavaScript */
// Utils
class Utils {
  static debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static generateId() {
    return 'ghl-' + Math.random().toString(36).substr(2, 9);
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
      element.classList.add(className);
    }, delay);
  }

  static removeClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
      element.classList.remove(className);
    }, delay);
  }

  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  static addClasses(element, classes) {
    classes.forEach(className => element.classList.add(className));
  }

  static removeClasses(element, classes) {
    classes.forEach(className => element.classList.remove(className));
  }

  static getCSSVariable(variableName, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue(variableName).trim();
  }

  static setCSSVariable(variableName, value, element = document.documentElement) {
    element.style.setProperty(variableName, value);
  }

  static async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          textArea.remove();
          return true;
        } catch (err) {
          textArea.remove();
          return false;
        }
      }
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      return false;
    }
  }

  static formatNumber(number, locale = 'es-ES') {
    return new Intl.NumberFormat(locale).format(number);
  }

  static formatCurrency(amount, currency = 'EUR', locale = 'es-ES') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static formatDate(date, options = {}, locale = 'es-ES') {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }

  static isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  static unescapeHTML(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
  }

  static truncate(text, maxLength, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  }

  static capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static toCamelCase(text) {
    return text
      .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/^(.)/, c => c.toLowerCase());
  }

  static toKebabCase(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  static toSnakeCase(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  static randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  static getBrightness(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  static isLightColor(hex) {
    return this.getBrightness(hex) > 128;
  }

  static scrollToElement(element, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };
    element.scrollIntoView({ ...defaultOptions, ...options });
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  static scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  static getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }

  static setURLParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      url.searchParams.set(key, params[key]);
    });
    window.history.pushState({}, '', url);
  }

  static removeURLParams(params) {
    const url = new URL(window.location);
    params.forEach(param => {
      url.searchParams.delete(param);
    });
    window.history.pushState({}, '', url);
  }

  static setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
    }
  }

  static getLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error al obtener de localStorage:', err);
      return null;
    }
  }

  static removeLocalStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error al remover de localStorage:', err);
    }
  }

  static clearLocalStorage() {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error al limpiar localStorage:', err);
    }
  }

  static setSessionStorage(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error al guardar en sessionStorage:', err);
    }
  }

  static getSessionStorage(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error al obtener de sessionStorage:', err);
      return null;
    }
  }

  static removeSessionStorage(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.error('Error al remover de sessionStorage:', err);
    }
  }

  static clearSessionStorage() {
    try {
      sessionStorage.clear();
    } catch (err) {
      console.error('Error al limpiar sessionStorage:', err);
    }
  }

  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static isTablet() {
    return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
  }

  static isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }

  static getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    if (userAgent.indexOf('Android') !== -1) return 'Android';
    if (userAgent.indexOf('like Mac') !== -1) return 'iOS';
    return 'Unknown';
  }

  static getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Chrome') !== -1) return 'Chrome';
    if (userAgent.indexOf('Safari') !== -1) return 'Safari';
    if (userAgent.indexOf('Firefox') !== -1) return 'Firefox';
    if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) return 'IE';
    return 'Unknown';
  }
}

// Animations
class ScrollAnimation {
  constructor(options = {}) {
    this.options = {
      selector: '.ghl-animate-on-scroll',
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    this.elements = document.querySelectorAll(this.options.selector);
    this.observer = null;
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });

    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Form Components
class FormValidator {
  constructor(form, options = {}) {
    this.form = form;
    this.options = {
      rules: {},
      errorClass: 'ghl-input-error',
      successClass: 'ghl-input-success',
      errorElementClass: 'ghl-error-message',
      onSubmit: null,
      onValidate: null,
      ...options
    };
    this.errors = {};
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(input) {
    const name = input.name;
    const rules = this.options.rules[name];
    
    if (!rules) return true;

    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
      isValid = false;
      errorMessage = rules.requiredMessage || 'Este campo es requerido';
    }

    if (isValid && rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = rules.emailMessage || 'Por favor ingresa un email válido';
      }
    }

    if (isValid && rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = rules.minLengthMessage || `Mínimo ${rules.minLength} caracteres`;
    }

    if (isValid && rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = rules.maxLengthMessage || `Máximo ${rules.maxLength} caracteres`;
    }

    this.updateFieldStatus(input, isValid, errorMessage);
    return isValid;
  }

  clearFieldError(input) {
    input.classList.remove(this.options.errorClass);
    const errorElement = input.parentElement.querySelector(`.${this.options.errorElementClass}`);
    if (errorElement) {
      errorElement.remove();
    }
  }

  updateFieldStatus(input, isValid, errorMessage) {
    input.classList.remove(this.options.errorClass, this.options.successClass);
    
    const existingError = input.parentElement.querySelector(`.${this.options.errorElementClass}`);
    if (existingError) {
      existingError.remove();
    }

    if (isValid) {
      input.classList.add(this.options.successClass);
    } else {
      input.classList.add(this.options.errorClass);
      this.showError(input, errorMessage);
    }
  }

  showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = this.options.errorElementClass;
    errorElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    `;
    input.parentElement.appendChild(errorElement);
  }

  validateAll() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateAll()) {
      if (this.options.onSubmit) {
        this.options.onSubmit(this.form);
      }
    } else {
      if (this.options.onValidate) {
        this.options.onValidate(this.form, false);
      }
    }
  }

  reset() {
    this.form.reset();
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.classList.remove(this.options.errorClass, this.options.successClass);
      const errorElement = input.parentElement.querySelector(`.${this.options.errorElementClass}`);
      if (errorElement) {
        errorElement.remove();
      }
    });
  }
}

class Toast {
  constructor(message, options = {}) {
    this.message = message;
    this.options = {
      type: 'info',
      duration: 3000,
      position: 'top-right',
      showClose: true,
      ...options
    };
    this.element = null;
    this.timeout = null;
  }

  show() {
    this.element = document.createElement('div');
    this.element.className = `ghl-toast ghl-toast-${this.options.type} ghl-toast-${this.options.position}`;
    this.element.innerHTML = `
      <div class="ghl-toast-content">
        <div class="ghl-toast-icon">${this.getIcon()}</div>
        <div class="ghl-toast-message">${this.message}</div>
        ${this.options.showClose ? '<button class="ghl-toast-close">&times;</button>' : ''}
      </div>
    `;

    this.addStyles();

    document.body.appendChild(this.element);

    setTimeout(() => {
      this.element.classList.add('ghl-toast-show');
    }, 10);

    if (this.options.showClose) {
      const closeBtn = this.element.querySelector('.ghl-toast-close');
      closeBtn.addEventListener('click', () => this.hide());
    }

    if (this.options.duration > 0) {
      this.timeout = setTimeout(() => this.hide(), this.options.duration);
    }
  }

  hide() {
    if (!this.element) return;

    this.element.classList.remove('ghl-toast-show');
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
    }, 300);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  getIcon() {
    switch (this.options.type) {
      case 'success':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
      case 'error':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
      case 'warning':
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';
      default:
        return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    }
  }

  addStyles() {
    if (document.getElementById('ghl-toast-styles')) return;

    const style = document.createElement('style');
    style.id = 'ghl-toast-styles';
    style.textContent = `
      .ghl-toast {
        position: fixed;
        z-index: 9999;
        padding: 1rem;
        min-width: 300px;
        max-width: 400px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease-in-out;
      }

      .ghl-toast-top-right {
        top: 20px;
        right: 20px;
      }

      .ghl-toast-top-left {
        top: 20px;
        left: 20px;
      }

      .ghl-toast-bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .ghl-toast-bottom-left {
        bottom: 20px;
        left: 20px;
      }

      .ghl-toast-show {
        opacity: 1;
        transform: translateY(0);
      }

      .ghl-toast-content {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .ghl-toast-icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
      }

      .ghl-toast-icon svg {
        width: 100%;
        height: 100%;
      }

      .ghl-toast-message {
        flex: 1;
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .ghl-toast-close {
        flex-shrink: 0;
        background: none;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        padding: 0;
        margin-left: 0.5rem;
        color: #6b7280;
        transition: color 0.2s;
      }

      .ghl-toast-close:hover {
        color: #374151;
      }

      .ghl-toast-success {
        border-left: 4px solid #10b981;
      }

      .ghl-toast-success .ghl-toast-icon {
        color: #10b981;
      }

      .ghl-toast-error {
        border-left: 4px solid #ef4444;
      }

      .ghl-toast-error .ghl-toast-icon {
        color: #ef4444;
      }

      .ghl-toast-warning {
        border-left: 4px solid #f59e0b;
      }

      .ghl-toast-warning .ghl-toast-icon {
        color: #f59e0b;
      }

      .ghl-toast-info {
        border-left: 4px solid #3b82f6;
      }

      .ghl-toast-info .ghl-toast-icon {
        color: #3b82f6;
      }
    `;
    document.head.appendChild(style);
  }
}

class Modal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      backdrop: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      onOpen: null,
      onClose: null,
      ...options
    };
    this.backdrop = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.addStyles();

    const closeBtn = this.element.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (this.options.closeOnBackdrop) {
      this.element.addEventListener('click', (e) => {
        if (e.target === this.element) {
          this.close();
        }
      });
    }

    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  }

  open() {
    if (this.isOpen) return;

    if (this.options.backdrop) {
      this.createBackdrop();
    }

    this.element.style.display = 'flex';
    setTimeout(() => {
      this.element.classList.add('ghl-modal-open');
    }, 10);

    document.body.style.overflow = 'hidden';

    this.isOpen = true;

    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    if (!this.isOpen) return;

    this.element.classList.remove('ghl-modal-open');
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 300);

    if (this.backdrop) {
      this.removeBackdrop();
    }

    document.body.style.overflow = '';

    this.isOpen = false;

    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  createBackdrop() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'ghl-modal-backdrop';
    document.body.appendChild(this.backdrop);
    setTimeout(() => {
      this.backdrop.classList.add('ghl-modal-backdrop-show');
    }, 10);
  }

  removeBackdrop() {
    if (this.backdrop) {
      this.backdrop.classList.remove('ghl-modal-backdrop-show');
      setTimeout(() => {
        if (this.backdrop && this.backdrop.parentNode) {
          this.backdrop.parentNode.removeChild(this.backdrop);
        }
        this.backdrop = null;
      }, 300);
    }
  }

  addStyles() {
    if (document.getElementById('ghl-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'ghl-modal-styles';
    style.textContent = `
      .ghl-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1040;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      .ghl-modal-backdrop-show {
        opacity: 1;
      }

      [data-modal] {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1050;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .ghl-modal-open {
        animation: ghl-modal-in 0.3s ease-out;
      }

      @keyframes ghl-modal-in {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
  const scrollAnimation = new ScrollAnimation({
    selector: '.ghl-animate-on-scroll',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const forms = document.querySelectorAll('.ghl-form[data-validate]');
  forms.forEach(form => {
    const validator = new FormValidator(form, {
      rules: {},
      onSubmit: (form) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('ghl-btn-loading');
          submitBtn.disabled = true;
        }
        
        setTimeout(() => {
          new Toast('¡Formulario enviado correctamente!', {
            type: 'success',
            duration: 3000
          }).show();
          
          form.reset();
          
          if (submitBtn) {
            submitBtn.classList.remove('ghl-btn-loading');
            submitBtn.disabled = false;
          }
        }, 2000);
      }
    });
  });

  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  const modals = document.querySelectorAll('[data-modal]');
  
  modals.forEach(modal => {
    const modalInstance = new Modal(modal, {
      backdrop: true,
      closeOnBackdrop: true,
      closeOnEscape: true
    });
    
    modal.modalInstance = modalInstance;
  });
  
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
});

// Exportar a window
window.GHL = {
  Utils,
  FormValidator,
  Toast,
  Modal,
  ScrollAnimation
};

console.log('Go High Level Customization inicializado correctamente');
