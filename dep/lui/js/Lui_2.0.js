(function(doc, win){

    const style = {
        log:{
            "welcome": "color:#626262;font-size:16px;font-family:微软雅黑;font-weight:bold",
            "error": "color:white;background:#d52828",
        }
    },
        body = document.querySelector("body");

    function LuiManager() {
        this.host = location.host; // 根目路径
        this.path = location.pathname;
        this.sClass = ["_scroll", "_con", "_bar"];
    }

    Object.defineProperties(LuiManager, {
        instance: {get() {return LuiManager._instance || (LuiManager._instance = new LuiManager());}}
    });

    Object.assign(LuiManager.prototype, {
        LoadConfig() {
            let mScriptTags = document.querySelectorAll("script[config]"),
                configPath = "conf";
            for (let i = 0; i < mScriptTags.length; i++) {
                //获取代码根目录路径
                let script = mScriptTags[i];
                if (script.src.search(/Lui_/) < 0) {continue;}
                configPath = script.getAttribute("config");
            }
            //加载lui配置文件
            let path = this.TrimPath(this.path,configPath+"/config.json"),
                cf = {url:path,sync:true,type:"GET"};
            this.Request(cf,re=>{
                this.config = JSON.parse(re);
            },er=>{
                this.config = null;
                return console.log("error", "未找到Lui配置文件，部分功能不可用！");
            }); 
        },
        Ajax(cf){
            //存粹http请求，不做特殊处理
            let promise = new Promise((resolve, reject) => {
                this.Request(cf, (re = {}) => {           
                    resolve(re);
                },
                err => {
                    reject(err);
                });
            });
            return promise;
        },
        AjaxForWrt(cf){
            //微睿特Ajax请求模板
            let config = this.config;
                param = cf.data || {};
            //为请求参数添加key，loginid
            param.LoginId = this.GetCookie(config.session.id) || "";
            param.Key = this.GetCookie(config.session.key) || "";
            //设置请求地址
            if(cf.path)
                cf.url = config.path[cf.path] ? config.path[cf.path]+(cf.api||"") : this.TrimPath(this.path,cf.path);
            else
                cf.url = config.path.http+config.path.api+cf.api;
            //请求返回promise对象
            let promise = new Promise((resolve, reject) => {
                //cookie==true 从临时cookie取值,如果没有存储，则从接口取值且存储临时cookie
                if(cf.cookie){
                    if(this.GetCookie(cf.api))
                        return resolve(JSON.parse(this.GetCookie(cf.api)));
                }
                this.Request(cf, (re = {}) => {    
                    let result = JSON.parse(re);    
                    //resultFormat 对返回结果按照特定格式处理，不处理传入false
                    if(cf.resultFormat == true || cf.resultFormat == undefined){
                        if(result.ResultData.Request==undefined || result.ResultData.Request==0){
                            //是否将数据存储到临时cookie
                            cf.cookie && this.SetCookie(cf.api,JSON.stringify(result.Data),-1);
                            resolve(result.Data);
                        }                        
                        else{
                            //统一处理数据不成功，cf.errCall=true时返回页面自定义处理数据不成功
                            !cf.errCall && this.Hit(result.ResultData.ErrMsg);
                            reject(result.ResultData);
                        }
                    }   
                    else
                        resolve(result);   
                },
                err => {
                    //同上异常处理
                    !cf.errCall && this.Hit(err);
                    reject(err);
                });
            });
            return promise;
        },
        FileData(name){
            if(!name)
                return null;                
            let json = {},
                extension = name.substring(name.lastIndexOf(".")+1,name.length),
                eu = extension.toUpperCase(),
                nuid = Guid();

            let map = new Map([["JPG",1],["JPEG",1],["PNG",1],["GIF",1],["MP3",2],["MP4",3]]);

            json.type = map.get(eu) || 4;	
            json.name = name;
            json.uid = nuid;
            json.uname =  nuid + "." + extension;    
            json.ext = extension;
            json.extUp = eu;
            json.size = parseInt(size)< 1048576 ? (parseFloat(size / 1024).toFixed(2)+"kb") : (parseFloat(size / 1024 / 1024).toFixed(2)+"mb");       
            return json;
        },
        FileStr(fitem){
            return fitem.type+"/"+fitem.name+"/"+fitem.uname+"/"+(fitem.size||"");
        },
        FileStrRes(str){
            let res = [],
                farr = str.split("*");
            for(let f of farr){
                let arr = f.split("/");
                let fo = {type:arr[2],name:arr[0],uname:arr[1],size:arr[3],edit:1};
                if(arr[0]==1)
                    fo.src = file+arr[2];
                res.push(fo);
            }
            return res;
        },
        SetCookie(cname, cvalue, exdays){
            if(!cname)
                return;	
            let pname=this.config?(this.config.name||""):"",
                d = new Date();
            d.setTime(d.getTime() + exdays);
            let expires = "expires="+d.toUTCString();
            document.cookie = pname+"_"+cname + "=" + escape(cvalue) + "; " + expires;
        },
        GetCookie(cname){
            let pname=this.config?(this.config.name||""):"",
                name = pname+"_"+cname + "=",
                ca = document.cookie.split(';');
            for(let i=0; i<ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if(c.indexOf(name) != -1) 
                    return unescape(c.substring(name.length, c.length));
            }
            return "";
        },
        DelCookie(cname){
            let pname=this.config?(this.config.name||""):"";
            this.SetCookie(pname+"_"+cname,"",1);
        },
        Waiting(s){
            //加载动画
            if(s) {
                //动画打开
                let _loadDiv = document.createElement('div');
                _loadDiv.innerHTML = `<i><span></span><span></span><span></span><span></span><span></span></i>`;
                _loadDiv.classList.add("loading");
                _loadDiv.setAttribute("id","loading");
                body.append(_loadDiv);
            } 
            else {       
                //动画关闭
                let _loadDiv = document.getElementById("loading"); 
                if (_loadDiv) {
                    _loadDiv.remove();
                }
            }
        },
        Hit(t){
            //判断传入参数是否为int
            let hit = Number.isInteger(t);
            let _hitDiv = document.createElement('div');
            //int类型 1操作成功，非1操作失败，非int类型提示传入内容
            _hitDiv.innerHTML = hit?(t==1?"操作成功":"操作失败"):t;
            _hitDiv.classList.add("hit");
            _hitDiv.setAttribute("id","hit");
            body.append(_hitDiv);
            
            setTimeout(function(){ _hitDiv.classList.add("show");},10);
            setTimeout(function(){_hitDiv.classList.remove("show");},2500);
            setTimeout(function(){_hitDiv.remove();},3000);
        },
        Guid(){
            //生成32位guid
            return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        TrimPath(path,subFile, type = "") {
            type      = type === "" ? "" : "." + type;
            let src   = path.replace(/[^\/]+$/, "") + subFile + type;
            let filed = src.split("/");
            for (let i = 0; i < filed.length; i++) {
                if (filed[i] === "..") {
                    filed.splice(i - 1, 2);
                    i -= 2;
                }
            }
            return filed.join("/");
        },
        Request(cf,suc,err){
            let xhr = new XMLHttpRequest();  
            if(!cf.sync){
                xhr.ontimeout = function(){
                    err("请求超时："+cf.url);
                };
            }        
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try { suc(xhr.response); } catch (e) { err(e); }
                    }else{
                        err("请求失败："+cf.url);
                    }
                }
            };
            if(!cf.sync)
                xhr.timeout = 1000*60;
            xhr.open(cf.type||'POST', cf.url, cf.sync ? false : true);    
            if(!cf.file)
                xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(cf.data));
        },
        Log(){
            //日志输入
            console.log("%c欢迎使用Lui(https://gitee.com/leolui/lui)","color:#fff;font-size:16px;font-family:微软雅黑;font-weight:bold;background:#4fc08d;line-height:2;padding:0 18px;border-radius:3px;");
            let debug = !this.config || this.config.debug!=false;
            console.log = (function (oriLogFunc) {                
                return function () {
                    if(arguments[0] == "lui-log"){
                        let arr = Array.from(arguments).splice(1);
                        oriLogFunc.apply(this, arr);
                    }
                    else
                        debug && oriLogFunc.apply(this, arguments);
                }
            })(console.log);
        },
        InitScroll(){            
            let sClass = this.sClass;
                _sMouseWheel = "mousewheel",
                _scrollMove = {};
            if (!("onmousewheel" in document))
                _sMouseWheel = "DOMMouseScroll";
            //在body上添加事件，通过冒泡找到指定元素处理事件
            body.addEventListener(_sMouseWheel, function (e) {
                let ev = e || window.event,
                    target = ev.target || ev.srcElement;
                while (target !== body) {
                    //当元素为scroll时触发滚动事件
                    if (target.className.includes(sClass[0])) {
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
            body.addEventListener("mousedown", function (e) {
                let ev = e || window.event,
                    target = ev.target || ev.srcElement;
                while (target !== body) {
                    if(typeof(target.className) != "string")
                        return;
                    if (target.className.includes(sClass[2])) {
                        let con = target.previousElementSibling;
                        _scrollMove.barMove = true;
                        _scrollMove.pageY = ev.pageY;
                        _scrollMove.maxMove = con.clientHeight - target.clientHeight;
                        _scrollMove.barOT = target.offsetTop;
                        _scrollMove.bar = target;
                        _scrollMove.con = con;
                        _scrollMove.bar.classList.add("bar-press");
                        con.setAttribute("onselectstart", "return false;");  //chrome禁止内容选中
                        con.setAttribute("unselectable", "on");              //IE禁止内容选中
                        con.classList.add("user-unsel");               //ff禁止内容选中
                        body.addEventListener("mousemove", scrollMouseMove);  //按下滚动条时添加鼠标移动事件，鼠标弹起时移除事件
                        body.addEventListener("mouseup", scrollMouseUp);
                    }
                    target = target.parentNode;
                }
            });
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
                    _scrollMove.bar.classList.remove("bar-press");
                    body.removeEventListener("mousemove", scrollMouseMove);
                    body.removeEventListener("mouseup", scrollMouseUp);
                }
            }

            setInterval(()=>{this.ScrollWatch()}, 167);
        },
        ScrollWatch(){
            let sClass = this.sClass;
            let sall = document.getElementsByClassName(sClass[0]);
            for (let i = 0; i < sall.length; i++) {
                let elem = sall[i],
                    con = elem.firstElementChild;
                if (con.scrollHeight > con.clientHeight) {
                    if (!elem.lastChild.className || !elem.lastChild.className.includes(sClass[2])) {
                        let _bar = document.createElement('div');
                        _bar.classList.add(sClass[2]);
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
                    if (elem.lastChild.className && elem.lastChild.className.includes(sClass[2]))
                        elem.removeChild(elem.lastChild);
                }
            }
        },
        VueComponent(){
            if(!Vue)
                return;
            //滚动组件
            Vue.component("scroll", {
                template: "<div class='_scroll'><div class='_con'><slot></slot></div></div>"
            });

            Vue.component("form-row", {
                props:["name"],
                template: "<div class='form-row'><div class='key' v-if='name&&name.length>0'>{{name}}</div><div class='val'><slot></slot></div></div>"
            });
        },
        VueDerective(){
            if(!Vue)
                return;
            //尺寸变化指令
            Vue.directive('resize', {
                bind(el, binding) {
                  let width = '', height = '';
                  function get(){
                    const style = document.defaultView.getComputedStyle(el);
                    if (width !== style.width || height !== style.height) {
                        binding.value({width:style.width, height:style.height});
                    }
                    width = style.width;
                    height = style.height;
                  }
                  el.__vueReize__ = setInterval(get, 200);
                },
                unbind(el) {
                  clearInterval(el.__vueReize__);
                }
            });

            Vue.directive("drag",function(el,bindings){
                el.onmousedown = function(e){          
                    let {arg,value} = bindings;   
                    if(value=="false" || value==false || value==0 || value=="0")
                        return;          
                    let elM = arg&&arg.parent ? el.parentNode :el;          
                    var disx = e.pageX - elM.offsetLeft;
                    var disy = e.pageY - elM.offsetTop;
                    document.onmousemove = function (e){
                        elM.style.left = e.pageX - disx+'px';
                        elM.style.top = e.pageY - disy+'px';
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            });
        },
        TransListData(data,index){
            let nv = data;         
            if(!nv || !Array.isArray(nv))
                return [];
            else{
                return nv.map((o,i)=>{
                    //为了减少参数，将index作了特殊使用，当需要使用的值为索引时，index为>=0的整数，获取的值为选项索引+index；当index === -1时，表示值为名称
                    let isName = index === -1;
                    //选项数据为错误数据，则添加错误选项 -2
                    if(!o)
                        return [-2,""];
                    //选项为对象  则取id/name或者Id/Name，没有id/Id 则为错误数据
                    if(o.constructor === Object)
                        return [isName?(o.name||o.Name||-2):(o.id||o.Id||-2)+"",o.name||o.Name];
                    //选项为数组  只支持[value,name] --暂未作详细判断
                    else if(o.constructor == Array)
                        return o.length==2 ? o : [-2,""];
                    //简单值类型  则取索引作为值
                    else
                        return [isName?o:(i+index+""),o];
                });
            }
        },
        Init() {
            //加载配置文件
            this.LoadConfig();      
            //实例scroll
            this.InitScroll(); 

            this.Log();

            //lui依赖vue组件
            this.VueComponent();
            //lui依赖vue指令
            this.VueDerective();
        }
    });
    

    function Lui(){
        if (!!window.Lui) {
            return console.log("error", "Lui对象已定义");
        }
        window.Lui   = this;

        LuiManager.instance.Init();
    }

    //实例属性
    Object.defineProperties(Lui.prototype,{
        config:{get(){return JSON.parse(JSON.stringify(LuiManager.instance.config));}},
    });

    // 实例函数
    Object.assign(Lui.prototype,{        
        Waiting(s){
            return LuiManager.instance.Waiting(s);
        },
        Hit(t){
            return LuiManager.instance.Hit(t);
        },
        Get(cf){
            cf.type = "Get";
            return LuiManager.instance.AjaxForWrt(cf);
        },
        Post(cf){
            cf.type = "Post";
            return LuiManager.instance.AjaxForWrt(cf);
        },
        Cookie: {
            Add(k,v,time){
                return LuiManager.instance.SetCookie(k,v,time);
            },
            Get(k){
                return LuiManager.instance.GetCookie(k);
            },
            Del(k){
                return LuiManager.instance.DelCookie(k);
            }
        },
        File: {
            JsonData(name){
                return LuiManager.instance.fileData(name);
            },
            Str(json){
                return LuiManager.instance.FileStr(json);
            },
            Split(str){
                return LuiManager.instance.FileStrRes(str);
            }
        },
        Guid(){
            return LuiManager.instance.Guid();
        },
        TransListData(data,index){
            return LuiManager.instance.TransListData(data,index)
        }
    });    

    new Lui();

})(document, window)