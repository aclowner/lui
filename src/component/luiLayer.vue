<component>
<style>
.lui-layer{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
}
.lui-layer:after{
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);    
}
.cover0:after{
    background: transparent;
}
</style>

<template>
<transition mode="in-out" name="layer">
<div :class="['lui-layer','cover'+cover,{'layer-alert':alertOpen}]" v-show="ppShow.length>0||alertOpen">
    <transition-group mode="in-out" name="popuping" >
        <component v-for="(pp,pi) in ppShow" :key="pp+pi" @close="close($event,pi)" @close-all="ppShow = []" @open="open" @active="ppActive=pi" @sibling="sibling" @send="send" @alert="alert" @confirm="confirm" :class="[{'show-active':ppActive==pi}]" v-bind:is="transName(pp)" :ref="pp"></component>
        <lui-popup-alert v-if="alertOpen" key="lui-alert" :btns="alertBtn" :con="alertCon"></lui-popup-alert>
    </transition-group>    
</div>
</transition>
</template>

<script>
NS.Component(['luiPopupBody','luiPopupAlert']);
function luiLayer(){
    Object.assign(this,{
        props:{
            cover:{default:1}
        },
        data(){
            return {
                ppActive:0,
                ppShow:[],                  //显示的弹出层 默认后面的在上面
                alertOpen:false,            //alert是否弹出
                alertCon:"",                //alert内容
                alertBtn:[],                //alert按钮组
                alertCall:null,             //alert按钮点击回调
            }
        },
        methods:{
            close(arg,index){
                this.sibling(arg);         
                this.ppShow.splice(index,1);
                this.ppActive = this.ppShow.length-1;
            },            
            open(pp,param){  //打开
                this.ppActive = this.ppShow.length;
                this.ppShow.push(pp);                
                //打开时需要调用改组件
                //调用时因组件渲染时间差，设置0ms延迟
                let count = this.ppShow.filter(o=>o==pp).length;
                if(param && count == 1)  
                    setTimeout(()=>{
                        this.child(pp,param);                            
                    },0);                        
            },
            sibling(arg){
                if(arg && typeof(arg)=="object"&&!Array.isArray(arg)){
                    if(typeof(arg)=="object"&&!Array.isArray(arg)){
                        for(let key in arg){
                            let count = this.ppShow.filter(o=>o==key).length;
                            if(count == 1){
                                if(arg[key]=="close")
                                    this.$refs[key][0].$emit("close");
                                this.child(key,arg[key]);
                            }                                
                        }
                    }
                }      
            },
            send(param){
                //弹出层向父级页面通过send事件传输数据
                this.$emit("send",param);
            },
            alert(con,fn,btns,time=0){
                //alert内容
                this.alertCon = con;
                //alert按钮 默认一个确定按钮
                this.alertBtn = btns || [["确定","blue"]];
                this.alertOpen = true;
                this.alertCall = fn;
            },
            confirm(con,fn,btns,time=0){
                //confirm内容
                this.alertCon = con;
                //confirm按钮  默认为确定、取消两个按钮
                this.alertBtn = btns || [["确定","blue mr2"],["取消",""]];
                this.alertOpen = true;
                this.alertCall = fn;
            },
            alertBtnEvent(ot){
                //alert,confrim 点击事件回调，同时关闭alert、confirm         
                let isClose = {close:true};       
                if(this.alertCall)
                    this.alertCall(ot,isClose);
                if(isClose.close)
                    this.alertOpen = false;
            },
            child(pp,param){  //调用子组件函数，data
                //param为{key:value} key为变量、函数，value为参数                    
                for(let key in param){    
                    if(key==="_close_")
                        this.$refs[pp][0].$emit("close");
                    //pp目标组件名
                    //key目标组件需要被操作的对象
                    let cv = this.$refs[pp][0][key];                        
                    if(typeof(cv)=="function")                          //函数-调用
                        param[key] && Array.isArray(param[key]) ? cv(...param[key]) : cv(param[key]);  
                    else if(typeof(cv)=="object"&&!Array.isArray(cv))   //对象-使用assing合并
                        Object.assign(this.$refs[pp][0][key],param[key]);
                    else //非对象变量
                        this.$refs[pp][0][key] = param[key];            //值类型-赋值  
                }
            },
            childPrev(param){
                //当前激活弹出层的前一个弹出层
                if(this.ppShow.length<2)
                    return;
                let pp = this.ppShow[this.ppShow.length-2];
                this.child(pp,param);
            },            
            transName(name){
                return name.replace(/([A-Z][A-Z][a-z]|[a-z][A-Z])/g,function(x){
                    return x[0] + "-" +x.slice(1);
                }).toLowerCase();
            },
        },
    });
}
</script>
</component>