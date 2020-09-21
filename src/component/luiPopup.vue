<component>
<style>
.layer-enter{
    transform:scale(0.5);
    opacity: 0.1;
}
.layer-enter-active{
    transition:  all .4s;    
}
.layer-leave-active{
    opacity: 0;
    top: 50%;
    transition:  all .4s; 
}
.popuping-enter{
    top: 40%;
    opacity: 0.1;
}
.popuping-enter-active{
    transition:  all .6s;    
}
.popuping-leave-active{
    opacity: 0;
    top: 60%;
    transition:  all .5s; 
}
</style>
<template>
    <transition mode="in-out" name="layer">
    <div class="layer" v-show="ppShow.length>0||alertOpen">
        <transition-group mode="in-out" name="popuping" >
            <!-- ppShow为当前弹出的组件数组，多个时仅有一个在遮罩上，最后添加的在最上面 -->
            <lui-popup-body v-for="(pp,pi) in ppShow" :key="pp[1]" :title="pp[0]" :class="{show:!alertOpen&&pi==ppShow.length-1}">
                <component v-bind:is="pp[1].transLink()" :ref="pp[1]"></component>
            </lui-popup-body>      
            <lui-popup-alert v-if="alertOpen" key="alert" :btns="alertBtn" :con="alertCon"></lui-popup-alert>      
        </transition-group>
    </div>
    </transition>
</template>
<script>
NS.Component(['luiPopupBody','luiPopupAlert']);
function luiPopup(){
    Object.assign(this,{
        props:{                
        },
        data(){
            return {
                ppShow:[],                  //显示的弹出层 默认后面的在上面
                alertOpen:false,            //alert是否弹出
                alertCon:"",                //alert内容
                alertBtn:[],                //alert按钮组
                alertCall:null,             //alert按钮点击回调
            }
        },
        methods:{
            show(pp,param){  //打开
                this.ppShow.push(pp);
                //打开时需要调用改组件
                //调用时因组件渲染时间差，设置0ms延迟
                if(param)  
                    setTimeout(()=>{this.child(pp[1],param);},0);                        
            },
            close(pp,opp,param){  //关闭
                //pp为需要关闭的弹出层，为false则关闭所有弹出层
                if(!pp){
                    this.ppShow = [];
                    return;
                }
                //查询当前需要关闭的弹出层
                let ppi = this.ppShow.findIndex(o=>o[1]==pp);
                this.ppShow.splice(ppi,1);
                //关闭时需要处理其他层组件data
                if(opp&&param)   
                    this.child(opp,param);
            },
            alert(con,fn,btns){
                //alert内容
                this.alertCon = con;
                //alert按钮 默认一个确定按钮
                this.alertBtn = btns || [["确定","blue"]];
                this.alertOpen = true;
                this.alertCall = fn;
            },
            confirm(con,fn,btns){
                //confirm内容
                this.alertCon = con;
                //confirm按钮  默认为确定、取消两个按钮
                this.alertBtn = btns || [["确定","blue mr"],["取消",""]];
                this.alertOpen = true;
                this.alertCall = fn;
            },
            alertBtnEvent(ot){
                //alert,confrim 点击事件回调，同时关闭alert、confirm
                if(this.alertCall)
                    this.alertCall(ot);
                this.alertOpen = false;
            },
            child(pp,param){  //调用子组件函数，data
                //param为{key:value} key为变量、函数，value为参数                    
                for(let key in param){    
                    //pp目标组件名
                    //key目标组件需要被操作的对象
                    let cv = this.$refs[pp][0][key];                        
                    if(typeof(cv)=="function")                          //函数-调用
                        cv(param[key]);  
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
                this.child(pp[1],param);
            },
            send(param){
                //弹出层向父级页面通过send事件传输数据
                this.$emit("send",param);
            }
        },
    })
}
</script>
</component>