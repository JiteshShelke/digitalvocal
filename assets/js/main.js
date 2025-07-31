(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);



// nav bar drop down start
(function () {
    var mq = window.matchMedia('(min-width: 992px)'); // desktop breakpoint
    var mega = document.getElementById('servicesMega');
    if (!mega) return;

    var link = document.getElementById('servicesLink');
    var menu = mega.querySelector('.dropdown-menu');

    var openTimer, closeTimer;

    function openMega() {
        clearTimeout(closeTimer);
        openTimer = setTimeout(function () {
            mega.classList.add('show');
            menu.classList.add('show');
            link.setAttribute('aria-expanded', 'true');
        }, 80);
    }

    function closeMega() {
        clearTimeout(openTimer);
        closeTimer = setTimeout(function () {
            mega.classList.remove('show');
            menu.classList.remove('show');
            link.setAttribute('aria-expanded', 'false');
        }, 140);
    }

    function enableDesktop() {
        mega.addEventListener('mouseenter', openMega);
        mega.addEventListener('mouseleave', closeMega);
        link.addEventListener('focus', openMega);
        menu.addEventListener('focusin', openMega);
        menu.addEventListener('focusout', function (e) {
            if (!mega.contains(e.relatedTarget)) closeMega();
        });
        link.addEventListener('click', desktopClick, { passive: false });
    }

    function disableDesktop() {
        mega.removeEventListener('mouseenter', openMega);
        mega.removeEventListener('mouseleave', closeMega);
        link.removeEventListener('click', desktopClick);
    }

    function desktopClick(e) {
        if (mq.matches) {
            e.preventDefault(); // prevent default link
            mega.classList.contains('show') ? closeMega() : openMega();
        }
    }

    document.addEventListener('shown.bs.dropdown', function (ev) {
        if (mega.contains(ev.target)) link.setAttribute('aria-expanded', 'true');
    });

    document.addEventListener('hidden.bs.dropdown', function (ev) {
        if (mega.contains(ev.target)) link.setAttribute('aria-expanded', 'false');
    });

    function applyMode() {
        mq.matches ? enableDesktop() : disableDesktop();
    }

    applyMode();
    window.addEventListener('resize', applyMode);
})();
