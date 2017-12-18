$.getScript("js/url.min.js");

var nav, logo, logoHeight, logoImg, logoImgHeight;
var isReady = false;
var d = document;


var Cart = {
    // Получаем данные из LocalStorage
    getCartData: function () {
        return JSON.parse(localStorage.getItem("cart"));
    },
    // Записываем данные в LocalStorage
    setCartData: function (o) {
        localStorage.setItem("cart", JSON.stringify(o));
        return false;
    },

    getItemCount: function () {
        let count = 0;
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            Object.getOwnPropertyNames(cartData).forEach(function (val) {
                count += Number(parseInt(cartData[val][2]));
            });
        }
        return count;
    },
    getItemSum: function () {
        let sum = 0;
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            Object.getOwnPropertyNames(cartData).forEach(function (val) {
                sum += parseFloat(cartData[val][1]) * Number(parseInt(cartData[val][2]));
            });
        }
        return Number(parseFloat(sum.toFixed(2)));
    },
    // Добавляем товар в корзину
    addToCart: function (e) {
        e.disabled = true; // блокируем кнопку на время операции с корзиной

        let cartData = Cart.getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
            itemId = this.getAttribute('data-id'), // ID товара
            itemTitle = this.getAttribute('data-title'), // название товара
            itemPrice = this.getAttribute('data-price'); // стоимость товара

        if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[itemId][2] += 1;

        } else { // если товара в корзине еще нет, то добавляем в объект
            cartData[itemId] = [itemTitle, itemPrice, 1];
        }

        if (!Cart.setCartData(cartData)) { // Обновляем данные в LocalStorage
            e.disabled = false; // разблокируем кнопку после обновления LocalStorage
        }
        UpdateCartText();
        return false;
    },

    // Открываем корзину со списком добавленных товаров
    openCart: function (e) {
        let cartData = Cart.getCartData(), // вытаскиваем все данные корзины
            totalItems = '';
        cartCont = d.getElementById("cart-content"); // блок вывода данных корзины

        // если что-то в корзине уже есть, начинаем формировать данные для вывода
        if (cartData != null || cartData != undefined) {
            totalItems = '<table class="shopping-list"><tr><td>Наименование</td><td>Цена</td><td>Кол-во</td></tr>';
            Object.getOwnPropertyNames(cartData).forEach(function (val) {
                totalItems += '<tr>';
                totalItems += '<td><figure class="shopping-list-wrapper"><a href="catalog-item.html?item=' +
                    val + '"><img src="img/catalog/catalog' + val + '.jpg"></a><figcaption><p>' +
                    cartData[val][0] + '</p></figcaption></figure></td>';

                totalItems += '<td>' + cartData[val][1] + ' BYN</td>';
                totalItems += '<td><div class="input-amount"><span class="down">–</span><input type="number" onkeypress="return false" min="1" id="count" value="' +
                    cartData[val][2] + '" data-id="' + val + '"/><span class="up">+</span><span class="remove">X</span></div></td>';

                totalItems += '</tr>';
            });
            totalItems += '<tr><td>Итого:</td><td id="cart-sum">' + Cart.getItemSum() + ' BYN</td><td id="cart-count">' + Cart.getItemCount() + '</td></tr';
            totalItems += '</table>'

            cartCont.innerHTML = totalItems;
        } else {
            // если в корзине пусто, то сигнализируем об этом
            cartCont.innerHTML = "В корзине пусто.";
        }

        return false;
    },
    clearCart: function (e) {
        cartCont = d.getElementById("cart-content"); // блок вывода данных корзины

        localStorage.removeItem("cart");
        cartCont.innerHTML = "Корзина очищена!";
        UpdateCartText();
    },
    addItem: function (id) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            if (cartData.hasOwnProperty(id))
                cartData[id][2] += 1;
            Cart.setCartData(cartData);
        }
        return false;
    },
    minItem: function (id, count) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            if (cartData.hasOwnProperty(id))
                cartData[id][2] -= 1;
            Cart.setCartData(cartData);
        }
        return false;
    },
    removeItem: function (id) {
        let cartData = Cart.getCartData();
        if (cartData != null || cartData != undefined) {
            delete cartData[id];
            if (isEmpty(cartData)) Cart.clearCart();
            else Cart.setCartData(cartData);
        }
        return false;
    }
};

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

