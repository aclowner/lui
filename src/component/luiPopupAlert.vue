
<component>
<style>
    .alert{
        width: 500px;
        z-index: 1100;
    }
    .alert-con, .alert-btn{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .alert-con{
        padding: 30px 40px;    
        line-height: 32px;    
        font-size: 16px;    
    }
    .alert-btn{
        padding-bottom: 20px;
    }
</style>
<template>
    <div class="alert">
        <div class="alert-title">提示</div>
        <div class="alert-con" v-html="con"></div>
        <div class="alert-btn">
            <button :class="['btn',btn[1]]" v-for="btn in btns" @click="alertBtn(btn[0])">{{btn[0]}}</button>
        </div>
    </div>
</template>
<script>
function luiPopupAlert(){
    Object.assign(this,{
        props:{
            btns:{default(){return [["确定","blue mr"],["取消",""]]}},      //alert confrom选择按钮 
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