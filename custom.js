/**
 * GoHighLevel Customization - ARM Project
 * Version: 3.0 (Reliability Build - Unified Single File)
 * 
 * INTERNALIZES ALL CSS TO ENSURE BRANDING LOADS EVEN IF EXTERNAL FILES FAIL.
 */

(function () {
    'use strict';

    const CONFIG = {
        favicon: "https://placehold.co/32x32?text=ARM",
        brandCSS: `
            /* Clean Reset & Variables */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            :root {
                --arm-color-1: #4551d8;
                --arm-color-4: #181a8d;
                --arm-color-5: #000675;
                --arm-font-family: 'Poppins', sans-serif;
            }

            /* Force Branding */
            html body, html body .hl_wrapper * { font-family: var(--arm-font-family) !important; }
            
            #sidebar-v2, .sidebar-v2-location #sidebar-v2 { 
                background-color: var(--arm-color-5) !important; 
            }

            #app .hl_header, body .hl_header {
                background-color: #ffffff !important;
                border-bottom: 3px solid var(--arm-color-1) !important;
            }

            #app .btn-primary, #app .edit-dashboard-btn {
                background-color: var(--arm-color-1) !important;
                border-color: var(--arm-color-1) !important;
            }

            /* White Label Hiding */
            #app #hl_header--help-icon, 
            .hl_header--ai-assistant, 
            #canny_logs-toggle,
            .hl_header--recent-activities,
            [id*="help-icon"], 
            [class*="ai-assistant"] { 
                display: none !important; 
            }
        `
    };

    function injectStyles() {
        if (document.getElementById('arm-custom-styles')) return;
        const style = document.createElement('style');
        style.id = 'arm-custom-styles';
        style.textContent = CONFIG.brandCSS;
        document.head.appendChild(style);
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

    function init() {
        console.log("ARM Custom Skin v3.0: Initializing (Unified)...");
        injectStyles();
        updateFavicon();

        // Ensure styles stay injected if GHL wipes the head (can happen on route changes)
        const observer = new MutationObserver(() => {
            injectStyles();
            updateFavicon();
        });
        observer.observe(document.head, { childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();