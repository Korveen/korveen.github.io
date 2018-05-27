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

function fadeIn(elem, duration, callback)
{
    let elemMaxHeight = elem.offsetHeight;
    let h = 0;
    let o = 0;

    let fadeStep = elemMaxHeight / (duration / 15),
        fadeOpacityStep = 1 / (duration / 15);

    elem.style.height = 0 + 'px';
    elem.style.opacity = 0;

    let fadeInterval = setInterval(() =>
    {
        if (h < elemMaxHeight)
        {
            elem.style.height = (h += fadeStep) + 'px';
            elem.style.opacity = (o += fadeOpacityStep);
        }
        else
        {
            if (callback != undefined)
                callback();
            clearInterval(fadeInterval);
        }
    }, 15);
}

$(window).resize(function () {
    if ($(window).width() < 768)
        response = true;
    else
        response = false;

});

