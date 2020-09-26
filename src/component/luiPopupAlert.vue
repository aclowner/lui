
<component>
<style>
.lui-alert{
    min-width: 25vw;
    max-width: 35vw;
    top: calc(50% - 10vh);
}
.alert-title{
    font-size: .16rem;
    line-height: 3;
    border-bottom: solid 1px #eff0f2;
}
.alert-title, .alert-con, .alert-btn{
    display: flex;
    align-items: center;
    justify-content: center;
}
.alert-con{
    padding: 2em;    
    line-height: 2;    
}
.alert-btn{
    padding-bottom: 1.2em;
}
</style>
<template>
    <div class="lui-alert">
        <div class="alert-title">提示</div>
        <div class="alert-con" v-html="con"></div>
        <div class="alert-btn">
            <button :class="['btn',btn[1]]" v-for="(btn,bi) in btns" :key="bi" @click="alertBtn(btn[0])">{{btn[0]}}</button>
        </div>
    </div>
</template>
<script>
function luiPopupAlert(){
    Object.assign(this,{
        props:{
            btns:{default(){return [["确定","blue mr2"],["取消",""]]}},      //alert confrom选择按钮 
            con:{default:"提示信息！"}                                      //提示内容信息
        },
        methods:{
            alertBtn(ot){
                //alert confrim按钮点击事件，由popup发送到父级页面
                this.$parent.$parent.alertBtnEvent(ot);
            }
        }
    });
}
</script>
</component>