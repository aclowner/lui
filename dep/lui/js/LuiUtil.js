(function(){
    //数字
    Object.assign(Number.prototype,{
        toThousands(){
            //转千分位字符串
            let num = this+"",
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
    });

    //字符串
    Object.defineProperties(String.prototype,{
        extName:{get(){return this.indexOf(".")<0 ? "" : this.substring(this.lastIndexOf(".")+1,this.length).toLowerCase();}}
    });

    Object.assign(String.prototype,{
        toLink(link="-"){
            //驼峰转短横线，可定义其他连接字符串
            return this.replace(/([A-Z][A-Z][a-z]|[a-z][A-Z])/g,function(x){
                return x[0] + link +x.slice(1);
            }).toLowerCase();
        },
        toJson(){
            return JSON.parse(this);
        },
        toFileArr(){
            let str = this,
                res = [],
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
    });


    //数组
    Object.defineProperties(Array.prototype,{
        last:{
            get(){
                return this.length>0 ? this[this.length-1] : null;
            }
        },
        lastIndex:{
            get(){
                return this.length-1;
            }
        }
    });

    Object.assign(Array.prototype,{
        sum(k){
            //数组求和
            if (!this || this.length == 0)
                return 0;
            if (k) {
                return this.reduce(function (partial, item) {
                    return partial + (parseFloat(item[k])||0);
                }, 0);
            }
            else {
                return this.reduce(function (partial, value) {
                    return partial + (parseFloat(value)||0);
                }, 0);
            }
        },
        groupBy(name="name"){
            //数组分组
            let arr = JSON.parse(JSON.stringify(this)),
                re = {};
            for(let i=0;i<arr.length;i++){
                let item = arr[i],
                    group = item[name];
                !re[group] && (re[group]=[]);
                re[group].push(item);
            }    
            return re;
        },
        toTree(id="id",pid="pid",child="child"){
            //数组转树
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
                    !hashVP[child] && (hashVP[child] = []);
                    hashVP[child].push(aVal);
                } else {
                    r.push(aVal);
                }
            }
            return r;
        },
        childFlat(id="id", child = "child", pid=0){
            //数组拉平
            var arr = JSON.parse(JSON.stringify(this));
            var result = [], len = arr.length;
            for (var i = 0; i < len; i++) {
                let ai = arr[i];
                if(pid)
                    ai.pid = pid;
                result.push(ai);
                if (ai[child] && ai[child].length > 0) {
                    result = result.concat(ai[child].childFlat(id,child,ai[id]));
                    delete ai[child];
                }
            }
            return result;
        },
        toggle(v){
            if(index<0)
                this.push(v);
            else
                this.splice(index,1);
        },
        spliceArr(v){
            if(!v || v.length==0)
                return this;
            for(let a of v){
                let index = this.indexOf(a);
                if(index>=0)
                    this.splice(index,1);
            }
        }
    });


    //时间
    Object.assign(Date.prototype,{
        format(fmt){
            //时间格式化
            let date = this,
                ret;
            const opt = {
                "y+": date.getFullYear().toString(),        // 年
                "M+": (date.getMonth() + 1).toString(),     // 月
                "d+": date.getDate().toString(),            // 日
                "h+": date.getHours().toString(),           // 时
                "m+": date.getMinutes().toString(),         // 分
                "s+": date.getSeconds().toString()          // 秒
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        },
        addDays(days,fmt){
            //时间相加天数
            let d = this;
            d.setDate(d.getDate()+days); 
            //fmt参数可选，是否对返回对象进行格式化
            return fmt ? d.Foramt(fmt) :d;
        }
    });

    Object.assign(File.prototype,{
        toJson(){
            let json = {},
                name = this.name,
                size = this.size,
                extension = name.substring(name.lastIndexOf(".")+1,name.length),
                eu = extension.toUpperCase(),
                nuid = Lui.Guid();

            let map = new Map([["JPG",1],["JPEG",1],["PNG",1],["GIF",1],["MP3",2],["MP4",3]]);

            json.file = this;
            json.type = map.get(eu) || 4;	
            json.name = name;
            json.uid = nuid;
            json.uname =  nuid + "." + extension;    
            json.ext = extension;
            json.extUp = eu;
            json.size = parseInt(size)< 1048576 ? (parseFloat(size / 1024).toFixed(2)+"kb") : (parseFloat(size / 1024 / 1024).toFixed(2)+"mb");       
            return json;
        }
    });

    Object.assign(Math,{
        lerp(a,b,k){
            return a+(b-a)*k;
        },
        clamp(a, mi, mx){
            return Math.max(Math.min(a, mx), mi);
        }
    });

    Object.assign(JSON,{
        strParse(){
            return JSON.parse(JSON.stringify(this));
        },
        fileString(json){
            return (json.type||"")+"/"+(json.name||"")+"/"+(json.uname||"")+"/"+(json.size||"");
        }
    })

})();