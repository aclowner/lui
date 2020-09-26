<component>
<style>
</style>

<template>
<div class="radio-group">
    <a :class="['radio',{checked:checkVal==ck[0]}]" v-for="(ck,ci) in optionArr" :key="ci" @click="ckClick(ci,ck)">
        <span>{{ck[1]}}</span>    
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
                optionArr:[],
                checkVal:""
            }
        },
        methods:{
            ckClick(i,o){      
                this.checkVal = o[0];
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
            },
            list:{
                handler(nv,ov){
                    if(JSON.stringify(nv) == JSON.stringify(ov))   
                        return;         
                    this.optionArr = Lui.TransListData(nv,this.index);
                },
                immediate:true
            }
        }
    });
}
</script>
</component>