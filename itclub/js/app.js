$(function () {
    $("a[href^='#']").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top - $('.nav-menu').outerHeight() + "px"
        }, 2000);
        $("#checkbox").prop('checked', false);
        return false;
    });


    $(window).on("scroll", function () {
        if ($(window).scrollTop() > $(window).innerHeight()) {
            $('.nav-menu').addClass('nav-menu_fixed');
            $('#about').css("margin-top", $('.nav-menu').outerHeight());

            if ($(window).innerWidth() < 660) {
                $('.mobile-menu__container').addClass('mobile-menu_fixed__container');

            }
        }
        // Иначе удаляем класс fixed
        else {
            $('.nav-menu').removeClass('nav-menu_fixed');
            $('.mobile-menu__container').removeClass('mobile-menu_fixed__container');

            $('#about').css("margin-top", 0);
        }
    });

    var typed = new Typed('.header__paragraph > span', {
        strings: ['<span class="span span_alternative">Школа информационных технологий</span><br> для детей и подростков'],
        typeSpeed: 50,
        showCursor: true,
    });

    $("#phone").mask("+375 (99) 999-99-99");
});