<component>
<style>
</style>
<template>
        <div class="popup">
        <div class="pp-title">
            {{title}}
        </div>
        <div class="pp-body">
            <div class="_scroll"><div class="_con">
                <slot>
                </slot>
            </div></div>                    
        </div>
    </div>
</template>
<script>
function luiPopupBody(){
    this.name ="popup-body";
    this.props = ["title"];
    this.methods = {  //只做过渡，实际调用popup.vue中对应函数
        close(pp,opp,param){
            this.$parent.$parent.close(pp,opp,param);
        },
        show(pp,param){
            this.$parent.$parent.show(pp,param);
        },
        alert(con,fn,btns){
            this.$parent.$parent.alert(con,fn,btns);
        },
        confirm(pp,param){
            this.$parent.$parent.confirm(pp,param);
        },
        child(pp,param){
            this.$parent.$parent.child(pp,param);
        },    
        childPrev(param){
            this.$parent.$parent.childPrev(param);
        },            
        send(param){
            this.$parent.$parent.send(param);
        }
    };
}
</script>
</component>