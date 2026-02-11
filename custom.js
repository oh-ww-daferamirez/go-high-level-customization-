/**
 * GoHighLevel Customization - ARM Project
 * Version: 16.0 (Functional Only)
 * 
 * Logic:
 * 1. Hide unwanted UI elements (Help, Branding).
 * 2. No Color Force.
 */

(function () {
    'use strict';

    const CONFIG = {
        hidingCSS: `
            #app #hl_header--help-icon, 
            #app [class*="help-icon"], 
            #app [class*="ai-assistant"], 
            #app #canny_logs-toggle { 
                display: none !important; 
            }
        `
    };

    function init() {
        console.clear();
        console.log("%c ARM JS v16.0 (Ethereal Ready) LOADED ", "background: #abc4ff; color: #374151; font-size: 16px; padding: 6px;");

        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();