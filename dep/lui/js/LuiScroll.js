const _scroll = ["_scroll", "_con", "_bar"],
    _sMouseWheel = "mousewheel";
let _scrollMove = {},
    _body = document.querySelector("body");

function LuiScroll(){    
}

Vue.component("scroll", {
    template: `<div class="_scroll">
            <div class="_con">
                <slot></slot>
            </div>
        </div>`
});

//兼容鼠标滚轮事件
if (!("onmousewheel" in document))
    _sMouseWheel = "DOMMouseScroll";
//在body上添加事件，通过冒泡找到指定元素处理事件
_body.addEventListener(_sMouseWheel, function (e) {
    let ev = e || window.event,
        target = ev.target || ev.srcElement;
    while (target !== _body) {
        //当元素为_scroll时触发滚动事件
        if (target.className.includes(_scroll[0])) {
            let con = target.firstElementChild,
                ch = con.clientHeight,
                sh = con.scrollHeight,
                st = con.scrollTop;
            if (sh > ch) {
                let iWheelDelta = 0;
                if (ev.wheelDelta) {
                    iWheelDelta = ev.wheelDelta / 120;
                } else {
                    iWheelDelta = -ev.detail / 3;
                }
                con.scrollTop += -1 * 30 * iWheelDelta;
                target.lastChild.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
            }
            break;
        }
        target = target.parentNode;
    }
});
_body.addEventListener("mousedown", function (e) {
    let ev = e || window.event,
        target = ev.target || ev.srcElement;
    while (target !== _body) {
        if(typeof(target.className) != "string")
            return;
        if (target.className.includes(_scroll[2])) {
            let con = target.previousElementSibling;
            _scrollMove.barMove = true;
            _scrollMove.pageY = ev.pageY;
            _scrollMove.maxMove = con.clientHeight - target.clientHeight;
            _scrollMove.barOT = target.offsetTop;
            _scrollMove.bar = target;
            _scrollMove.con = con;
            con.setAttribute("onselectstart", "return false;");  //chrome禁止内容选中
            con.setAttribute("unselectable", "on");              //IE禁止内容选中
            con.classList.add("user-unsel");               //ff禁止内容选中
            _body.addEventListener("mousemove", scrollMouseMove);  //按下滚动条时添加鼠标移动事件，鼠标弹起时移除事件
            _body.addEventListener("mouseup", scrollMouseUp);
        }
        target = target.parentNode;
    }
});

//循环监听._scroll元素的变化
setInterval(scrollWatch, 167);

function scrollMouseMove(e) {
    let ev = e || window.event,
        target = ev.target || ev.srcElement;
    if (_scrollMove.barMove) {
        let ot = ev.pageY - _scrollMove.pageY + _scrollMove.barOT;
        ot = ot < 0 ? 0 : ot;
        ot = ot > _scrollMove.maxMove ? _scrollMove.maxMove : ot;
        _scrollMove.bar.style.top = ot + "px";
        var st = ot * _scrollMove.con.scrollHeight / _scrollMove.con.clientHeight;
        _scrollMove.con.scrollTop = st;
    }
}
function scrollMouseUp() {
    if (_scrollMove.barMove) {
        _scrollMove.barMove = false;
        //移除禁止选中
        _scrollMove.con.removeAttribute("onselectstart");
        _scrollMove.con.removeAttribute("unselectable");
        _scrollMove.con.classList.remove("user-unsel");
        _body.removeEventListener("mousemove", scrollMouseMove);
        _body.removeEventListener("mouseup", scrollMouseUp);
    }
}
//滚动条滚动区域监听
function scrollWatch() {
    let sall = document.getElementsByClassName(_scroll[0]);
    for (let i = 0; i < sall.length; i++) {
        let elem = sall[i],
            con = elem.firstElementChild;
        if (con.scrollHeight > con.clientHeight) {
            if (!elem.lastChild.className || !elem.lastChild.className.includes(_scroll[2])) {
                let _bar = document.createElement('div');
                _bar.classList.add(_scroll[2]);
                _bar.classList.add("_v");
                _bar.style.height = (con.clientHeight * con.clientHeight / con.scrollHeight) + "px";
                _bar.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
                elem.append(_bar);
            } else {
                elem.lastChild.style.height = (con.clientHeight * con.clientHeight / con.scrollHeight) + "px";
                elem.lastChild.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
            }
        }
        else {
            //如果不需要滚动，但页面有滚动条，移除掉
            if (elem.lastChild.className && elem.lastChild.className.includes(_scroll[2]))
                elem.removeChild(elem.lastChild);
        }
    }
}