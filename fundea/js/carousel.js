$(function () {
    var inputs = $('[name=slider]');
    var curNum = 0;
    var timing = 4000;

    prevItem = inputs[curNum];

    var interval = setInterval(function () {
        inputs[curNum].removeAttribute('checked');

        curNum++;

        if (curNum == inputs.length)
            curNum = 0;

        inputs[curNum].setAttribute('checked', true);

    }, timing);


    
});