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
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 660,
                settings: {
                    centerPadding: '20px',
                }
            }
        ]
    });

});