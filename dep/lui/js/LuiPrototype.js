
function LuiPrototype(){

}

/********************************* js 扩展 **************************************/
/**
* Number 扩展
*/
//千万分数据处理
Number.prototype.toThousands = function () {
    return (this || 0).toString().toThousands();
}

/**
* String 扩展
*/
//千分位数据处理
String.prototype.extname = function(){
    if(this.indexOf(".")<0)
        return "";
    return this.substring(this.lastIndexOf(".")+1,this.length).toUpperCase();
}
String.prototype.toThousands = function () {
    var num = this || "0",
        result = '';
    if (num.indexOf(".") >= 0) {
        let ns = num.split(".");
        num = ns[0];
        result = "." + ns[1];
    }
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
//驼峰转短横线
String.prototype.transLink = function(link="-"){
    return this.replace(/([A-Z][A-Z][a-z]|[a-z][A-Z])/g,function(x){
        return x[0] + link +x.slice(1);
    }).toLowerCase();
}
/**
* Array 扩展
*/
//list to tree
Array.prototype.listToTree = function (id = "Id", pid = "Pid", child = "child") {
    let r = [],
        hash = {},
        len = this.length;
        arr = JSON.parse(JSON.stringify(this));
    for (let i = 0; i < len; i++) {
        hash[arr[i][id]] = arr[i];
    }
    for (let j = 0; j < len; j++) {
        var aVal = arr[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
            aVal.Pname = hashVP.Name;
            !hashVP[child] && (hashVP[child] = []);
            hashVP[child].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}
//tree to list
Array.prototype.treeToList = function (pid=0, id="id", child = "child") {
    var arr = JSON.parse(JSON.stringify(this));
    var result = [], len = arr.length;
    for (var i = 0; i < len; i++) {
        let ai = arr[i];
        ai.pid = pid;
        result.push(ai);
        if (ai[child] && ai[child].length > 0) {
            result = result.concat(ai[child].treeToList(ai[id],id,child));
            delete ai[child];
        }
    }
    return result;
}
Array.prototype.toObject = function(t=1)
{
    let re = {};
    for(let i = 0; i<this.length;i++){
        re[this[i]] = t==1 ? "" : [];
    }
    return re;
}
//根据部分id找出完整父级结构数据
Array.prototype.listFindParents = function(cids,id="id"){
    let arr = JSON.parse(JSON.stringify(this)),
        re = [],
        hash = {};
    for (let i = 0; i < arr.length; i++) {
        hash[arr[i][id]] = arr[i];
    }
    for(let j =0; j<cids.length; j++){
        re = getPIds(hash,cids[j],re,id);
    }
    if(re==[])
        return re;
    else
        return re.listToTree("id","pid","child");
}
function getPIds(da,id,re=[],idStr="id"){
    let item = da[id];
    if(!item)
        return re;
    if(re.filter(o=>o[idStr]==id).length==1)
        return re;
    re.push(item);
    if(item.pid){        
        getPIds(da,item.pid,re,idStr);
    }
    return re;
}

//求和值
Array.prototype.sum = function (k) {
    if (!this || this.length == 0)
        return 0;
    if (k) {
        return this.reduce(function (partial, item) {
            return partial + parseFloat(item[k]);
        }, 0);
    }
    else {
        return this.reduce(function (partial, value) {
            return partial + parseFloat(value);
        }, 0);
    }

};

Array.prototype.groupBy = function(name="name"){
    let arr = JSON.parse(JSON.stringify(this)),
        re = {};
    for(let i=0;i<arr.length;i++){
        let item = arr[i],
            group = item[name];
        !re[group] && (re[group]=[]);
        re[group].push(item);
    }    
    return re;
}