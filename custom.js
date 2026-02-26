/**
 * GoHighLevel Customization - ARM Project
 * Version: 17.0 (Conservative Base)
 *
 * Intentionally minimal:
 * - No icon manipulation
 * - No MutationObserver
 * - No visibility/color forcing
 */

(function () {
    'use strict';

    function init() {
        console.log('%c ARM JS v17.0 (Conservative Base) LOADED ', 'background:#b9c8ee;color:#1f2937;padding:4px 8px;');
        document.documentElement.setAttribute('data-arm-skin', '17.0');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
