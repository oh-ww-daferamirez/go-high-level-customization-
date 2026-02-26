/**
 * GoHighLevel Customization - ARM Project
 * Version: 16.2 (Icon Neutral Visibility Recovery)
 *
 * Logic:
 * 1. Hide unwanted UI elements (Help, Branding).
 * 2. Force visibility recovery on sidebar/cards/header after GHL re-renders.
 * 3. Keep icons as native/neutral (no custom recolor).
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
        `,
        sidebarColor: '#374151',
        sidebarActiveColor: '#4f46e5'
    };

    let observer;
    let scheduled = false;

    function neutralizeSvg(svg) {
        if (!svg) return;
        svg.style.opacity = '1';
        svg.style.removeProperty('color');
        svg.style.removeProperty('fill');
        svg.style.removeProperty('stroke');
    }

    function fixSidebar() {
        const links = document.querySelectorAll('#sidebar-v2 .nav-link, .hl_settings--sidebar .nav-link, aside .nav-link');
        links.forEach(link => {
            const isActive = link.classList.contains('active') || link.getAttribute('aria-current') === 'page';
            const color = isActive ? CONFIG.sidebarActiveColor : CONFIG.sidebarColor;

            link.style.opacity = '1';
            link.style.color = color;

            link.querySelectorAll('*').forEach(node => {
                if (!(node instanceof HTMLElement) && !(node instanceof SVGElement)) return;

                if (node instanceof HTMLElement) {
                    node.style.opacity = '1';
                    if (!node.closest('.hl_header, #app header')) {
                        node.style.color = 'inherit';
                    }
                }

                if (node instanceof SVGElement) {
                    neutralizeSvg(node);
                }
            });
        });
    }

    function fixCards() {
        const wrappers = document.querySelectorAll(
            '.card [class*="rounded-full"], .hl-card [class*="rounded-full"], .n-card [class*="rounded-full"], [class*="card"] [class*="rounded-full"]'
        );

        wrappers.forEach(el => {
            if (!(el instanceof HTMLElement)) return;
            if (el.classList.contains('hl_header_avatar') || el.classList.contains('avatar')) return;

            /* Leave card icon wrappers and icons close to native appearance */
            el.style.removeProperty('background-color');
            el.style.removeProperty('color');
            el.style.opacity = '1';

            el.querySelectorAll('svg').forEach(svg => neutralizeSvg(svg));
            el.querySelectorAll('i').forEach(icon => {
                if (!(icon instanceof HTMLElement)) return;
                icon.style.opacity = '1';
                icon.style.removeProperty('color');
            });
        });
    }

    function fixHeader() {
        const header = document.querySelector('#app header, .hl_header');
        if (!header) return;

        header.querySelectorAll('svg, i').forEach(icon => {
            if (!(icon instanceof HTMLElement) && !(icon instanceof SVGElement)) return;
            icon.style.opacity = '1';
            if (icon instanceof SVGElement) {
                neutralizeSvg(icon);
            } else {
                icon.style.removeProperty('color');
            }
        });
    }

    function applyVisibilityRecovery() {
        document.documentElement.setAttribute('data-arm-visibility-fix', '16.2');
        document.documentElement.setAttribute('data-arm-icon-neutral', '1');
        fixSidebar();
        fixCards();
        fixHeader();
    }

    function scheduleApply() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            applyVisibilityRecovery();
        });
    }

    function startObserver() {
        if (observer) observer.disconnect();
        observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.type === 'childList' || (m.type === 'attributes' && (m.attributeName === 'class' || m.attributeName === 'style'))) {
                    scheduleApply();
                    break;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }

    function init() {
        console.clear();
        console.log("%c ARM JS v16.2 (Icon Neutral Visibility Recovery) LOADED ", "background: #abc4ff; color: #374151; font-size: 16px; padding: 6px;");

        const style = document.createElement('style');
        style.textContent = CONFIG.hidingCSS;
        document.head.appendChild(style);

        applyVisibilityRecovery();
        startObserver();
        setTimeout(applyVisibilityRecovery, 400);
        setTimeout(applyVisibilityRecovery, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
