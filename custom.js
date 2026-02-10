<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://arm-scripts.magickhub.com/custom-fields/script-ghl.js?v1.0"></script>
<script src="https://arm-scripts.magickhub.com/route-planner/public/js/script-ghl.js?v1.0"></script>

<script>
    $(document).ready(function() {
        // Cambia el icono del favicon
        let isotipoUrl = "https://arm-scripts.magickhub.com/isotipo-magick.png"
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

        $(window).on('resize', function() {
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

    function refreshNav() {
        if ($("#navbar").length == 0) {
            $("#sidebar-v2").before('<div id="navbar" class="navbar"></div>');
        } else {
            $("#navbar").html("");
        }

        let urlServer = "https://dwh-services.magickhub.com/file_frontend/";

        $("#navbar").addClass("navbar");
        $("#navbar").append(`
       <div class="bm-nav-container d-flex flex-column">
           <ul class="d-flex flex-column align-items-center list-unstyled h100vh overflow-y-auto overflow-x-hidden">
               <li class="nav-header">
                   <a href="https://bm.magickhub.com/" class="mx-auto">
                       <img class="" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/64424a1efb31781dfa702796.png" alt="Isotipo Magick"/>
                   </a>
               </li>
               <ul id="menu-nav-item-list" class="d-flex flex-column align-items-center list-unstyled flex-grow-1">
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="https://bm.magickhub.com/" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                           <img class=" icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/685d1b736503b80c4c25f5a1.png" alt="communication"/>
                       </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="https://ai.magickhub.com/customer/index" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                           <img class="  icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/685d1b736503b84e1725f5a0.png" alt="intelligence"/>
                       </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                   <a href="https://arm.magickhub.com/" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                     <img class=" icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/64708119e9b5553dd85394b8.png" alt="ARM"/>
                   </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                        <a href="https://ffvv.magickhub.com/" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                            <img class=" icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/7mQw6g1em2cTgLs6ePWn/media/6720a8b89935e754af409e95.png" alt="FFVV"/>
                        </a>
                   </li>
                   <li class="d-flex align-items-center mt-2 w-100">
                       <a href="https://wiki.magickhub.com/" target="_blank" class="menu-item d-flex flex-column align-items-center w-100">
                         <img class=" icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/685d1b735cecae9d25d88700.png" alt="wiki"/>
                       </a>
                   </li>
               </ul>
               <ul class="d-flex flex-column align-items-center list-unstyled h100vh overflow-y-auto overflow-x-hidden position-absolute bottom-0">
                   <li id="support-icon" class="d-flex align-items-center mt-auto mb-2 w-100">
                       <a id="support-link" href="https://bm.magickhub.com/ticket/status/pending" target="_blank" 
                       class="menu-item d-flex flex-column align-items-center w-100">
                           <img class="icon-magick-2lg mb-1" src="https://storage.googleapis.com/msgsndr/rpmQMqtoI7BY5mdoNylk/media/64424b83fb31787da970285e.png" alt="support"/>
                       </a>
                   </li>
               </ul>
           </ul>
       </div>
         `);
    }

    
    function observeDomChanges() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.id === 'sidebar-v2') {
                            refreshNav();
                        } else {
                            // Buscar si tiene un hijo con ID sidebar-v2
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
        // Ajuste de la pagina para que se vea el dashboard no cortado
        $(".sidebar-v2-location .hl_wrapper--inner").css(
            "max-width",
            "calc(100vw - 16rem)"
        );
        // Ajuste de la pagina para que se vea el nav
        $(".sidebar-v2-location .hl_wrapper").css("width", "calc(100vw - 17rem)");

        // Ajuste de la pagina para que se vea el dashboard no cortado
        $(".sidebar-v2-location .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 16rem)"
        );
        // Ajuste de la pagina para que se vea conversations no cortado
        $(".sidebar-v2-location #conversations .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 18rem)"
        );
        // Ajuste del ancho del calendario
        $(".sidebar-v2-location #calendar-v2 .hl_wrapper--inner").css(
            "width",
            "calc(100vw - 17rem)"
        );

        //ajusta el tamaño del header cuando ya esta creado el nav
        $(".sidebar-v2-location .hl_header").css("width", "calc(100vw - 17rem)");
    }

    function domObserver() {
        // Función que se ejecutará cuando el atributo data-parent cambie
        function dataParentChangeCallback() {
            $(".sidebar-v2-location .hl_wrapper").css(
                "width",
                "calc(100vw - 17rem)"
            );
            adjustDomSize();
            // Ejecutar aquí la función
        }

        // Observador de mutación para el atributo data-parent
        var observerDataParent = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-parent"
                ) {
                    dataParentChangeCallback();
                }
            }
        });

        // Observar el elemento <body> y detectar cambios en el atributo data-parent
            var targetNode = document.body;
            var config = {
                attributes: true
        };
            observerDataParent.observe(targetNode, config);


    }
    </script>