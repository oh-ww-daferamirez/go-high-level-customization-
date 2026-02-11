/**
 * GoHighLevel Customization - ARM Project
 * Version: 10.0 (The Text Hunter)
 * 
 * Logic:
 * 1. Find the "Search for a sub-account" text.
 * 2. Force its container and lists to have DARK Text.
 * 3. General Sidebar Color enforcement.
 */

(function () {
    'use strict';

    const CONFIG = {
        targetColor: 'var(--arm-surface-sidebar)',
        darkText: '#111827',
        whiteText: '#FFFFFF',
        hidingCSS: `
            #app #hl_header--help-icon, #app [class*="help-icon"], #app [class*="ai-assistant"], #app #canny_logs-toggle { display: none !important; }
        `
    };

    function applyImportantStyle(element, property, value) {
        if (!element) return;
        element.style.setProperty(property, value, 'important');
    }

    // --- STRATEGY 1: Main Sidebar Enforcer ---
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
                applyImportantStyle(el, 'background-image', 'none');
            });
        });
    }

    // --- STRATEGY 2: The Text Hunter (Fixes White-on-White Dropdowns) ---
    function fixDropdownContrast() {
        // 1. Find the Search Header identified in screenshot
        // We look for elements containing specific text
        const searchHeaders = Array.from(document.querySelectorAll('*')).filter(el =>
            el.children.length === 0 && // Leaf nodes usually
            el.textContent &&
            el.textContent.includes('Search for a sub-account')
        );

        searchHeaders.forEach(header => {
            // Traverse up to find the main dropdown container (usually a white box)
            // It's likely 3-4 parents up. We check for white background.
            let container = header.parentElement;
            let found = false;

            for (let i = 0; i < 5; i++) { // Check 5 levels up
                if (!container) break;
                const style = window.getComputedStyle(container);
                if (style.backgroundColor === 'rgb(255, 255, 255)' || style.backgroundColor === '#ffffff') {
                    // FOUND THE WHITE BOX!
                    applyImportantStyle(container, 'color', CONFIG.darkText);

                    // Force all its children too
                    const allChildren = container.querySelectorAll('*');
                    allChildren.forEach(child => {
                        // Don't darken the active blue items or buttons
                        if (!child.classList.contains('active') && !child.tagName.includes('BUTTON')) {
                            applyImportantStyle(child, 'color', CONFIG.darkText);
                        }
                    });
                    found = true;
                    // Keep looking in case there's an outer wrapper
                }
                container = container.parentElement;
            }
        });
    }

    function init() {
        console.clear();
        console.log("%c ARM JS v10.0 (Contrast Hunter) LOADED ", "background: #10B981; color: #fff; font-size: 16px; padding: 6px;");

        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        // Run Loops
        setInterval(() => {
            forceSidebarColor();
            fixDropdownContrast(); // Run the hunter
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();