//设置根元素样式
(function(doc, win) {
    let design = 1920,   //设计图宽度
        rem = 100;        //根元素像素基数
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //默认设计款1920，基本字体大小16px，适配最小字体大小14px,既为 14/16=.875, 1920*.875=1690            
            if(clientWidth<1600)
                docEl.style.fontSize = rem * .875 + 'px';
            else
                docEl.style.fontSize = rem * (clientWidth / design) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);