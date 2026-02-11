/**
 * GoHighLevel Customization - ARM Project
 * Version: 8.0 (High Contrast Support)
 */

(function () {
    'use strict';

    const CONFIG = {
        targetColor: '#424A71', // Indigo Gray BG
        activeColor: '#818CF8', // Light Purple Accents
        hidingCSS: `
            #app #hl_header--help-icon, #app [class*="help-icon"], #app [class*="ai-assistant"], #app #canny_logs-toggle { display: none !important; }
        `
    };

    // --- ENFORCER LOGIC ---
    function applyImportantStyle(element, property, value) {
        if (!element) return;
        element.style.setProperty(property, value, 'important');
    }

    function forceSidebarColor() {
        const selectors = [
            '#sidebar-v2',
            '.sidebar-v2',
            '.sidebar-v2-location #sidebar-v2',
            'aside',
            '.hl_nav_sidebar',
            '.hl_settings--sidebar',
            '.settings-sidebar',
            '.n-layout-sider',
            'div[class*="sidebar"]',
            '#app .flex.flex-col.w-64.border-r'
        ];

        selectors.forEach(sel => {
            const elements = document.querySelectorAll(sel);
            elements.forEach(el => {
                applyImportantStyle(el, 'background-color', CONFIG.targetColor);
                applyImportantStyle(el, 'background', CONFIG.targetColor);
                applyImportantStyle(el, 'background-image', 'none');
                applyImportantStyle(el, 'border-right', '1px solid #363d5e');

                // Force children text logic would be too heavy here, relying on CSS v11.0
            });
        });
    }

    function init() {
        console.clear();
        console.log("%c ARM Custom Skin v8.0 (High Contrast) LOADED ", "background: #818CF8; color: #fff; font-size: 16px; padding: 8px;");

        // Inject hiding CSS
        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        forceSidebarColor();

        // Poll
        setInterval(forceSidebarColor, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();