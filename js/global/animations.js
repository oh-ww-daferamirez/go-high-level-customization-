/* ===================================
   ANIMACIONES GLOBALES
   Go High Level Customization
   =================================== */

/**
 * Clase para animaciones de scroll
 */
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

    // Crear Intersection Observer
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

    // Observar todos los elementos
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

/**
 * Clase para animaciones de fade in
 */
class FadeInAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: 300,
      delay: 0,
      easing: 'ease-in-out',
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.opacity = '0';
    this.element.style.transition = `opacity ${this.options.duration}ms ${this.options.easing}`;
  }

  animate() {
    setTimeout(() => {
      this.element.style.opacity = '1';
    }, this.options.delay);
  }

  reset() {
    this.element.style.opacity = '0';
  }
}

/**
 * Clase para animaciones de slide
 */
class SlideAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      direction: 'up', // up, down, left, right
      duration: 300,
      delay: 0,
      easing: 'ease-in-out',
      distance: 30,
      ...options
    };
    this.init();
  }

  init() {
    const transform = this.getTransform();
    this.element.style.opacity = '0';
    this.element.style.transform = transform;
    this.element.style.transition = `opacity ${this.options.duration}ms ${this.options.easing}, transform ${this.options.duration}ms ${this.options.easing}`;
  }

  getTransform() {
    switch (this.options.direction) {
      case 'up':
        return `translateY(${this.options.distance}px)`;
      case 'down':
        return `translateY(-${this.options.distance}px)`;
      case 'left':
        return `translateX(${this.options.distance}px)`;
      case 'right':
        return `translateX(-${this.options.distance}px)`;
      default:
        return `translateY(${this.options.distance}px)`;
    }
  }

  animate() {
    setTimeout(() => {
      this.element.style.opacity = '1';
      this.element.style.transform = 'translate(0, 0)';
    }, this.options.delay);
  }

  reset() {
    const transform = this.getTransform();
    this.element.style.opacity = '0';
    this.element.style.transform = transform;
  }
}

/**
 * Clase para animaciones de scale
 */
class ScaleAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      from: 0.8,
      to: 1,
      duration: 300,
      delay: 0,
      easing: 'ease-in-out',
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.transform = `scale(${this.options.from})`;
    this.element.style.transition = `transform ${this.options.duration}ms ${this.options.easing}`;
  }

  animate() {
    setTimeout(() => {
      this.element.style.transform = `scale(${this.options.to})`;
    }, this.options.delay);
  }

  reset() {
    this.element.style.transform = `scale(${this.options.from})`;
  }
}

/**
 * Clase para animaciones de rotación
 */
class RotateAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      from: 0,
      to: 360,
      duration: 1000,
      delay: 0,
      easing: 'ease-in-out',
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.transform = `rotate(${this.options.from}deg)`;
    this.element.style.transition = `transform ${this.options.duration}ms ${this.options.easing}`;
  }

  animate() {
    setTimeout(() => {
      this.element.style.transform = `rotate(${this.options.to}deg)`;
    }, this.options.delay);
  }

  reset() {
    this.element.style.transform = `rotate(${this.options.from}deg)`;
  }
}

/**
 * Clase para animaciones de bounce
 */
class BounceAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: 500,
      delay: 0,
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.animation = 'none';
  }

  animate() {
    setTimeout(() => {
      this.element.style.animation = `ghl-bounce ${this.options.duration}ms ease-in-out`;
    }, this.options.delay);
  }

  reset() {
    this.element.style.animation = 'none';
  }
}

/**
 * Clase para animaciones de shake
 */
class ShakeAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: 500,
      delay: 0,
      intensity: 5,
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.animation = 'none';
  }

  animate() {
    setTimeout(() => {
      this.element.style.animation = `ghl-shake ${this.options.duration}ms ease-in-out`;
    }, this.options.delay);
  }

  reset() {
    this.element.style.animation = 'none';
  }
}

/**
 * Clase para animaciones de pulse
 */
class PulseAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: 1000,
      delay: 0,
      ...options
    };
    this.init();
  }

  init() {
    this.element.style.animation = 'none';
  }

  animate() {
    setTimeout(() => {
      this.element.style.animation = `ghl-pulse ${this.options.duration}ms ease-in-out infinite`;
    }, this.options.delay);
  }

  reset() {
    this.element.style.animation = 'none';
  }
}

/**
 * Clase para animaciones de typing effect
 */
class TypingAnimation {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.options = {
      speed: 50,
      delay: 0,
      cursor: '|',
      showCursor: true,
      ...options
    };
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.element.textContent = '';
    if (this.options.showCursor) {
      this.element.textContent = this.options.cursor;
    }
  }

  animate() {
    setTimeout(() => {
      this.type();
    }, this.options.delay);
  }

  type() {
    if (this.currentIndex < this.text.length) {
      const currentText = this.text.substring(0, this.currentIndex + 1);
      this.element.textContent = this.options.showCursor 
        ? currentText + this.options.cursor 
        : currentText;
      this.currentIndex++;
      setTimeout(() => this.type(), this.options.speed);
    }
  }

  reset() {
    this.currentIndex = 0;
    this.element.textContent = '';
    if (this.options.showCursor) {
      this.element.textContent = this.options.cursor;
    }
  }
}

