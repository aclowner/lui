<component>
<style>
.popup-any{
    width: 40vw;
    height: 40vh;
    background: #f0f0f0;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1100;
}
</style>

<template>
<div class="popup-any" v-drag="drag">

    <h1>这是一个正方形 40vw*40vh</h1>
    
    <div style="height:.3rem"></div>

    <form-row name="是否可拖动"><lui-switch v-model="drag"></lui-switch></form-row>
    
    <form-row name="打开确认">
        <button class="btn btn-border" @click="confirm">打开确认框</button>
    </form-row>    

    <form-row name="关闭">
        <button class="btn btn-border" @click="close">关闭</button>
    </form-row>

</div>
</template>

<script>
function popupAny(){
    Object.assign(this,{
        data(){
            return {
                drag:0
            }            
        },
        methods:{
            confirm(){
                this.$emit("confirm","你刚刚打开了一个自定义弹出层，现在是"+(this.drag==0?"不":"")+"可拖动的",(re,popup)=>{
                    popup.close = false;
                    this.$emit("alert","你刚刚点击了"+re+"按钮");
                },[["绿色","green mr2"],["橙色","btn-bordeer orange"]])
            },
            close(){
                this.$emit("close")
            }
        }
    });
}
</script>
</component>