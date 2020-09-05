<component>
<style>
.lui-datetime{
    width: 100%;
    position: relative;
}
.lui-datetime .i-datetime{
    pointer-events: none;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(50%,-50%);            
    width: 12px;
    height: 12px;
}
.datetime-select{
    position: absolute;
    color:var(--color);
    background: var(--select-bg);
    border: var(--input-border);
    width: 2.56rem;
    left: 0;
    top: var(--input-height);
    margin-top: 2px;
    font-size: .14rem; 
    z-index: 99; 
}
.date-top-btn{    
    line-height:32px;
    display: flex;
    align-items: center;
    justify-content: space-between;   
}
.date-top-btn .a-prev, .date-top-btn .a-next{
    width: 50px;
    color:var(--input-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
}
.date-top-btn .a-prev:hover, .date-top-btn .a-next:hover{
    color: var(--select-color);
}
.date-top-btn .a-prev:before, .date-top-btn .a-next:before{
    content: "";
    display: inline-block;
    vertical-align: top;
    width: 8px;
    height: 8px;
    border-left: solid 1px;
    border-bottom: solid 1px;
}
.date-top-btn .a-prev:before{
    transform: rotate(45deg);
}
.date-top-btn .a-next:before{
    transform: rotate(-135deg);
}
.date-top-btn .a-ym{
    flex: 1;
    overflow: hidden;
    text-align: center;
}

.week{
    height:.24rem;
    padding:0 .1rem;
    background:#ededed;
    display: flex;
    align-items: center;
}
.week>span{
    width:.28rem;
    text-align:center;
    margin-left:.06rem;
    color:#666;
    text-align:center;  
}
.week>span:first-child{
    margin-left:0;
}
.days{
    padding:10px 10px 4px 4px;
    display: flex;
    flex-wrap: wrap;
}
.days>a{
    width: .28rem;
    height: .28rem;
    margin-left: .06rem;
    margin-bottom: .06rem;
    border-radius: .14rem;
    text-align: center;
    line-height: 2
}
.days>a.enable{
    color: #5b7f8c;
}
.days>a.enable:hover{
    background: none;
    cursor: default;
}

.month-box, .year-box{
    padding: .2rem .37rem .12rem .37rem;
}
.month-box>a, .year-box>a{
    width: .42rem;
    height: .42rem;
    text-align: center;
    line-height: .42rem;
    display: inline-block;
    vertical-align: top;
    margin: 0 .26rem .08rem 0;
    border-radius: .21rem;
    align-items: center;
    justify-content: center;
    font-size: .14rem;
}
.ly2>a{
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
}
.list-month>a:nth-child(3n), .list-year>a:nth-child(3n){
    margin-right: 0;
}
.list-day>.days>a:hover, .list-month>a:hover, .list-year>a:hover{
    background:var(--select-li-hover-bg);
}
.list-day>.days>a.active, .list-month>a.active, .list-year>a.active{
    background:var(--select-color);
    color:#fff;
}
.hhmm{
    width: 220px;
    height: 220px;
    position: relative;
    background: #ebebeb;
    border-radius: 120px;
    margin: 17px;
}
.hh, .mm{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
}
.hh>a, .mm>a{
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    transform-origin: center center;    
}
.hh>a> span, .mm>a span{
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    transform-origin: center center; 
}
.hh>a:nth-child(n+13){
    font-size: 12px;
    color: #888;
}
.hh>a:hover{
    background: #ddd; 
}
.hh:after, .mm:after{
    content: "";
    height: 8px;
    width: 8px;
    background: var(--select-color);
    border-radius: 4px;
    position: absolute;
    top: 11px;
    left: 11px;
}
.hh>a.active{
    background: var(--select-color);
    color: #fff;
}
.a-line{
    position: absolute;
    height: 1px;
    transform-origin: left top; 
    background: var(--select-color);
    top: 15px;
    left: 15px;
}

.mm{
    margin-top: -5px;
    margin-left: -14px;
}
.mm>a, .mm>a span{
    height: 10px;
    width: 28px;  
    line-height: 10px; 
}
.mm>a{
    font-size: 0;
}
.mm>a:nth-child(5n){
    font-size: 14px;
}
.mm>a>span{
    pointer-events: none;
    z-index: 19;
    margin-left: 14px;
}
.mm:after{
    left: 10px;
    top: 1px;
}
.mm>a:before{
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;    
    border-radius: 2px;
    top: 3px;
    left: 12px;
    pointer-events: none;
    background: #ddd;
    z-index: 20;
}
.mm>a:nth-child(5n):before{
    width: 8px;
}
.mm>a:after{
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;    
    border-radius: 14px;
    top: -9px;
    left: 0;
    pointer-events: none;
    z-index: -1;
}
.mm>a:hover{
    z-index: 17;
}
.mm>a:hover:after{
    z-index: 1;
    background: rgba(0,0,0,0.1);
}
.mm>a:hover:before{
    background: var(--select-color);
}
.mm>a.active, .mm>a.active:hover{
    color: var(--select-color);
}
.mm>a.active:before, .mm>a.active:hover:before{
    background: var(--select-color);
}
.mm .a-line{
    width: 82px;
    top: 5px;
    left: 14px;
}

.hmsave, .ymdhmsave{
    height: 41px;
    border-top: var(--input-border);
    line-height: 40px;
    display: flex;
    justify-content: space-around;
}
.hmsave>span{
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
}
.hmsave>span>a{
    height: 25px;
    line-height: 24px;
    margin-left: 8px;
    padding: 0 6px;
    border-bottom: solid 1px var(--select-color);
    color: var(--select-color);
}
.hmsave>a{
    width: 52px;
    color: var(--select-color);
    text-align: center;
}
.ymdhmsave>a{
    padding: 0 10px;
}
.ymdhmsave>a:nth-child(2){
    margin-right: 20px;
}
</style>
<template>
<div class="lui-datetime">
    <input type="text" @focus="inputFocus" @blur="inputBlur" @mousedown="inputMD" :value="val" readonly/>
    <i class="iconfont icon-calendar i-datetime"></i>
    <div class="datetime-select" v-show="show" tabindex="99" @blur="dateBlur" @mousedown="dateMD">
        <template v-if="type!=4&&active!=6">
            <div class="date-top-btn">
                <a class="a-prev" @click="pnClick(-1)"></a>
                <a class="a-ym" @click="ymClick">{{top}}</a>
                <a class="a-next" @click="pnClick(1)"></a>
            </div>
            <div class="day-box" v-if="active==1||active==5">
                <div class="week"><span v-for="w in weekArr" :key="w">{{w}}</span></div>
                <div class="days">
                    <a :class="['a-day',{active:getDayActive(d)}]" v-for="d in days" :key="d" :style="{marginLeft:(d==1?DFstyle:'.06rem')}" @click="dayClick(d)">{{d}}</a>							
                </div>
            </div>
            <div class="month-box" v-else-if="active==2">
                <a :class="['a-month',{active:i+1 == month}]" v-for="(m,i) in monthArr" :key="i" @click="monthClick(i)">{{m}}</a>								
            </div>
            <div :class="['list-year',{ly2:active==4}]" v-else>
                <a :class="['a-year',{active:yCloud(y)}]" v-for="(y,yi) in yearArr" :key="yi" @click="yearClick(y)">{{y}}</a>	
            </div>
        </template>
        <div class="hhmm" v-if="type==4||active==6">
            <div class="hh" v-show="hms==1">
                <a v-for="a in 24" :key="a" :style="hhPst(a)" :class="{active:a==parseInt(hhmm[0])||(a==24&&hhmm[0]=='00')}" @click="hhClick(a)"><span :style="hhtRt(a)">{{a==24?"00":a}}</span></a>
                <span class="a-line" :style="hhlPst"></span>
            </div>
            <div class="mm" v-show="hms==2">							
                <a v-for="a in 59" :key="a" :style="mmPst(a)" :class="{active:a==parseInt(hhmm[1])}" @click="mmClick(a)"><span :style="mmtRt(a)">{{a<10?"0"+a:a}}</span></a>
                <a :style="mmPst(0)" :class="{active:hhmm[1]=='00'}" @click="mmClick(0)"><span :style="mmtRt(0)">00</span></a>
                <span class="a-line" :style="mmlPst"></span>
            </div>
        </div>
        <div class="hmsave" v-if="type==4">
            <span>时:<a @click="hms=1">{{hhmm[0]}}</a></span><span>分:<a @click="hms=2">{{hhmm[1]==60?"00":hhmm[1]}}</a></span>
            <a @click="mmClick(-1)">确定</a>
        </div>
        <div class="ymdhmsave" v-if="type==5">
            <a @click="active=5">{{year+"-"+month.toString().padStart(2,"0")+"-"+day.toString().padStart(2,"0")}}</a>
            <a @click="active=6;hms=1;">{{hhmm.join(":")}}</a>
            <a @click="mmClick(-1)">确定</a>
        </div>
    </div>
</div>
</template>
<script>
//type 1:年月日 2:年月 3:年 4:时分 5:年月日时分
function luiDatetime(){
    Object.assign(this,{
        name:"lui-datetime",
        model:{
            prop : "value",
            event : "input"
        },
        props:{            
            'value' : {default:""},           //选中值 sync传入，update修改
            'format' : {default:"yyyy-MM-dd"},             
            "start" : {default:""},
            "end" : {default:""},
        },
        data(){
                return{
                    val: "",
                    type: 1,  //1:年月日 2:年月 3:年 4:时分 5:年月日时分
                    fmMap: new Map([["yyyyMMdd",1],["yyyyMM",2],["yyyy",3],["hh:mm",4],["yyyyMMdd hh:mm",5]]),
                    show: false,
                    evTag : "",
                    weekArr : ["日","一","二","三","四","五","六"],              //星期显示
                    monthArr : ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],  //月份显示
                    active : parseInt(this.type==5?1:this.type),             //1:选择天 2:选择月 3:选择年 4:选择10年 5:选择天（时分） 6:选择时分
                    year : 0,
                    month : 0,
                    day : 0,
                    ys : 0,
                    hhmm : [],
                    hms : 1,
                }
            },
            computed:{
                sp(){
                    return this.value&&this.value.toString().indexOf("/")>0?"/":"-";
                },
                top(){  //标题根据不同选择状态显示不同的内容
                    let ysp = [...(this.year+"")];
                    if(this.active==1 || this.active==5)
                        return this.year +" / "+ this.month.toString().padStart(2,"0");
                    else if(this.active==2){
                        return this.year			
                    }
                    else if(this.active==3){
                        return this.ys + " - " + (this.ys + 11);
                    }
                    else if(this.active==4){
                        return this.ys + " - " + (this.ys + 119);
                    }
                },
                days(){  //计算该年月下的天数
                    if([1,3,5,7,8,10,12].indexOf(this.month)>=0)
                        return 31;
                    else if([4,6,9,11].indexOf(this.month)>=0)
                        return 30;
                    else{
                        if((this.year%4==0&&this.year%100!=0) || this.year%400 ==0 )
                            return 29;
                        else
                            return 28;
                    }
                },
                yearArr(){
                    let	result = new Array(12).fill(0);
                    if(this.active==3){				
                        result = result.map((o,i)=>this.ys+i);
                    }
                    else if(this.active==4){				
                        result = result.map((o,i)=>i*10+this.ys + "-" + (i*10+this.ys+9))
                    }			
                    return result;                        
                },
                DFstyle(){
                    let df = new Date(this.year,this.month-1,1).getDay();
                    return (34*df+6)/100+"rem";
                },
                hhlPst(){  //小时指针位置
                    let hh = parseInt(this.hhmm[0]);
                        h12 = hh<13 ? hh : hh-12,
                        rt = (h12-1)*30-60,
                        w = hh<13&&hh>0 ? 78 : 48;
                    return {
                        transform:"rotate("+rt+"deg)",
                        width:w+"px"
                    }
                },
                mmlPst(){  //分钟指针位置
                    let mm = parseInt(this.hhmm[1]);
                        rt = mm*6-90;
                    return {
                        transform:"rotate("+rt+"deg)"
                    }
                }
            },
            methods:{
                inputFocus(){
                    if(this.evTag!="imd")
                        this.show = true;
                    else
                        this.evTag = "";
                },
                inputMD(){
                    this.evTag = "imd";
                    this.show = !this.show;
                },
                inputBlur(){
                    if(this.evTag!="lmd")
                        this.show = false;				
                },
                dateMD(){
                    this.evTag = "lmd";
                },
                dateBlur(){
                    this.show = false;			
                },
                pnClick(i){
                    if(this.active<3)
                        this.year+=i;
                    else if(this.active==3)
                        this.ys += i*12;
                    else if(this.active==4)
                        this.ys += i*120;
                },
                ymClick(){                    
                    if(this.active<4)
                        this.active += 1;
                    if(this.active==3)
                        this.ys = this.year - 4;
                    else if(this.active==4)
                        this.ys = parseInt(this.year.toString().substring(0,3)+"1") - 40;
                },		
                monthClick(v){
                    //月列表点击
                    this.month = v+1;
                    if(this.type==2){   //type--2 选择年月  月点击即为选择值
                        this.val = [this.year,this.month.toString().padStart(2,"0")].join(this.sp);
                        this.show = false;                        				
                    }
                    else{
                        this.active=1;
                    }
                },
                yearClick(v){	
                    //年列表点击
                    if(this.active==3){
                        this.year = v;
                        if(this.type==3){   ////type--3 选择年  年点击即为选择值
                            this.val = v;
                            this.show = false;	
                        }
                        else
                            this.active --;
                    }
                    else{
                        this.active --;
                        this.ys = parseInt(v.split("-")[0]);				
                    }
                },
                dayClick(d){  //天-点击
                    this.day = d;
                    if(this.type==5){
                        this.active = 6;
                    }
                    else{			
                        this.val = [this.year,this.month.toString().padStart(2,"0"),this.day.toString().padStart(2,"0")].join(this.sp);
                        this.show = false;	
                    }
                },
                getDayActive(d){
                    let sd = [this.year,this.month.toString().padStart(2,"0"),d.toString().padStart(2,"0")].join(this.sp),
                        cv = this.val ? (this.type==5 ? this.val.split(" ")[0] : this.val) : this.date();
                    return sd == cv;
                },
                yCloud(y){
                    y += "";
                    if(y.indexOf("-")>0){
                        let arr =y.split("-");
                        if(parseInt(arr[0])<=this.year&&parseInt(arr[1])>=this.year)
                            return true;
                        else
                            return false;
                    }
                    else
                        return y==this.year;
                },		
                date(t){
                    let date = new Date(),
                        year = date.getFullYear(),
                        month = (date.getMonth() + 1).toString().padStart(2,'0'),
                        dd = date.getDate().toString().padStart(2,'0');
                        hm = date.getHours().toString().padStart(2,'0') + ":" +date.getMinutes().toString().padStart(2,'0');
                    return t==1 ? hm : ([year,month,dd].join(this.sp) + (t==2 ? (" "+hm) : ""));
                },
                hhPst(i){
                    let h12 = i<13?i:i-12,
                        rt = h12*30-90,
                        tx = i<13?92:62;
                    return {
                        transform:"rotate("+rt+"deg) translate("+tx+"px)"
                    }
                },
                hhtRt(i){
                    let h12 = i<13?i:i-12,
                        rt = 60-(h12-1)*30;
                    return {
                        transform:"rotate("+rt+"deg)"
                    }
                },		
                mmPst(i){
                    let rt = i*6-90;
                    return {
                        transform:"rotate("+rt+"deg) translate(82px)"
                    }
                },
                mmtRt(i){
                    let rt = 90-i*6;
                    return {
                        transform:"rotate("+rt+"deg)"
                    }
                },
                hhClick(a){
                    let ar = a==24 ? 0 : a; 
                    this.hhmm = [(ar < 10 ? "0"+ar : ar),this.hhmm[1]];
                    this.hms = 2;
                },
                mmClick(a){        
                    if(a>=0)         
                        this.hhmm[1] = a < 10 ? "0"+a : a;
                    this.val = (this.type==4 ? "" : [this.year,this.month.toString().padStart(2,"0"),this.day.toString().padStart(2,"0")].join(this.sp) + " ") + this.hhmm.join(":");
                    this.show = false;
                },
                setValue(){
                    //设置当前时间选择需要的相关参数
                    let v = "";
                    this.hms = 1;			
                    if(this.type==4){ //时、分				
                        v = this.val || this.date(1);
                        this.hhmm = v.split(":");
                    }
                    else{
                        v = this.val || this.date(2);
                        let ymd = v;
                        if(this.type==5){			
                            ymd = v.split(" ")[0];
                            this.hhmm = v.split(" ")[1].split(":");
                        }
                        let darr = v.toString().split(this.sp);
                        this.year = parseInt(darr[0]);
                        this.ys = this.year - 4;
                        if([1,2,5].includes(this.type))
                            this.month = parseInt(darr[1]);
                        if([1,5].includes(this.type))
                            this.day = parseInt(darr[2]);
                    }
                },
            },
            watch:{
                show(v){
                    if(v){			
                        this.active = this.type==5?1:this.type;
                        this.setValue();				
                    }
                },
                val(v){
                    //显示值改变即为选择完成，更新父级值，并发出时间
                    this.$emit("input",this.val);
                    this.$emit('change',this.val);
                },
                value:{
                    handler:function(nv){
                        this.val = nv;
                    },
                    immediate: true                    
                },
                foramt:{
                    handler:function(nv){
                        this.type = nv ? this.fmMap.get(nv.replace(/-/g,"")) : 1;
                    },
                    immediate:true,
                }
            }
    });
}
</script>
</component>