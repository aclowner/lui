<component>
<style>
.lui-star{
    align-items: center;    
    line-height: 1;
}
.star-item{
    margin-right: .08rem;
    position: relative;
}
.icon{    
    font-size: .28rem;
    color: var(--input-border-color);
    font-weight: normal;
}
.span-fill{
    position: absolute;
    left: 0;
    top: 0;
    color: var(--active-color);
    overflow: hidden;
}
.i-favorite-filling{
    color: var(--active-color);
}
</style>

<template>
<div class="lui-star flex" @mouseenter="menter" @mouseleave="mleave">
    <div class="star-item" v-for="s in total" :key="s" @mousemove="mmove($event,s)" @click="starClick">
        <span class="icon i-favorite"></span>
        <div class="span-fill" :style="{width:fileWidth(s)}">
            <span class="icon i-favorite-filling"></span>
        </div>        
    </div>
    <span><slot></slot></span>
</div>
</template>

<script>
function luiStar(){
    Object.assign(this,{
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            total:{default:5},
            value:{default:0}
        },
        data(){
            return {
                val:0,
            }
        },
        computed:{
            zs(){
                //整数
                let val = parseInt(this.val) || 0;
                return Math.min(val,this.total)
            },
            xs(){
                //小数
                let s = this.val + "",
                    si = s.indexOf(".");
                if(si<0)
                    return 0;
                let end = s.substr(si+1,2).padEnd(2,"0");
                return parseInt(end)
            }
        },
        methods:{
            fileWidth(s){
                if(s<=this.zs){
                    return "100%";
                }
                else if(s==this.zs + 1){
                    return this.xs.toScale([0,100],[10,90]) + "%";
                }
                else{
                    return "0%";
                }
            },
            menter(){
                this.oldV = this.val;
            },
            mmove(e,num){
                let w = e.target.offsetWidth,
                    mw = e.offsetX;
                if(mw/w>.5)
                    this.val = num
                else
                    this.val = num - .5;
            },
            mleave(){
                this.val = this.oldV;                
            },
            starClick(){
                this.oldV = this.val;   
                this.$emit("input",this.val);             
            },
        },
        watch:{
            value:{
                handler(nv){
                    if(nv==undefined || nv=="")
                        this.$emit("input",0); 
                    if(nv != this.val)
                        this.val = nv;
                },
                immediate:true
            }
        }
    });
}
</script>
</component>