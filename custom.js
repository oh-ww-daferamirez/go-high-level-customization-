/**
 * Go High Level Customization - ARM Project
 * Pure JavaScript Version (Fixes Syntax Errors in IDE)
 */

(function () {
    // Utility to load external scripts dynamically
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Dependency URLs - REMOVED FOR CLEAN-ROOM POLICY
    const scripts = [
        // "https://arm-scripts.magickhub.com/custom-fields/script-ghl.js?v1.0",
        // "https://arm-scripts.magickhub.com/route-planner/public/js/script-ghl.js?v1.0"
    ];

    function init() {
        $(document).ready(function () {
            // Cambia el icono del favicon
            let isotipoUrl = "https://placehold.co/32x32?text=ARM"
            let faviconElement = $('head link[rel="icon"]');
            faviconElement.attr('href', isotipoUrl);

            observeDomChanges();
            domObserver();

            $(".message-header-actions button:first-of-type").removeClass("inline-flex");

            // CALENDAR
            let calendarV2Element = $("#calendar-v2");

            if (calendarV2Element.length > 0) {
                calendarV2Element.find(".container-fluid .d-flex.justify-content-between.mb-3").addClass(
                    "flex-wrap");
                calendarV2Element.find(
                    ".container-fluid .d-flex.justify-content-between.mb-3.flex-wrap .d-flex.align-items-center.order-last"
                ).addClass("pt-3 pt-lg-0");
            }

            $(window).on('resize', function () {
                var pageWidth = $(window).width();

                if (pageWidth < 768) {
                    $('#navbar').addClass('d-none');
                    $('#sb_conversations').addClass('d-none');
                } else {
                    $('#navbar').removeClass('d-none');
                    $('#sb_conversations').removeClass('d-none');
                }
            });
        });
    }

    function loadDependencies() {
        let loaded = 0;
        if (scripts.length === 0) {
            init();
            return;
        }
        scripts.forEach(src => {
            loadScript(src, () => {
                loaded++;
                if (loaded === scripts.length) {
                    init();
                }
            });
        });
    }

    // Check if jQuery is already loaded (GHL usually provides it)
    if (typeof jQuery === 'undefined') {
        loadScript("https://code.jquery.com/jquery-3.5.1.min.js", loadDependencies);
    } else {
        loadDependencies();
    }

    // --- Sub-functions ---

    function refreshNav() {
        if ($("#navbar").length == 0) {
            $("#sidebar-v2").before('<div id="navbar" class="navbar"></div>');
        } else {
            $("#navbar").html("");
        }

        $("#navbar").addClass("navbar");
        $("#navbar").append(`
       <div class="bm-nav-container d-flex flex-column">
           <ul class="d-flex flex-column align-items-center list-unstyled h100vh overflow-y-auto overflow-x-hidden">
               <li class="nav-header">
                   <a href="#" class="mx-auto">
                       <img class="" src="https://placehold.co/40x40?text=Logo" alt="Isotipo ARM"/>
                   </a>
               </li>
               <ul id="menu-nav-item-list" class="d-flex flex-column align-items-center list-unstyled flex-grow-1">
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="#" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                           <img class=" icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=C" alt="communication"/>
                       </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="#" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                           <img class="  icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=I" alt="intelligence"/>
                       </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                   <a href="#" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                     <img class=" icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=A" alt="ARM"/>
                   </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                        <a href="#" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                            <img class=" icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=F" alt="FFVV"/>
                        </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="#" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                         <img class=" icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=W" alt="wiki"/>
                       </a>
                   </li>
               </ul>
               <ul class="d-flex flex-column align-items-center list-unstyled h100vh overflow-y-auto overflow-x-hidden position-absolute bottom-0">
                   <li id="support-icon" class="d-flex align-items-center mt-auto mb-2 w-100">
                       <a id="support-link" href="#" target="_blank" 
                       class="menu-item d-flex flex-column align-items-center w-100">
                           <img class="icon-arm-2lg mb-1" src="https://placehold.co/20x20?text=S" alt="support"/>
                       </a>

                   </li>
               </ul>
           </ul>
       </div>
          `);
    }

    function observeDomChanges() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.id === 'sidebar-v2') {
                            refreshNav();
                        } else {
                            if ($(node).find('#sidebar-v2').length > 0) {
                                refreshNav();
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function adjustDomSize() {
        $(".sidebar-v2-location .hl_wrapper--inner").css(
            "max-width",
            "calc(100vw - 16rem)"
        );
        $(".sidebar-v2-location .hl_wrapper").css("width", "calc(100vw - 17rem)");
        $(".sidebar-v2-location .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 16rem)"
        );
        $(".sidebar-v2-location #conversations .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 18rem)"
        );
        $(".sidebar-v2-location #calendar-v2 .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 17rem)"
        );
        $(".sidebar-v2-location .hl_header").css("width", "calc(100vw - 17rem)");
    }

    function domObserver() {
        function dataParentChangeCallback() {
            $(".sidebar-v2-location .hl_wrapper").css(
                "width",
                "calc(100vw - 17rem)"
            );
            adjustDomSize();
        }

        var observerDataParent = new MutationObserver(function (mutationsList) {
            for (var mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-parent"
                ) {
                    dataParentChangeCallback();
                }
            }
        });

        var targetNode = document.body;
        var config = {
            attributes: true
        };
        observerDataParent.observe(targetNode, config);
    }
})();