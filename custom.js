/**
 * GoHighLevel Customization - ARM Project
 * Version: 11.0 (Precision Logic)
 * 
 * Logic:
 * 1. Simple Background Enforcer (No aggressive text policing).
 * 2. Sanitize UI.
 */

(function () {
    'use strict';

    const CONFIG = {
        targetColor: 'var(--arm-surface-sidebar)',
        hidingCSS: `
            #app #hl_header--help-icon, #app [class*="help-icon"], #app [class*="ai-assistant"], #app #canny_logs-toggle { display: none !important; }
        `
    };

    function applyImportantStyle(element, property, value) {
        if (!element) return;
        element.style.setProperty(property, value, 'important');
    }

    function forceSidebarColor() {
        const selectors = [
            '#sidebar-v2', '.sidebar-v2-location #sidebar-v2', 'aside',
            '.hl_nav_sidebar', '.hl_settings--sidebar', '.n-layout-sider',
            'div[class*="sidebar"]', '#app .flex.flex-col.w-64.border-r'
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                applyImportantStyle(el, 'background-color', CONFIG.targetColor);
                applyImportantStyle(el, 'background', CONFIG.targetColor);
                applyImportantStyle(el, 'border-right', '1px solid rgba(255,255,255,0.1)');
                // We DO NOT force color: white explicitly here anymore to avoid bleeding.
                // We let CSS v16.0 handle the text color on specific children.
            });
        });
    }

    function init() {
        console.clear();
        console.log("%c ARM JS v11.0 (Precision) LOADED ", "background: #818CF8; color: #fff; font-size: 16px; padding: 6px;");

        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        // Run Loop
        setInterval(forceSidebarColor, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();