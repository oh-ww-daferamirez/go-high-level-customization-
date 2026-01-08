/* ===================================
   COMPONENTES DE FORMULARIOS
   Go High Level Customization
   =================================== */

/**
 * Clase para validación de formularios
 */
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
    // Agregar event listeners
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Validar en tiempo real
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

    // Validación required
    if (rules.required && !value) {
      isValid = false;
      errorMessage = rules.requiredMessage || 'Este campo es requerido';
    }

    // Validación email
    if (isValid && rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = rules.emailMessage || 'Por favor ingresa un email válido';
      }
    }

    // Validación minLength
    if (isValid && rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = rules.minLengthMessage || `Mínimo ${rules.minLength} caracteres`;
    }

    // Validación maxLength
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = rules.maxLengthMessage || `Máximo ${rules.maxLength} caracteres`;
    }

    // Validación pattern
    if (isValid && rules.pattern && value) {
      if (!rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.patternMessage || 'Formato inválido';
      }
    }

    // Validación custom
    if (isValid && rules.validate && typeof rules.validate === 'function') {
      const customValidation = rules.validate(value, input);
      if (!customValidation.isValid) {
        isValid = false;
        errorMessage = customValidation.message || 'Valor inválido';
      }
    }

    // Actualizar estado del campo
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
    // Remover clases anteriores
    input.classList.remove(this.options.errorClass, this.options.successClass);
    
    // Remover mensaje de error anterior
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

/**
 * Clase para notificaciones Toast
 */
class Toast {
  constructor(message, options = {}) {
    this.message = message;
    this.options = {
      type: 'info', // success, error, warning, info
      duration: 3000,
      position: 'top-right', // top-right, top-left, bottom-right, bottom-left
      showClose: true,
      ...options
    };
    this.element = null;
    this.timeout = null;
  }

  show() {
    // Crear elemento del toast
    this.element = document.createElement('div');
    this.element.className = `ghl-toast ghl-toast-${this.options.type} ghl-toast-${this.options.position}`;
    this.element.innerHTML = `
      <div class="ghl-toast-content">
        <div class="ghl-toast-icon">${this.getIcon()}</div>
        <div class="ghl-toast-message">${this.message}</div>
        ${this.options.showClose ? '<button class="ghl-toast-close">&times;</button>' : ''}
      </div>
    `;

    // Agregar estilos
    this.addStyles();

    // Agregar al DOM
    document.body.appendChild(this.element);

    // Animar entrada
    setTimeout(() => {
      this.element.classList.add('ghl-toast-show');
    }, 10);

    // Agregar event listeners
    if (this.options.showClose) {
      const closeBtn = this.element.querySelector('.ghl-toast-close');
      closeBtn.addEventListener('click', () => this.hide());
    }

    // Auto ocultar
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

/**
 * Clase para modales
 */
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
    // Agregar estilos
    this.addStyles();

    // Buscar botón de cierre
    const closeBtn = this.element.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Cerrar al hacer clic en el backdrop
    if (this.options.closeOnBackdrop) {
      this.element.addEventListener('click', (e) => {
        if (e.target === this.element) {
          this.close();
        }
      });
    }

    // Cerrar con Escape
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

    // Crear backdrop
    if (this.options.backdrop) {
      this.createBackdrop();
    }

    // Mostrar modal
    this.element.style.display = 'flex';
    setTimeout(() => {
      this.element.classList.add('ghl-modal-open');
    }, 10);

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    this.isOpen = true;

    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    if (!this.isOpen) return;

    // Ocultar modal
    this.element.classList.remove('ghl-modal-open');
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 300);

    // Remover backdrop
    if (this.backdrop) {
      this.removeBackdrop();
    }

    // Restaurar scroll del body
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

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FormValidator,
    Toast,
    Modal
  };
}