/**
 * Clase para animaciones de contador
 */
class AnimatedCounter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      startValue: 0,
      endValue: 100,
      duration: 2000,
      delay: 0,
      prefix: '',
      suffix: '',
      decimals: 0,
      ...options
    };
    this.currentValue = this.options.startValue;
    this.startTime = null;
    this.init();
  }

  init() {
    this.element.textContent = this.formatNumber(this.options.startValue);
  }

  animate() {
    setTimeout(() => {
      this.startTime = performance.now();
      requestAnimationFrame((timestamp) => this.update(timestamp));
    }, this.options.delay);
  }

  update(timestamp) {
    const elapsed = timestamp - this.startTime;
    const progress = Math.min(elapsed / this.options.duration, 1);
    
    // Easing function (ease-out)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    this.currentValue = this.options.startValue + 
      (this.options.endValue - this.options.startValue) * easeProgress;
    
    this.element.textContent = this.formatNumber(this.currentValue);
    
    if (progress < 1) {
      requestAnimationFrame((timestamp) => this.update(timestamp));
    }
  }

  formatNumber(value) {
    const formatted = value.toFixed(this.options.decimals);
    return `${this.options.prefix}${formatted}${this.options.suffix}`;
  }

  reset() {
    this.currentValue = this.options.startValue;
    this.element.textContent = this.formatNumber(this.options.startValue);
  }
}

/**
 * Clase para animaciones de countdown
 */
class CountdownTimer {
  constructor(element, targetDate, options = {}) {
    this.element = element;
    this.targetDate = new Date(targetDate);
    this.options = {
      format: 'd:h:m:s', // d:h:m:s, h:m:s, m:s
      onTick: null,
      onComplete: null,
      ...options
    };
    this.interval = null;
    this.init();
  }

  init() {
    this.update();
  }

  start() {
    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update() {
    const now = new Date();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.stop();
      this.element.textContent = '00:00:00';
      if (this.options.onComplete) {
        this.options.onComplete();
      }
      return;
    }

    const time = this.calculateTime(diff);
    const formatted = this.formatTime(time);
    this.element.textContent = formatted;

    if (this.options.onTick) {
      this.options.onTick(time);
    }
  }

  calculateTime(diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  formatTime(time) {
    const pad = (num) => num.toString().padStart(2, '0');
    
    switch (this.options.format) {
      case 'd:h:m:s':
        return `${pad(time.days)}:${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
      case 'h:m:s':
        return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
      case 'm:s':
        return `${pad(time.minutes)}:${pad(time.seconds)}`;
      default:
        return `${pad(time.days)}:${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
    }
  }

  reset() {
    this.stop();
    this.update();
  }
}

/**
 * Clase para animaciones de parallax
 */
class ParallaxEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      speed: 0.5,
      direction: 'vertical', // vertical, horizontal
      ...options
    };
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const rect = this.element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const windowHeight = window.innerHeight;
    const scrollY = scrollTop - elementTop;

    if (this.options.direction === 'vertical') {
      const translateY = scrollY * this.options.speed;
      this.element.style.transform = `translateY(${translateY}px)`;
    } else {
      const translateX = scrollY * this.options.speed;
      this.element.style.transform = `translateX(${translateX}px)`;
    }
  }

  destroy() {
    window.removeEventListener('scroll', () => this.update());
  }
}

/**
 * Clase para animaciones de sticky
 */
class StickyAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      offset: 0,
      className: 'is-sticky',
      onSticky: null,
      onUnsticky: null,
      ...options
    };
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const rect = this.element.getBoundingClientRect();
    const isSticky = rect.top <= this.options.offset;

    if (isSticky) {
      this.element.classList.add(this.options.className);
      if (this.options.onSticky) {
        this.options.onSticky(this.element);
      }
    } else {
      this.element.classList.remove(this.options.className);
      if (this.options.onUnsticky) {
        this.options.onUnsticky(this.element);
      }
    }
  }

  destroy() {
    window.removeEventListener('scroll', () => this.update());
  }
}

// Agregar keyframes de animación al documento
const style = document.createElement('style');
style.textContent = `
  @keyframes ghl-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes ghl-shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  }

  @keyframes ghl-pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;
document.head.appendChild(style);

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ScrollAnimation,
    FadeInAnimation,
    SlideAnimation,
    ScaleAnimation,
    RotateAnimation,
    BounceAnimation,
    ShakeAnimation,
    PulseAnimation,
    TypingAnimation,
    AnimatedCounter,
    CountdownTimer,
    ParallaxEffect,
    StickyAnimation
  };
}
