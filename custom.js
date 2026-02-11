/**
 * GoHighLevel Customization - ARM Project
 * Version: 7.0 (CACHE BUSTER EDITION)
 * 
 * IF YOU SEE THIS, THE UPDATE WORKED.
 */

(function () {
    'use strict';

    const CONFIG = {
        targetColor: '#424A71', // Indigo Gray
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
        // Broad selector list
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
            });
        });
    }

    function init() {
        // LOUD LOGGING FOR DEBUGGING
        console.clear();
        console.log("%c ARM Custom Skin v7.0 LOADED SUCCESSFULLY ", "background: #424A71; color: #fff; font-size: 20px; padding: 10px;");
        console.log("Checking for Settings Sidebar...");

        forceSidebarColor();

        // Poll regularly
        setInterval(() => {
            forceSidebarColor();
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();