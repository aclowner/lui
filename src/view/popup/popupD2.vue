<component>
<style>
</style>

<template>
<lui-popup-body title="不能动" :drag="false">
    <div class="form-panel">
        <form-row name="名称d1"><input type="text"></form-row> 
        <form-row name="名称d2"><input type="text"></form-row> 
        <form-row name="打开">
            <button class="btn btn-border greeen" @click="subling">调用1</button>
        </form-row>
        <form-row name="提示">
            <button class="btn btn-border greeen" @click="alert">提示</button>
        </form-row>
        <form-row name="确认">
            <button class="btn btn-border greeen" @click="confirm">确认</button>
        </form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>
        <form-row name="测试滚动"><input type="text"></form-row>       
    </div>      
     <form-row button slot="popup-bottom">
        <button class="btn btn-border blue" @click="close(1)">仅关闭</button>
        <button class="btn btn-border blue" @click="close(2)">关闭调用</button>
        <button class="btn btn-border blue" @click="close(3)">全部关闭</button>
    </form-row> 
</lui-popup-body>
</template>

<script>
function popupD2(){
    Object.assign(this,{
        methods:{
            subling(){
                this.$emit("sibling",{
                    "popupForm":{fnForm1:["a","c","e"]}
                })
            },
            close(t){
                if(t==1)
                    this.$emit("close");
                else if(t==2)
                    this.$emit("close",{"popupForm":{fnForm1:["搜","狗","输入法"]}});
                else
                    this.$emit("close-all")
            },
            alert(){
                this.$emit("alert");
            },
            confirm(){
                this.$emit("confirm");
            }
        }
    });
}
</script>
</component>