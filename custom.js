/**
 * GoHighLevel Customization - ARM Project
 * Version: 2.0 (Clean Build)
 * 
 * This script handles dynamic logic for the custom skin.
 * It does NOT inject a custom sidebar, relying instead on CSS for visual customization.
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        favicon: "https://placehold.co/32x32?text=ARM", // Replace with real URL when available
        brandName: "ARM Custom Skin"
    };

    /**
     * Initialize Customizations
     */
    function init() {
        console.log("ARM Custom Skin: Initializing...");
        updateFavicon();
        // Add more initialization logic here if needed (e.g., changing page titles)
    }

    /**
     * Update the browser favicon
     */
    function updateFavicon() {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = CONFIG.favicon;
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Optional: Observer for dynamic content changes (if needed for advanced tweaks)
    /*
    const observer = new MutationObserver((mutations) => {
        // Logic to handle GHL dynamic URL changes or DOM updates
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    */

})();