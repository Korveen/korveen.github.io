var timing = 3000;
var timeOut;
$(function () {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplaySpeed: timing,
        autoplay: true,
        arrows: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }]
    });

    if ($(window).width() < 768) {
        $('.slider').slick('slickFilter', function () {
            return $(':not(.empty-div)', this).length !== 1;
        });

    }

    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        if (currentSlide == 6) {
            $('#order').fadeIn(100);
        } else {
            $('#order').fadeOut(100);
        }

    });



    $('input[type=text]').focus(function () {
        $('.slider').slick("slickPause");
    }).blur(function () {
        $('.slider').slick("slickPlay");
    });
});

$(window).resize(function () {
    if ($(window).width() < 768) {
        $('.slider').slick('slickFilter', function () {
            return $(':not(.empty-div)', this).length !== 1;
        });
    } else {
        $('.slider').slick('slickUnfilter');
    }

});