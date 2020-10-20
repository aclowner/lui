<component>
<style>
.lui-color{
    width: 100%;
    position: relative;
    position: relative;
}
.lui-color input{
    background: var(--input-bg);
}
.lui-color .i-color{
    pointer-events: none;
    position: absolute;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
    width: .2rem;
    height: .2rem;
}
.color-select{
    position: absolute;
    top: var(--input-height);
    margin-top: 2px;
    left: 0;
    border: var(--input-border);
    background: var(--select-bg);
    z-index: 99;
    padding: .12rem .12rem 0 .12rem;
}

.color-selector{
    position: relative;
    display: flex;
}
.color-area{
    width: 301px;
    height: 301px;
    position: relative;
    overflow: hidden;
}
.c, .v, .s {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.s {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}
.v {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.color-bar{
    width: 15px;
    margin-left: 15px;
    background-image: linear-gradient(to bottom, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
    position: relative;
}

.color-cur{
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: solid 1px #000;
    pointer-events: none;
    transform: translate(-50%,-50%);
    left: 0;
    top: 0;
}
.bar-cur{
    position: absolute;
    width: 27px;
    height: 8px;
    pointer-events: none;
    top: -3px;
    left: -6px;
    display: flex;
    justify-content: space-between;
}
.bar-cur:before, .bar-cur:after{
    content: "";
    border-top: solid 4px transparent;
    border-bottom: solid 4px transparent;
}
.bar-cur:before{
    border-left: solid 5px #000;
}
.bar-cur:after{
    border-right: solid 5px #000;
}


.color-output{
    padding: .16rem 0;
    justify-content: space-between;
}
.color-block{
    width: 52px;
    height: 56px;
    display: flex;
    border: solid 1px #ccc;
    flex-direction: column;
}
.cb-new, .cb-old{
    width: 100%;
    flex: 1;
}
.color-ope{    
    justify-content: space-between;
    align-items: flex-end;
}
.color-context{    
    font-size: .16rem;
    line-height: 2;
}
.hex-name{
    margin-left: .24rem;
}
.rgb-name, .hex-name{
    padding-right: .12rem;
}
</style>

<template>
<div class="lui-color">
    <input type="text" @focus="inputFocus" @blur="inputBlur" @mousedown="inputMD" readonly v-model="val">
    <i class="i-color" :style="{background:'rgb('+rgb+')'}"></i>
    <div class="color-select" v-show="show" tabindex="99" @blur="colorBlur" @mousedown="colorMD">
        <div class="color-selector">
            <div class="color-area" @mousedown="areaMD($event)">
                <div class="c" :Style="{background:baseColor}"></div>
                <div class="s"></div>
                <div class="v"></div>
                <a class="color-cur" id="color-cur" ></a>
            </div>   

            <div class="color-bar" @mousedown="barMD($event)">
                <a class="bar-cur" id="bar-cur"></a> 
            </div>    
        </div>

        <div class="color-output flex">
            <div class="color-block flex">
                <span class="cb-new" :style="{background:'rgb('+rgb+')'}"></span>
                <span class="cb-old" :style="{background:value}"></span>
            </div>
            <div class="color-ope flex column">
                <div class="color-context flex">
                    <span class="rgb-name">rgb:</span><span>{{rgb}}</span>
                    <span class="hex-name">hex:</span><span>{{hex}}</span>
                </div>
                <div class="save-cancle flex">
                    <a class="btn btn-sm orange mr1" @click="clear">清空</a>
                    <button class="btn btn-sm blue mr1" @mousedown="save">确定</button>
                    <button class="btn btn-sm" @mousedown="cancle">取消</button>
                </div>
            </div> 
        </div>

    </div>    
</div>
</template>

<script>
function luiColor(){
    Object.assign(this,{
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            value:{defalut:"rgb(255,255,255)"},     
            type:{default:1}       //1:hex(#ffffff)  2:rgb(255,255,255)
        },
        data(){
            return {
                show: false,
                evTag : "",
                def:{hex:"#ffffff",rgb:"255,255,255"},
                rgb:"255,255,255",
                val:"",
                baseColor:"red",
                hsv:{h:360,s:0,v:1}
            }
        },
        mounted(){
            this.curColor = document.getElementById('color-cur');
            this.curBar = document.getElementById('bar-cur');
        },
        computed:{
            hex(){
                return this.RGB2HEX(this.rgb);
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
            colorMD(){
                this.evTag = "lmd";
            },
            colorBlur(){
                this.show = false;			
            },       
            areaMD(e){
                //颜色选择区域点击滑动事件
                let ePos = {
                        x: e.offsetX,
                        y: e.offsetY
                    },
                    ePage = {
                        x: e.pageX,
                        y: e.pageY
                    };
                this.colorSite(ePos);
                document.onmousemove = (e)=>{
                    let move = {
                        x: e.pageX - ePage.x,
                        y: e.pageY - ePage.y
                    };
                    let pos = {
                            x: ePos.x + move.x,
                            y: ePos.y + move.y
                        };
                    this.colorSite(pos);                        
                };
                document.onmouseup = function() {
                    document.onmouseup = document.onmousemove = null;
                }
            },
            barMD(e){
                //颜色轴点击滑动事件
                let ePosY = e.offsetY,
                    ePageY = e.pageY;
                this.barSite(ePosY);
                document.onmousemove = (e)=>{
                    let moveY = e.pageY - ePageY;
                    let posY = ePosY + moveY;
                    this.barSite(posY);                        
                };
                document.onmouseup = function() {
                    document.onmouseup = document.onmousemove = null;
                }
            },
            colorSite(pos){
                //颜色选择点在颜色选择区域位置
                let hsv = this.hsv;
                pos.x = pos.x < 0 ? 0 : pos.x && (pos.x > 300 ? 300 : pos.x);
                pos.y = pos.y < 0 ? 0 : pos.y && (pos.y > 300 ? 300 : pos.y);  
                
                this.curColor.style.left = pos.x  + 'px';
                this.curColor.style.top = pos.y  + 'px';

                hsv.s = pos.x / 300;
                hsv.v = (300 - pos.y) / 300;
                let rgb = this.HSV2RGB(hsv.h, hsv.s, hsv.v);
                this.rgb = rgb.join(",");
                console.log(rgb);
            },
            barSite(y){
                //颜色轴选择位置
                let hsv = this.hsv;

                y = y<0 ? 0 : y && (y>300 ? 300 : y);
                this.curBar.style.top = y-4  + 'px';

                hsv.h = (y / 300) * 360;
                
                let bc = this.H2RGB(hsv.h);
                this.baseColor = `rgb(${bc})`;
                let rgb  = this.HSV2RGB(hsv.h, hsv.s, hsv.v);
                this.rgb = rgb.join(",");
            },
            HSV2RGB(h, s, v){
                let color = this.H2RGB(h);
                for (let i = 0; i < color.length; i++) {
                    color[i] = Math.round((color[i] * s + 255 * (1 - s)) * v);
                }
                return color;
            },
            H2RGB(h){
                let colors = [[1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 1, 1], [0, 0, 1], [1, 0, 1], [1, 0, 0]];
                h      = Math.abs(h % 360);
                let i  = ~~(h / 60);
                let k  = (h % 60) / 60;
                let c1 = colors[i];
                let c2 = colors[i + 1];
                let r  = [0, 0, 0];
                for (let j = 0; j < 3; j++) {
                    r[j] = (c1[j] + (c2[j] - c1[j]) * k) * 255;
                }
                return r;
            },
            RGB2HSV(str) {
                let arr = str.split(",");
                var rr, gg, bb,
                    r = arr[0] / 255,
                    g = arr[1] / 255,
                    b = arr[2] / 255,
                    h, s,
                    v = Math.max(r, g, b),
                    diff = v - Math.min(r, g, b),
                    diffc = function(c){
                        return (v - c) / 6 / diff + 1 / 2;
                    };

                if (diff == 0) {
                    h = s = 0;
                } else {
                    s = diff / v;
                    rr = diffc(r);
                    gg = diffc(g);
                    bb = diffc(b);

                    if (r === v) {
                        h = bb - gg;
                    }else if (g === v) {
                        h = (1 / 3) + rr - bb;
                    }else if (b === v) {
                        h = (2 / 3) + gg - rr;
                    }
                    if (h < 0) {
                        h += 1;
                    }else if (h > 1) {
                        h -= 1;
                    }
                }
                return [
                    Math.round(h * 360),
                    Math.round(s * 100),
                    Math.round(v * 100)
                ];
            },
            RGB2HEX(rgb) {
                var aRgb = rgb instanceof Array ? rgb : (rgb.split(',') || [0, 0, 0]);
                var temp;
                return [
                    (temp = Number(aRgb[0]).toString(16)).length == 1 ? ('0' + temp) : temp,
                    (temp = Number(aRgb[1]).toString(16)).length == 1 ? ('0' + temp) : temp,
                    (temp = Number(aRgb[2]).toString(16)).length == 1 ? ('0' + temp) : temp,
                ].join('');
            },
            HEX2RGB(hex, opacity) {
                return parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7));
            },
            save(){
                let val = this.type == 1 ? "#"+this.hex : (this.type==2 ? this.rgb : "#"+this.hex+"/"+this.rgb);
                this.val = val;
                this.$emit("input",val);
                this.show = false;
            },
            cancle(){
                this.show = false;
            },
            clear(){
                this.$emit("input","");
                let hsv = [0,0,1];                    
                this.showSite(hsv);
                this.show = false;
            },
            showSite(hsv){
                this.hsv = {h:hsv[0],s:hsv[1]*.01,v:hsv[2]*.01};

                //计算对应颜色轴位置
                let bpy = parseInt(hsv[0] / 360 * 300);
                this.curBar.style.top = bpy-4  + 'px';

                //根据hsv的h值设置基色值
                let bc = this.H2RGB(hsv[0]);
                this.baseColor = `rgb(${bc})`;

                //根据hsv s/v值计算色点在颜色区域位置
                let cpx = hsv[1] *.01 * 300,
                    cpy = 300 - hsv[2]*.01*300;
                this.curColor.style.left = cpx  + 'px';
                this.curColor.style.top = cpy  + 'px';
            }
        },
        watch:{
            value:{
                handler(nv){   
                    if(nv!=this.val)
                        this.val = nv;                 
                },
                immediate:true
            },
            show(nv){
                if(nv==true){
                    //打开
                    let cv = this.value || this.val;
                    if(this.type==1){
                        let hex = this.def.hex;
                        if(cv && cv[0]=="#" && cv.length==7)
                            hex = cv;
                        this.rgb = this.HEX2RGB(hex);
                    }
                    else if(this.type==2){
                        let rgb = this.def.rgb;
                        if(cv && cv.includes(",") && cv.split(",").length==3)
                            rgb = cv;
                        this.rgb = rgb;
                    }

                    //根据当前颜色值计算hsv值
                    let hsv = this.RGB2HSV(this.rgb);                    
                    this.showSite(hsv);
                }
            }
        }
    });
}
</script>
</component>