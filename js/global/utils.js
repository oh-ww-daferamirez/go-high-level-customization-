/* ===================================
   UTILIDADES GLOBALES
   Go High Level Customization
   =================================== */

/**
 * Clase de utilidades para funciones comunes
 */
class Utils {
  /**
   * Debounce function para limitar la frecuencia de ejecución
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @returns {Function} Función debounced
   */
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

  /**
   * Throttle function para limitar la frecuencia de ejecución
   * @param {Function} func - Función a ejecutar
   * @param {number} limit - Límite de tiempo en ms
   * @returns {Function} Función throttled
   */
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

  /**
   * Genera un ID único
   * @returns {string} ID único
   */
  static generateId() {
    return 'ghl-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Verifica si un elemento está en el viewport
   * @param {HTMLElement} element - Elemento a verificar
   * @returns {boolean} True si está en el viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Añade una clase a un elemento con delay
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Clase a añadir
   * @param {number} delay - Delay en ms
   */
  static addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
      element.classList.add(className);
    }, delay);
  }

  /**
   * Remueve una clase de un elemento con delay
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Clase a remover
   * @param {number} delay - Delay en ms
   */
  static removeClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
      element.classList.remove(className);
    }, delay);
  }

  /**
   * Toggle de clase en un elemento
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Clase a toggle
   */
  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  /**
   * Verifica si un elemento tiene una clase
   * @param {HTMLElement} element - Elemento
   * @param {string} className - Clase a verificar
   * @returns {boolean} True si tiene la clase
   */
  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  /**
   * Añade múltiples clases a un elemento
   * @param {HTMLElement} element - Elemento
   * @param {Array<string>} classes - Array de clases
   */
  static addClasses(element, classes) {
    classes.forEach(className => element.classList.add(className));
  }

  /**
   * Remueve múltiples clases de un elemento
   * @param {HTMLElement} element - Elemento
   * @param {Array<string>} classes - Array de clases
   */
  static removeClasses(element, classes) {
    classes.forEach(className => element.classList.remove(className));
  }

  /**
   * Obtiene el valor de una variable CSS
   * @param {string} variableName - Nombre de la variable CSS
   * @param {HTMLElement} element - Elemento (opcional, por defecto document.documentElement)
   * @returns {string} Valor de la variable CSS
   */
  static getCSSVariable(variableName, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue(variableName).trim();
  }

  /**
   * Establece el valor de una variable CSS
   * @param {string} variableName - Nombre de la variable CSS
   * @param {string} value - Valor de la variable CSS
   * @param {HTMLElement} element - Elemento (opcional, por defecto document.documentElement)
   */
  static setCSSVariable(variableName, value, element = document.documentElement) {
    element.style.setProperty(variableName, value);
  }

  /**
   * Copia texto al portapapeles
   * @param {string} text - Texto a copiar
   * @returns {Promise<boolean>} True si se copió exitosamente
   */
  static async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback para navegadores antiguos
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

  /**
   * Formatea un número con separadores de miles
   * @param {number} number - Número a formatear
   * @param {string} locale - Locale (opcional, por defecto 'es-ES')
   * @returns {string} Número formateado
   */
  static formatNumber(number, locale = 'es-ES') {
    return new Intl.NumberFormat(locale).format(number);
  }

  /**
   * Formatea una moneda
   * @param {number} amount - Cantidad a formatear
   * @param {string} currency - Moneda (opcional, por defecto 'EUR')
   * @param {string} locale - Locale (opcional, por defecto 'es-ES')
   * @returns {string} Moneda formateada
   */
  static formatCurrency(amount, currency = 'EUR', locale = 'es-ES') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Formatea una fecha
   * @param {Date|string} date - Fecha a formatear
   * @param {Object} options - Opciones de formato (opcional)
   * @param {string} locale - Locale (opcional, por defecto 'es-ES')
   * @returns {string} Fecha formateada
   */
  static formatDate(date, options = {}, locale = 'es-ES') {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
  }

  /**
   * Valida un email
   * @param {string} email - Email a validar
   * @returns {boolean} True si es válido
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida un número de teléfono
   * @param {string} phone - Teléfono a validar
   * @returns {boolean} True si es válido
   */
  static isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Valida una URL
   * @param {string} url - URL a validar
   * @returns {boolean} True si es válida
   */
  static isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Escapa caracteres HTML especiales
   * @param {string} text - Texto a escapar
   * @returns {string} Texto escapado
   */
  static escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Desescapa caracteres HTML especiales
   * @param {string} text - Texto a desescapar
   * @returns {string} Texto desescapado
   */
  static unescapeHTML(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
  }

  /**
   * Trunca un texto
   * @param {string} text - Texto a truncar
   * @param {number} maxLength - Longitud máxima
   * @param {string} suffix - Sufijo (opcional, por defecto '...')
   * @returns {string} Texto truncado
   */
  static truncate(text, maxLength, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  }

  /**
   * Capitaliza la primera letra de un texto
   * @param {string} text - Texto a capitalizar
   * @returns {string} Texto capitalizado
   */
  static capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  /**
   * Convierte un texto a camelCase
   * @param {string} text - Texto a convertir
   * @returns {string} Texto en camelCase
   */
  static toCamelCase(text) {
    return text
      .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/^(.)/, c => c.toLowerCase());
  }

  /**
   * Convierte un texto a kebab-case
   * @param {string} text - Texto a convertir
   * @returns {string} Texto en kebab-case
   */
  static toKebabCase(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  /**
   * Convierte un texto a snake_case
   * @param {string} text - Texto a convertir
   * @returns {string} Texto en snake_case
   */
  static toSnakeCase(text) {
    return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  /**
   * Genera un color aleatorio
   * @returns {string} Color en formato HEX
   */
  static randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * Convierte HEX a RGB
   * @param {string} hex - Color en formato HEX
   * @returns {Object} Objeto con valores r, g, b
   */
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Convierte RGB a HEX
   * @param {number} r - Valor rojo (0-255)
   * @param {number} g - Valor verde (0-255)
   * @param {number} b - Valor azul (0-255)
   * @returns {string} Color en formato HEX
   */
  static rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Calcula el brillo de un color
   * @param {string} hex - Color en formato HEX
   * @returns {number} Brillo (0-255)
   */
  static getBrightness(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  /**
   * Determina si un color es claro u oscuro
   * @param {string} hex - Color en formato HEX
   * @returns {boolean} True si es claro
   */
  static isLightColor(hex) {
    return this.getBrightness(hex) > 128;
  }

  /**
   * Hace scroll suave a un elemento
   * @param {HTMLElement} element - Elemento al que hacer scroll
   * @param {Object} options - Opciones de scroll (opcional)
   */
  static scrollToElement(element, options = {}) {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    };
    element.scrollIntoView({ ...defaultOptions, ...options });
  }

  /**
   * Hace scroll al inicio de la página
   */
  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Hace scroll al final de la página
   */
  static scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  /**
   * Obtiene parámetros de la URL
   * @returns {Object} Objeto con los parámetros
   */
  static getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Establece parámetros en la URL
   * @param {Object} params - Objeto con los parámetros
   */
  static setURLParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      url.searchParams.set(key, params[key]);
    });
    window.history.pushState({}, '', url);
  }

  /**
   * Remueve parámetros de la URL
   * @param {Array<string>} params - Array de parámetros a remover
   */
  static removeURLParams(params) {
    const url = new URL(window.location);
    params.forEach(param => {
      url.searchParams.delete(param);
    });
    window.history.pushState({}, '', url);
  }

  /**
   * Guarda datos en localStorage
   * @param {string} key - Clave
   * @param {any} value - Valor
   */
  static setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error al guardar en localStorage:', err);
    }
  }

  /**
   * Obtiene datos de localStorage
   * @param {string} key - Clave
   * @returns {any} Valor
   */
  static getLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error al obtener de localStorage:', err);
      return null;
    }
  }

  /**
   * Remueve datos de localStorage
   * @param {string} key - Clave
   */
  static removeLocalStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error al remover de localStorage:', err);
    }
  }

  /**
   * Limpia localStorage
   */
  static clearLocalStorage() {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error al limpiar localStorage:', err);
    }
  }

  /**
   * Guarda datos en sessionStorage
   * @param {string} key - Clave
   * @param {any} value - Valor
   */
  static setSessionStorage(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error al guardar en sessionStorage:', err);
    }
  }

  /**
   * Obtiene datos de sessionStorage
   * @param {string} key - Clave
   * @returns {any} Valor
   */
  static getSessionStorage(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error al obtener de sessionStorage:', err);
      return null;
    }
  }

  /**
   * Remueve datos de sessionStorage
   * @param {string} key - Clave
   */
  static removeSessionStorage(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.error('Error al remover de sessionStorage:', err);
    }
  }

  /**
   * Limpia sessionStorage
   */
  static clearSessionStorage() {
    try {
      sessionStorage.clear();
    } catch (err) {
      console.error('Error al limpiar sessionStorage:', err);
    }
  }

  /**
   * Detecta si el dispositivo es móvil
   * @returns {boolean} True si es móvil
   */
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Detecta si el dispositivo es tablet
   * @returns {boolean} True si es tablet
   */
  static isTablet() {
    return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
  }

  /**
   * Detecta si el dispositivo es desktop
   * @returns {boolean} True si es desktop
   */
  static isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }

  /**
   * Obtiene el sistema operativo
   * @returns {string} Sistema operativo
   */
  static getOS() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    if (userAgent.indexOf('Android') !== -1) return 'Android';
    if (userAgent.indexOf('like Mac') !== -1) return 'iOS';
    return 'Unknown';
  }

  /**
   * Obtiene el navegador
   * @returns {string} Navegador
   */
  static getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Chrome') !== -1) return 'Chrome';
    if (userAgent.indexOf('Safari') !== -1) return 'Safari';
    if (userAgent.indexOf('Firefox') !== -1) return 'Firefox';
    if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) return 'IE';
    return 'Unknown';
  }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