function UpdateCartText() {
    let cartText = $("#navigation ul.menubar > li:last-child() > a");
    let cartTextBurger = $("#navigation ul.burger-list > li:last-child() > a");
    let cartStr;

    if (Cart.getItemCount() > 0)
        cartStr = "Корзина (" + Cart.getItemCount() + ")";
    else
        cartStr = "Корзина";

    cartText.text(cartStr);
    cartTextBurger.text(cartStr);
}

function OpenCheckoutForm() {
    let checkoutForm = $("div.order-wrapper");

    if (Cart.getItemCount() > 0)
        checkoutForm.fadeIn("fast");
    addEvent(d.querySelector("div.order-wrapper"), 'click', CloseCheckoutForm);

}

function CloseCheckoutForm() {
    let checkoutForm = d.querySelector("div.order-wrapper");
    if (event.target == checkoutForm)
        $(checkoutForm).fadeOut("fast");
}

$(function () {
    //$('body').hide().fadeIn(1000);
    UpdateCartText();
    /* Открыть корзину */
    var url = new Url;
    if (url.paths()[1] == "cart.html") {
        Cart.openCart();
        addEvent(d.getElementById("checkout"), 'click', OpenCheckoutForm);
        addEvent(d.getElementById("clearcart"), 'click', Cart.clearCart);


        $('.down').click(function () {
            let $input = $(this).parent().find('input');
            let count = parseInt($input.val());
            if (count > 1) {
                Cart.minItem($input.attr('data-id'));
                count--;
                $input.val(count);
                $input.change();

                $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
                $('#cart-count').text(Cart.getItemCount());
                UpdateCartText()
            }

            return false;
        });

        $('.up').click(function () {
            let $input = $(this).parent().find('input');
            let count = parseInt($input.val());
            if (count >= 1) {
                Cart.addItem($input.attr('data-id'));
                count++;
                $input.val(count);
                $input.change();

                $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
                $('#cart-count').text(Cart.getItemCount());
                UpdateCartText()
            }

            return false;
        });

        $('.remove').click(function () {
            let $input = $(this).parent().find('input');
            Cart.removeItem($input.attr('data-id'));
            $input.parent().parent().parent().remove();

            $('#cart-sum').text(Cart.getItemSum().toFixed(2) + " BYN");
            $('#cart-count').text(Cart.getItemCount());
            UpdateCartText()

            return false;
        });

    }

    isReady = true;
    nav = $('#navigation');
    logo = $('#logo');
    logoHeight = $('#logo').height();

    logoImg = $('#logo img');
    logoImgHeight = logoImg.height();

    if ($(window).width() <= 768)
        CheckHeaderAnim();


});

// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler, bubbling = false) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, bubbling);
    } else {
        elem.attachEvent('on' + type, function () {
            handler.call(elem);
        });
    }
    return false;
};

