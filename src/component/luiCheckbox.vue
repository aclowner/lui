<component>
<style>

</style>

<template>

<a :class="['checkbox',{checked:check==1}]" @click="ckClick">
    <span><slot></slot></span>    
</a>  

</template>

<script>
function luiCheckbox(){
    Object.assign(this,{    
        name:"lui-checkbox",   
        model:{
            prop:"model",
            event:"input"
        },
        props:{
            "model":"",
            "value":{default:""},
        },
        data(){
            return {
                check:parseInt(this.model)||0
            }
        },
        methods:{
            ckClick(){
                this.check = !this.check;
                this.$emit("input",this.check?1:0);
                this.$emit("change",this.check,this.value);
            }
        },
        watch:{
            model(nv){
                let ckInt = parseInt(nv) || 0;
                ckInt != this.check && this.check==ckInt;
            }
        }
    });
}
</script>
</component>