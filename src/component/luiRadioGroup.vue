<component>
<style>
</style>

<template>
<div class="radio-group">
    <a :class="['radio',{checked:Array.isArray(ck)?(checkVal==ck[0]+''):(checkVal==ci+index+'')}]" v-for="(ck,ci) in list" :key="ci" @click="ckClick(ci,ck)">
        <span>{{Array.isArray(ck)?ck[1]:ck}}</span>    
    </a>
</div>
</template>

<script>
function luiRadioGroup(){
    Object.assign(this,{
        name:"lui-radio-group",
        model:{
            prop:"model",
            event:"input"
        },
        props:{
            model:"",
            list:Array,
            index:{default:0}
        },
        data(){
            return {
                checkVal:""
            }
        },
        methods:{
            ckClick(i,o){      
                Array.isArray(o) ?  (this.checkVal = o[0]+"") : (this.checkVal = i+this.index+"");
                this.$emit("input",this.checkVal);
            }
        },
        watch:{
            model:{
                handler:function(nv,ov){
                    let newVal = nv ? nv+"" : "";
                    if(newVal != this.checkVal)
                        this.checkVal = newVal;
                },
                immediate: true
            }
        }
    });
}
</script>
</component>