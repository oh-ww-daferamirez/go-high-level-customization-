/**
 * GoHighLevel Customization - ARM Project
 * Version: 2.5 (Conditional Role Build)
 * 
 * This version hides GHL elements ONLY for regular users.
 * Admins/Agency owners will still see them for support and maintenance.
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

    /**
     * Detects if the current user should have "Admin" visibility.
     * Returns true if the user is in Agency view or has Admin attributes.
     */
    function isAdmin() {
        // 1. Check if URL contains 'agency'
        if (window.location.href.includes('/v2/location/agency')) return true;

        // 2. Check GHL Global User Object (if available)
        if (window.user && (window.user.role === 'admin' || window.user.type === 'agency')) return true;

        // 3. Check for specific GHL body classes that indicate agency context
        if (document.body.classList.contains('agency-view')) return true;

        return false;
    }

    function hideElements() {
        // Only hide if NOT an admin
        if (isAdmin()) {
            console.log("ARM Custom Skin: Admin detected. Showing all tools.");
            return;
        }

        CONFIG.selectorsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none !important'; // CSS property direct
                el.style.setProperty('display', 'none', 'important');
                el.style.visibility = 'hidden';
            });
        });
    }

    function init() {
        console.log("ARM Custom Skin v2.5: Initializing...");
        updateFavicon();

        // Initial run
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