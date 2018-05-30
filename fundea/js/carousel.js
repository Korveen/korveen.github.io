var timing = 2000;
var focused = false;

$(document).on('keyup', function (e) {
    if ($('.form-control').is(':focus')) {
        $('.slider').slick('autoplay', false);
    }
});

$(function () {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: timing,
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