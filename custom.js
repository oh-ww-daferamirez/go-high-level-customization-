/**
 * GoHighLevel Customization - ARM Project
 * Version: 2.4 (Fail-Safe Build)
 * 
 * This version includes a JS-based hiding mechanism in case CSS doesn't load.
 */

(function () {
    'use strict';

    const CONFIG = {
        favicon: "https://placehold.co/32x32?text=ARM",
        selectorsToHide: [
            '#hl_header--help-icon',
            '.hl_header--ai-assistant',
            '#canny_logs-toggle',
            '.hl_header--recent-activities',
            '[id*="help-icon"]',
            '[class*="ai-assistant"]',
            '[id*="canny"]'
        ]
    };

    function hideElements() {
        CONFIG.selectorsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.width = '0';
                el.style.pointerEvents = 'none';
            });
        });
    }

    function init() {
        console.log("ARM Custom Skin v2.4: Initializing...");
        updateFavicon();
        hideElements();

        // Continuous observer to handle GHL dynamic loading
        const observer = new MutationObserver(hideElements);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function updateFavicon() {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = CONFIG.favicon;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();