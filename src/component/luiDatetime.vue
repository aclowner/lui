<component>
<style>
.lui-datetime{
    width: 100%;
    position: relative;
    font-size: .16rem;
}
.lui-datetime:before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: var(--input-height);
    border-left: var(--input-border);
}
.lui-datetime .i-datetime{
    pointer-events: none;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(50%,-50%);
    font-size: .20rem;
    color: var(--active-color);
}
.datetime-select{
    position: absolute;
    color:var(--color);
    background: var(--select-bg);
    border: var(--input-border);
    width: 2.84rem;
    left: 0;
    top: var(--input-height);
    margin-top: 2px;    
    z-index: 99; 
}
.date-top-btn{    
    line-height:2.5;
    display: flex;
    align-items: center;
    justify-content: space-between;  
    padding: 0 .08rem; 
}
.date-top-btn .a-prev, .date-top-btn .a-next{
    width: .3rem;
    width: .3rem;
    color:var(--input-color);
    display: flex;
    align-items: center;
    justify-content: center;
}
.date-top-btn .a-prev:hover, .date-top-btn .a-next:hover{
    color: var(--active-color);
}
.date-top-btn .a-prev:before, .date-top-btn .a-next:before{
    content: "";
    display: inline-block;
    vertical-align: top;
    width: .1rem;
    height: .1rem;
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
    font-size: .2rem;
    flex: 1;
    overflow: hidden;
    text-align: center;
}

