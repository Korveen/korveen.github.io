var data, url;

document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('a.item-hover.ajax-link');
    links.forEach(link => {
        link.addEventListener('click', elem => {
            if (url != link.getAttribute('href').substr(1)) {
                if (data == undefined || data == null) {
                    scrollTop(100, LoadInfo(link.getAttribute('href').substr(1)));
                } else {
                    data.parentNode.removeChild(data);
                    data = null;
                    scrollTop(100, LoadInfo(link.getAttribute('href').substr(1)));
                }
                url = link.getAttribute('href').substr(1);
            }
        });
    });



    SquareImage();
});

window.onresize = () => {
    SquareImage();
}

function SquareImage() {
    let imgs = document.querySelectorAll('.square-img');
    let imgHeigth = imgs[0].parentElement.offsetWidth;
    imgs.forEach(img => {
        img.style.height = imgHeigth + 'px';
    });
}

function LoadInfo(url) {
    ajax.get("./includes/" + url + ".html", function(xhttp) {
        let elem = document.createElement('div');
        elem.innerHTML = xhttp;
        elem.style.overflow = 'hidden';
        data = document.querySelector('main').insertBefore(elem, document.querySelector('main').firstChild);

        let l = data.querySelectorAll('.project-controls a');
        l.forEach(link => {
            link.addEventListener("click", elem => {
                if (elem.target.getAttribute('href').substr(1) == '') {
                    scrollTop(200, () => {
                        data.parentNode.removeChild(data);
                        data = null;
                    });
                } else {
                    data.parentNode.removeChild(data);
                    data = null;
                    scrollTop(100, LoadInfo(link.getAttribute('href').substr(1)));
                }
            });
        });

        let dataHeight = elem.offsetHeight;

        fadeIn(elem, 1000, () => {
            elem.style.opacity = 1;
            elem.style.height = '';
        });

    });
}



function fadeIn(elem, duration, callback) {
    let elemMaxHeight = elem.offsetHeight;
    let h = 0;
    let o = 0;

    let fadeStep = elemMaxHeight / (duration / 15),
        fadeOpacityStep = 1 / (duration / 15);

    elem.style.height = 0 + 'px';
    elem.style.opacity = 0;

    let fadeInterval = setInterval(() => {
        if (h < elemMaxHeight) {
            elem.style.height = (h += fadeStep) + 'px';
            elem.style.opacity = (o += fadeOpacityStep);
        } else {
            if (callback != undefined)
                callback();
            clearInterval(fadeInterval);
        }
    }, 15);
}

function scrollTop(duration, callback) {
    let scrollStep = -window.scrollY / (duration / 15),
        scrollInterval = setInterval(() => {
            if (window.scrollY != 0) {
                window.scrollBy(0, scrollStep);
            } else {
                if (callback != undefined)
                    callback();
                clearInterval(scrollInterval);
            }
        }, 15);
}

var ajax = {
    x: function() {
        if (typeof XMLHttpRequest !== 'undefined')
            return new XMLHttpRequest();

        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {}
        }

        return xhr;
    },

    send: function(url, callback, method, data, async) {
        if (async === undefined)
            async = true;

        var x = ajax.x();
        x.open(method, url, async);
        x.onreadystatechange = function() {
            if (x.readyState == 4) {
                callback(x.responseText);
            }
        };

        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
    },

    get: function(url, callback, data, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
    },

    post: function(url, data, callback, dataType, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url, callback, 'POST', query.join('&'), async);
    }
};


$(document).on('submit', '#contact-form', function(e) {
    e.preventDefault();
    var replyName = $('input[name=reply-name]'),
        replyName_text = replyName.val(),
        email = $('input[name=email]'),
        email_text = email.val(),
        _subject = $('input[name=subject]'),
        subject_text = _subject.val(),
        message = $('textarea[name=message]'),
        message_text = message.val();

    $.ajax({
        url: "//formspree.io/vladislav.valentyukevich@yandex.com",
        method: "POST",
        data: {
            _subject: subject_text,
            replyName: replyName_text,
            email: email_text,
            message: message_text
        },
        dataType: "json",
        beforeSend: function(xhr) {
            //spinner.show();
        }
    }).done(function() {
        alert("done");
        // $("#contacts-success-wrapper").fadeIn("fast", function () {
        //     window.setTimeout(function () {
        //         $("#contacts-success-wrapper").fadeOut("slow");
        //     }, 2000);
        // });
    }).fail(function() {
        alert("fail");

        // $("#contacts-error-wrapper").fadeIn("fast", function () {
        //     window.setTimeout(function () {
        //         $("#contacts-error-wrapper").fadeOut("slow");
        //     }, 2000);
        // });
    }).always(function() {

        //spinner.hide();
        //$('#contacts-wrapper').remove();
    });
});