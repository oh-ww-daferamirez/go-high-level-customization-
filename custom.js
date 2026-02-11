/**
 * GoHighLevel Customization - ARM Project
 * Version: 9.0 (System Design Support)
 * 
 * Logic:
 * 1. Enforce Sidebar Color using the CSS Token var(--arm-surface-sidebar).
 * 2. Sanitize UI (Hide branding).
 */

(function () {
    'use strict';

    const CONFIG = {
        // Use CSS Variable to ensure JS matches Custom CSS Single Source of Truth
        targetColor: 'var(--arm-surface-sidebar)',
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
            'div[class*="sidebar"]', // Generic
            '#app .flex.flex-col.w-64.border-r' // Tailwind layout
        ];

        selectors.forEach(sel => {
            const elements = document.querySelectorAll(sel);
            elements.forEach(el => {
                // Apply the CSS Variable directly!
                applyImportantStyle(el, 'background-color', CONFIG.targetColor);
                applyImportantStyle(el, 'background', CONFIG.targetColor);
                applyImportantStyle(el, 'border-right', '1px solid rgba(255,255,255,0.1)'); // Matches CSS

                // Ensure no image overrides
                applyImportantStyle(el, 'background-image', 'none');
            });
        });
    }

    function init() {
        console.clear();
        console.log("%c ARM UI Kit v9.0 (System Design) LOADED ", "background: #818CF8; color: #fff; font-size: 14px; padding: 6px;");

        // Inject hiding CSS
        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        // Run Enforcer
        forceSidebarColor();
        setInterval(forceSidebarColor, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();