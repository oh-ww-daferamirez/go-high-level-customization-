/**
 * GoHighLevel Customization - ARM Project
 * Version: 15.0 (Clean Logic)
 * 
 * Logic:
 * 1. Hide unwanted UI elements (Help, Branding).
 * 2. NO COLOR ENFORCEMENTS.
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
        console.log("%c ARM JS v15.0 (Clean Slate) LOADED ", "background: #333; color: #fff; font-size: 16px; padding: 6px;");

        // Inject Hiding CSS
        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        // NO LOOPS. NO COLOR FORCING.
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();