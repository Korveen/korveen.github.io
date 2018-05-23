var images = {
    "coinz": [
        "coinz-b.png",
        "coinz-l.png",
        "coinz-m.png"
    ],
    "cryptologos": [
        "cryptologos-black.png",
        "cryptologos-silver.png",
        "cryptologos-gold.png"
    ],
    "f-bracelet": [
        "f-bracelet-black.png",
        "f-bracelet-silver.png",
        "f-bracelet-gold.png"
    ],
    "indes": [
        "indes-black.png",
        "indes-silver.png",
        "indes-gold.png"
    ],
    "inmining": [
        "inmining-black.png",
        "inmining-silver.png",
        "inmining-gold.png"
    ],
    "l-bracelet": [
        "l-bracelet-black.png",
        "l-bracelet-silver.png",
        "l-bracelet-gold.png"
    ],
    "relax": [
        "relax-black.png",
        "relax-silver.png",
        "relax-gold.png"
    ]
};



$(function () {
    var i_title = $('#title'),
        i_decription = $('#description'),
        i_price = $('#price'),
        i_image = $('#image'),
        i_prev_arr = $('#prev-arrow'),
        i_next_arr = $('#next-arrow'),
        i_more_arr = $('#more-arrow');

    var cur_image = 0,
        cur_item = 0;

    var refresh = function () {
        if (cur_image == 0)
            i_prev_arr.css('visibility', 'hidden');
        else
            i_prev_arr.css('visibility', 'visible');

        if (cur_image == Object.values(images).length - 1)
            i_next_arr.css('visibility', 'hidden');
        else
            i_next_arr.css('visibility', 'visible');

        i_title.html(Object.keys(images)[cur_image]);

        i_image.animate({
            opacity: 0
        }, 300, function () {
            i_image.attr('src', 'img/catalog/' + Object.keys(images)[cur_image] + '/' + images[Object.keys(images)[cur_image]][cur_item]);
            i_image.animate({
                opacity: 1
            }, 300);
        });


    };

    refresh();

    //=== body fade
    $(document.body).css("opacity", 0);
    $(document.body).animate({
        opacity: 1
    }, 1000);


    //=== обработчик нажатия на задний фон => скрываем мобильное меню
    var menuCover = $('.mobile-menu-container');
    menuCover.click(function (e) {
        $('#checkbox').prop('checked', false);
        e.stopPropagation();
    });



    i_prev_arr.click(function (e) {
        cur_image--;

        if (cur_image <= 0)
            cur_image = 0;
            
        refresh();
    });

    i_next_arr.click(function (e) {
        cur_image++;

        if (cur_image >= Object.values(images).length)
            cur_image = Object.values(images).length - 1;

        refresh();
    });

    i_more_arr.click(function (e) {
        cur_item++;

        if(cur_item >= images[Object.keys(images)[cur_image]].length)
            cur_item = 0;

        refresh();
    });
});