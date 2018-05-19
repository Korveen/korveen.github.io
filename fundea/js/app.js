//DOM ready
document.addEventListener('DOMContentLoaded', function () {

    //=== Fade animation
    let d = 500; //duration (ms)
    let o = 0;
    let opStep = 1 / (d / 15);
    document.body.style.opacity = 0;
    let fadeInterval = setInterval(() => {
        if (o < 1) {
            document.body.style.opacity = (o += opStep);
        } else {
            clearInterval(fadeInterval);
        }
    }, 15);
    //===


    //=== обработчик нажатия на задний фон => скрываем мобильное меню
    let menuCover = document.querySelector('.mobile-menu-container');
    menuCover.addEventListener('click', (e) => {
        if (e.target == menuCover) {
            document.querySelector('#checkbox').checked = false;
        }
    }, false);
    //===

});