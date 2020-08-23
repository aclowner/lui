/**
 * 导入相关js类
 */
NS.Import("LuiScroll");
NS.Import("LuiPrototype");

/**
 * 导入配置文件
 */
config = NS.Load("../conf/config.json");
const    {http,api,file} = config.path;
const    _body = document.querySelector("body");

function lui(){   
}

//重写console
console.log = (function (oriLogFunc) {
    return function () {
        config.debug && oriLogFunc.apply(this, arguments);
    }
})(console.log);

// 加载动画
lui.Loading = function (s) {    
    if(s) {
        let _loadDiv = document.createElement('div');
        _loadDiv.innerHTML = `<i><span></span><span></span><span></span><span></span><span></span></i>`;
        _loadDiv.classList.add("loading");
        _loadDiv.setAttribute("id","loading");
        _body.append(_loadDiv);
    } 
    else {       
        let _loadDiv = document.getElementById("loading"); 
        if (_loadDiv) {
            _loadDiv.remove();
        }
    }
}

//操作短暂提示框，2s后消失
lui.Hit = function (t) {
    //判断传入参数是否为int
    let hit = Number.isInteger(t);
    let _hitDiv = document.createElement('div');
    //int类型 1操作成功，非1操作失败，非int类型提示传入内容
    _hitDiv.innerHTML = hit?(t==1?"操作成功":"操作失败"):t;
    _hitDiv.classList.add("hit");
    _hitDiv.setAttribute("id","hit");
    _body.append(_hitDiv);
    
	setTimeout(function(){ _hitDiv.classList.add("show");},10);
	setTimeout(function(){_hitDiv.classList.remove("show");},2500);
	setTimeout(function(){_hitDiv.remove();},3000);
}

//ajax异步请求
lui.ajax = {
    get:function(url){
        let cf = {url:url,type:"GET"};
        return RequestRes(cf);
    },
    post:function(cf){
        let param = cf.data || {};
        param.LoginId = lui.GetCookie("LOGIN_ID") || "";
        param.Key = lui.GetCookie("LOGIN_KEY") || "";

        cf.data = {sprams: {dbFun: cf.api, parms: param}};
        cf.url = http + api;   
        return RequestApi(cf);
    }
}
//请求数据接口
lui.AjaxApi = function(cf){
    let param = cf.data || {};
        param.LoginId = lui.GetCookie("LOGIN_ID") || "";
        param.Key = lui.GetCookie("LOGIN_KEY") || "";

    cf.data = {sprams: {dbFun: cf.api, parms: param}};
    cf.url = http + api;   
    return RequestApi(cf);
}

lui.FileData = function(name,size=0){
    if(!name)
        return null;
        
    var json = {},
		extension = name.substring(name.lastIndexOf(".")+1,name.length),
        eu = extension.toUpperCase();
	if(eu == "JPG" || eu == "JPEG" || eu == "PNG" || eu == "GIF")
	{
		json.type = 1;
	}
	else if(eu == "MP3")
	{
		json.type = 2;
	}
	else if(eu == "MP4")
	{
		json.type = 3;
	}
	else{
		json.type = 4;
	}
	
    let nuid = Guid();
    json.name = name;
    json.uid = nuid;
    json.uname =  nuid + "." + extension;    
    json.size = (size / 1024 / 1024).toFixed(2);

        
	return json;
}
lui.FileStr = function(fitem){
    return fitem.type+"/"+fitem.name+"/"+fitem.uname+"/"+(fitem.size||"");
}
lui.FileStrRes = function(str){
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
}

lui.Guid = function(){
    return Guid();
}

/**
 * 设置cookie
 * @param {string} cname    cookie名称
 * @param {string} cvalue    cookie值 
 * @param {int} exdays    cookie存储时间，毫秒
 */
lui.SetCookie = function(cname, cvalue, exdays=60*60*1000) {
	if(!cname)
		return;	
	let d = new Date();
    d.setTime(d.getTime() + exdays);
    let expires = "expires="+d.toUTCString();
    document.cookie = config.name+"_"+cname + "=" + escape(cvalue) + "; " + expires;
}
/**
 * 获取cookie值
 * @param {string} cname 
 */
lui.GetCookie = function(cname){
	let name = config.name+"_"+cname + "=",
		ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) != -1) 
        	return unescape(c.substring(name.length, c.length));
    }
    return "";
}
/**
 * 删除cookie
 * @param {*} cname 
 */
lui.DelCookie = function(cname){
    lui.SetCookie(cname,"",1);
}

/**
 * 异步请求接口，返回promise
 * @param {*} cf 
 */
function RequestApi(cf){        
    let promise = new Promise((resolve, reject) => {
        if(!cf.unull){
            if(!cf.data.sprams.parms.LoginId)
                reject("LoginId is null");
            else{
                lui.SetCookie("LOGIN_ID",cf.data.LoginId,1000*60*60*3);
                lui.SetCookie("LOGIN_KEY",cf.data.Key,1000*60*60*3);
            }

        }      
        HttpRequest(cf, (re = {}) => {            
            let result = JSON.parse(re);
            //ResultData.Result==0或者ResultData没有返回或者Result.Data.Result没有返回时认为数据操作成功
            if (!result.ResultData.Result==1)
                resolve(result.Data);
            else {
                //统一处理数据不成功，cf.errCall=true时返回页面自定义处理数据不成功
                !cf.errCall && lui.Hit(result.ResultData.ErrMsg);
                reject(result.ResultData);
            }
        },
        (err) => {
            //统一处理请求不成功，cf.errCall=true是返回页面自定义处理请求不成功
            !cf.errCall && lui.Hit(err);
            reject(err);
        });
    });
    return promise;
}

/**
 * 异步请求资源，返回promise
 * @param {url:"/xxx/xxxx.xx"} cf 
 */
function RequestRes(cf){    
    let promise = new Promise((resolve, reject) => {
        HttpRequest(cf, re => {
            let ext = cf.url.extname();
            let res = ext=="JSON" ? JSON.parse(re) : re;            
            resolve(res);
        },
        (err) => {
            !cf.errCall && lui.Hit(1,err);
            reject(err);
        });
    });
    return promise;
}

/**
 * HttpRequest请求
 * @param {*} cf 
 * @param {*} suc 
 * @param {*} err 
 */
function HttpRequest(cf,suc,err){
    let xhr = new XMLHttpRequest();  
    xhr.ontimeout = function(){
        lui.Loading(0);
    };
    xhr.onreadystatechange = function () {
        console.log("xhrsc",xhr);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try { suc(xhr.response); } catch (e) { err(e); }
            }else{
                err("请求失败："+cf.url);
            }
        }
    };

    xhr.timeout = 1000*30;
    xhr.open(cf.type||'POST', cf.url, true);    
    if(!cf.file)
        xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(cf.data));
}

//生成guid
function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
