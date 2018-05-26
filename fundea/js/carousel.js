var interval;
var timing = 4000;
var response = false;

$(function () {
    

    if ($(window).width() < 768) {
        response = true;
    }

    interval = setInterval(function () {
        if (!response) {
            $("#nonresponse").css('display', 'unset');
            $("#response").css('display', 'none');

            $('.slider #nonresponse > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('.slider #nonresponse');
        } else {
            $("#nonresponse").css('display', 'none');
            $("#response").css('display', 'unset');

            $('.slider #response > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('.slider #response');
        }
    }, timing);
});

$(window).resize(function () {
    if ($(window).width() < 768)
        response = true;
    else
        response = false;

});