// FORM MESSAGE
$(document).on('submit', '#contact-form', function (e) {
    e.preventDefault();
    var replyName = $('input[name=reply-name]'),
        replyName_text = replyName.val(),
        email = $('input[name=email]'),
        email_text = email.val(),
        phone = $('input[name=phone]'),
        phone_text = phone.val(),
        message = $('textarea[name=message]'),
        message_text = message.val();

    $.ajax({
        url: "//formspree.io/vladislav.valentyukevich@yandex.com",
        method: "POST",
        data: {
            subject: "Peckar-Beckar Message!",
            replyName: replyName_text,
            email: email_text,
            phone: phone_text,
            message: message_text
        },
        dataType: "json",
        beforeSend: function (xhr) {
            //spinner.show();
        }
    }).done(function () {
        $("#contacts-success-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#contacts-success-wrapper").fadeOut("slow");
            }, 2000);
        });
    }).fail(function () {
        $("#contacts-error-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#contacts-error-wrapper").fadeOut("slow");
            }, 2000);
        });
    }).always(function () {
        //spinner.hide();
        //$('#contacts-wrapper').remove();
    });
});
//ORDER MESSAGE
$(document).on('submit', '#order-form', function (e) {
    e.preventDefault();
    var replyName = $('input[name=reply-name]'),
        replyName_text = replyName.val(),
        phone = $('input[name=phone]'),
        phone_text = phone.val(),
        message = "order",
        order_text = "";

    let cartData = Cart.getCartData();
    if (cartData != null || cartData != undefined) {
        Object.getOwnPropertyNames(cartData).forEach(function (val) {
            order_text += cartData[val][0] + " - " + cartData[val][2] + "\n";
        });
        order_text += Cart.getItemSum() + " BYN" + " - " + Cart.getItemCount() + " шт.";
    }

    $.ajax({
        url: "//formspree.io/vladislav.valentyukevich@yandex.com",
        method: "POST",
        data: {
            subject: "Peckar-Beckar Order!",
            replyName: replyName_text,
            phone: phone_text,
            message: order_text
        },
        dataType: "json",
        beforeSend: function (xhr) {
            //spinner.show();
        }
    }).done(function () {
        $("#order-success-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#order-success-wrapper").fadeOut("slow");
            }, 1000);
        });
    }).fail(function () {
        $("#order-error-wrapper").fadeIn("fast", function () {
            window.setTimeout(function () {
                $("#order-error-wrapper").fadeOut("slow");
            }, 1000);
        });
    }).always(function () {
        CloseCheckoutForm();
        //spinner.hide();
        //$('#order-wrapper').remove();
    });
});

// SCROLL in ABOUT PAGE
$(function () {
    $('a[href^="#"]').click(function () {
        if ($(this).attr('href').length > 1) {
            let elem = $(this).attr('href');
            let offset = $(elem).offset().top - 63;
            $('html, body').animate({
                scrollTop: offset + "px"
            }, '3000');
        }
        return false;
    });
});



// HEADER ANIMATION
$(window).scroll(function () {

    if ($(this).scrollTop() > 100) {
        if ($('#arrow-up').is(':hidden')) {
            $('#arrow-up').css({
                opacity: 1
            }).fadeIn('slow');
        }
    } else {
        $('#arrow-up').stop(true, false).fadeOut('fast');
    }

    if (isReady) {
        var top = $(this).scrollTop();
        var isAnimated = false;
        if ($(window).width() > 768) {
            if (top >= 1) {
                if (isAnimated)
                    return false;
                else {
                    nav.animate({
                        'top': '-32px'
                    }, 'fast');
                    logo.animate({
                        'height': '64',
                        'width': '80'
                    }, 'fast');
                    logoImg.animate({
                        'height': '45',
                        'margin-top': '10'
                    }, 'fast');
                    isAnimated = true;
                }
            } else {
                nav.stop(true);
                logo.stop(true);
                logoImg.stop(true);

                nav.animate({
                    'top': '0'
                }, 'fast');
                logo.animate({
                    'height': logoHeight,
                    'width': '130'
                }, 'fast');
                logoImg.animate({
                    'height': logoImgHeight,
                    'margin-top': '15'
                }, 'fast');
            }
        } else {
            CheckHeaderAnim();
        }
    }
});

function CheckHeaderAnim() {
    nav.stop(true);
    logo.stop(true);
    logoImg.stop(true);

    nav.animate({
        'top': '0'
    }, 'fast');
    logo.animate({
        'height': '74',
        'width': '80'
    }, 'fast');
    logoImg.animate({
        'height': '45',
        'margin-top': '10'
    }, 'fast');
}