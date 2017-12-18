var loadedItems = 0;
var itemsToLoad = 12;
var cell2x1 = [];
var itemBox; // блок каждого товара

$(function () {
    LoadItems();

    $(".btn-ellipse-1").bind('click', function () {
        LoadItems();
    });
    CheckWindowWidth();
});

function LoadItems() {

    $.ajax({
        url: 'js/db.json', // указываем URL и
        dataType: "json", // тип загружаемых данных
        success: function (data) { // вешаем свой обработчик на функцию success
            let template = $('#itemTmpl');
            let template2 = $('#itemTmpl-2')
            let url = new Url;
            let isFilter = false;

            //проверка на наличие параметра category в адресной строке
            if (url.query.category)
                isFilter = true;

            if (url.paths()[1] == "catalog-item.html") {
                for (let i = 0; i < 4; i++) {
                    //TODO: random 4 items
                    template.tmpl(data[i]).appendTo('#menu-list');
                }

                for (let i = 0; i < data.length; i++) {
                    if (url.query.item == data[i].id) {
                        template2.tmpl(data[i]).appendTo('#item')
                        break;
                    }
                }
            } else {

                for (let i = loadedItems; i < loadedItems + itemsToLoad; i++) {
                    if (data[i] == null) {
                        $(".btn-ellipse-1").hide();
                        break;
                    }

                    if (isFilter) {
                        if (url.query.category == data[i].category) {
                            template.tmpl(data[i]).appendTo('#menu-list');
                        }
                    } else {
                        if (i == 1 || i == 5 || i == 7 || (i + 1) == 12) {
                            template.tmpl(data[i]).appendTo('#menu-list').addClass("cell-2x1");
                        } else
                            template.tmpl(data[i]).appendTo('#menu-list');
                    }
                }
            }
            loadedItems += itemsToLoad;
            cell2x1.push($(".cell-2x1"));
        },
        complete: function () {
            itemBox = d.querySelectorAll('.cart-add')
            // Устанавливаем обработчик события click на соответствующую кнопку товара
            for (var i = 0; i < itemBox.length; i++) {
                addEvent(itemBox[i], 'click', Cart.addToCart);
            }
            CheckWindowWidth();
        }
    });
};

$(window).resize(function () {
    CheckWindowWidth();
});

function CheckWindowWidth() {
    if ($(window).width() <= 700) {
        //remove class .cell-2x1
        cell2x1.forEach(element => {
            element.removeClass("cell-2x1");
        });
    } else {
        //add class .cell-2x1
        cell2x1.forEach(element => {
            element.addClass("cell-2x1");
        });
    }

    if ($(window).width() <= 768) {

        $(".catalog-teaser-text").css({
            "opacity": "1",
            "height": "45%",
            "background": "rgba(255, 255, 255, 0.8)"
        });
    } else {
        $(".catalog-teaser-text").removeAttr('style');
    }
}