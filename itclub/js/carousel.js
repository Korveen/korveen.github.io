$(function () {

    $('.center').slick({
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

});