.week{
    line-height: 2.2;
    padding:0 .1rem;
    background:#ededed;
    display: flex;
    align-items: center;
}
.week>span{
    width:.32rem;
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
.days>a, .day-before{
    width: .32rem;
    height: .32rem;
    margin-left: .06rem;
    margin-bottom: .06rem;
    border-radius: 100%;
}
.days>a, .month-box>a, .year-box>a{
    display: flex;
    align-items: center;
    justify-content: center;
}
.days>a.isday{
    color: var(--active-color);
}

.month-box, .year-box{
    padding: .02rem .28rem .05rem .28rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: var(--input-border);
}
.month-box>a, .year-box>a{
    width: .54rem;
    height: .54rem;
    margin: .05rem;
    border-radius: 100%;
}
.ly2>a{
    font-size: .14rem;
    line-height: 1;
    padding-left: .08rem;
}
.month-box>a:nth-child(3n), .year-box>a:nth-child(3n){
    margin-right: 0;
}
.days>a:hover, .month-box>a:hover, .year-box>a:hover{
    border: solid 1px var(--active-color);
}
.year-box.ly2>a:hover{
    padding-left: .07rem;
}
.days>a.active, .month-box>a.active, .year-box>a.active{
    background:var(--active-color);
    color:#fff;
}
.days>a.enable{
    color: var(--disable-color);
    background: none;
}
.days>a.enable:hover{
    border: none;
    cursor: default;    
}


.hhmm{
    width: 2.4rem;
    height: 2.4rem;
    position: relative;
    background: #ebebeb;
    border-radius: 100%;
    margin: .22rem;
}
.hh, .mm{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -.16rem;
    margin-top: -.16rem;
}
.hh>a, .mm>a{
    position: absolute;
    width: .32rem;
    height: .32rem;
    border-radius: 100%;
    transform-origin: center center;    
}
.hh>a> span, .mm>a span{
    width: .32rem;
    height: .32rem;
    text-align: center;
    line-height: .32rem;
    position: absolute;
    transform-origin: center center; 
}
.hh>a:nth-child(n+13){
    font-size: .14rem;
    color: #888;
}
.hh>a:hover{
    background: #ddd; 
}
.hh:after, .mm:after{
    content: "";
    height: .1rem;
    width: .1rem;
    background: var(--active-color);
    border-radius: 100%;
    position: absolute;
    top: .1rem;
    left: .1rem;
}
.hh>a.active{
    background: var(--active-color);
    color: #fff;
}
.a-line{
    position: absolute;
    height: 1px;
    transform-origin: left top; 
    background: var(--active-color);
    top: .15rem;
    left: .15rem;
}

.mm{
    margin-top: -.05rem;
    margin-left: -.14rem;
}
.mm>a, .mm>a span{
    height: .12rem;
    width: .3rem;  
    line-height: .1rem; 
}
.mm>a{
    font-size: 0;
}
.mm>a:nth-child(5n){
    font-size: .16rem;
}
.mm>a>span{
    pointer-events: none;
    z-index: 19;
    margin-left: .18rem;
}
.mm:after{
    left: .1rem;
    top: .01rem;
}
.mm>a:before{
    content: "";
    position: absolute;
    width: .04rem;
    height: .04rem;    
    border-radius: 100%;
    top: .04rem;
    left: .12rem;
    pointer-events: none;
    background: #ccc;
    z-index: 20;
}
.mm>a:nth-child(5n):before{
    width: .1rem;
}
.mm>a:after{
    content: "";
    position: absolute;
    width: .3rem;
    height: .3rem;    
    border-radius: 100%;
    top: -.1rem;
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
    background: var(--active-color);
}
.mm>a.active, .mm>a.active:hover{
    color: var(--active-color);
}
.mm>a.active:before, .mm>a.active:hover:before{
    background: var(--active-color);
}
.mm .a-line{
    width: .88rem;
    top: .06rem;
}

.hmsave, .ymdhmsave{
    border-top: var(--input-border);
    line-height: 3;
    display: flex;
    justify-content: space-around;
}
.hmsave>span{
    width: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: .1rem;
}
.hmsave>span>a{
    line-height: 1.5;
    margin-left: .1rem;
    padding: 0 .08rem;
    border-bottom: solid 1px var(--active-color);
    color: var(--active-color);
}
.hmsave>a{
    width: .5rem;
    color: var(--active-color);
    text-align: center;
    margin-right: .1rem;
}
.ymdhmsave>a{
    padding: 0 .14rem;
    color: var(--active-color);
}
.ymdhmsave>a:hover, .hmsave>a:hover{
    text-decoration: underline;
}
.ymdhmsave>a:nth-child(2){
    margin-right: .2rem;
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
                <div class="a-ym"><a  @click="ymClick">{{top}}</a></div>
                <a class="a-next" @click="pnClick(1)"></a>
            </div>
            <div class="day-box" v-if="active==1||active==5">
                <div class="week"><span v-for="w in weekArr" :key="w">{{w}}</span></div>
                <div class="days">
                    <template v-if="ymDayFirst>0"><span class="day-before" v-for="(before,di) in ymDayFirst" :key="'begore'+di"></span></template>                    
                    <a :class="['a-day',{active:getDayActive(d)},{isday:d==now.d},{enable:!getDayAble(d)}]" v-for="(d,di) in days" :key="di" @click="dayClick(d)">{{d}}</a>							
                </div>
            </div>
            <div class="month-box" v-else-if="active==2">
                <a :class="['a-month',{active:i+1 == month}]" v-for="(m,i) in monthArr" :key="i" @click="monthClick(i)">{{m}}</a>								
            </div>
            <div :class="['year-box',{ly2:active==4}]" v-else>
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
            "min" : {default:null},
            "max" : {default:null},
        },
        data(){
                return{
                    val: "",
                    type: 1,  //1:年月日 2:年月 3:年 4:时分 5:年月日时分
                    fmMap: new Map([["yyyyMMdd",1],["yyyyMM",2],["yyyy",3],["hh:mm",4],["yyyyMMdd hh:mm",5]]),
                    now:{d:0},
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
                ymDayFirst(){
                    return this.year&&this.month ? new Date(this.year,this.month-1,1).getDay() : 1;
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
                },
                minVal(){
                    let minV = this.getMinMaxVal(this.min);
                    return minV ? new Date(minV+" 01:").getTime() : false;
                },
                maxVal(){
                    let maxV = this.getMinMaxVal(this.max);
                    return maxV ? new Date(maxV+" 23:").getTime() : false;
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
                    if(!this.getDayAble(d))
                        return;
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
                getDayAble(d){
                    let minB = true,
                        maxB = true;
                    let ddd = this.year+"-"+this.month.toString().padStart(2,"0")+"-"+d.toString().padStart(2,"0")+" 10:";
                    if(this.minVal)
                        minB = new Date(ddd).getTime() > this.minVal;
                    if(this.maxVal)
                        maxB = new Date(ddd).getTime() < this.maxVal;
                    console.log(minB,maxB,this.minVal,this.maxVal)
                    return minB && maxB;
                },
                getMinMaxVal(v){
                    if(v==null || v==undefined)
                        return false;                    
                    let tof = typeof v,
                        str = "";
                    console.log(v,tof);
                    if(tof=="string")
                        str = v;
                    else if(tof=="number")
                        str = new Date().addDays(v,"yyyy-MM-dd");
                    else
                        return false;
                    console.log(str)
                    return str;
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
                    let date = this.nowDate || new Date(),
                        year = date.getFullYear(),
                        month = (date.getMonth() + 1).toString().padStart(2,'0'),
                        dd = date.getDate().toString().padStart(2,'0');
                        hm = date.getHours().toString().padStart(2,'0') + ":" +date.getMinutes().toString().padStart(2,'0');
                    return t==1 ? hm : ([year,month,dd].join(this.sp) + (t==2 ? (" "+hm) : ""));
                },
                hhPst(i){
                    let h12 = i<13?i:i-12,
                        rt = h12*30-90,
                        tx = i<13?1.04:.7;
                    return {
                        transform:"rotate("+rt+"deg) translate("+tx+"rem)"
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
                        transform:"rotate("+rt+"deg) translate(.88rem)"
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
                        this.nowDate = new Date();	
                        this.now.d = this.nowDate.getDate();
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
                format:{
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