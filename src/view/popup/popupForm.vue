<component>
<style>
</style>

<template>
<lui-popup-body :title="'添加'+num" drag="true">
    <div class="form-panel">
        <form-row name="名称1"><input type="text"></form-row> 
        <form-row name="名称2"><input type="text"></form-row> 
        <form-row name="名称3"><input type="text"></form-row> 
        <form-row name="打开">
            <button class="btn btn-border greeen mr1" @click="open">打开D2</button>
            <button class="btn btn-border greeen" @click="closeOpen">关闭D2</button>
        </form-row>
    </div>      
    <form-row button slot="popup-bottom">
        <button class="btn btn-border  blue">保存</button>
        <button class="btn btn-border " @click="close">取消</button>
        <button class="btn btn-border " @click="closeAll">全部关闭</button>
    </form-row> 
</lui-popup-body>
</template>

<script>
function popupForm(){
    Object.assign(this,{
        data(){
            return {
                num:0
            }            
        },
        methods:{
            fnForm1(p1,p2,p3){
                console.log("this is form fnForm1: p1,p1,p2：",p1,p2,p3 )
            },
            close(){
                this.$emit("close");
            },
            closeAll(){
                this.$emit("close-all");
            },
            open(){
                this.$emit("open","popupD2");
            },
            closeOpen(){
                this.$emit("sibling",{"popupD2":"close"});
            }
        }
    });
}
</script>
</component>