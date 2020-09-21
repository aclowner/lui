<component>
<style>
</style>

<template>
<div class="checkbox-group">    
    <a :class="['checkbox',{checked:Array.isArray(ck)?checkArr.includes(ck[0]+''):checkArr.includes(ci+index+'')}]" v-for="(ck,ci) in list" :key="ci" @click="ckClick(ci,ck)">
        <span>{{Array.isArray(ck)?ck[1]:ck}}</span>    
    </a> 
</div>
</template>

<script>
function luiCheckboxGroup(){
    Object.assign(this,{
        name:"lui-checkbox-group",
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
            return{
                checkArr:[],
            }
        },
        methods:{
            ckClick(i,o){      
                Array.isArray(o) ?  this.checkArr.toggle(o[0]+"") : this.checkArr.toggle(i+this.index+"");
                this.$emit("input",this.checkArr.join(","))
            }
        },
        watch:{
            model:{
                handler:function(nv,ov){
                    let newArr = nv ? nv.split(",") : [];
                    if(this.checkArr != newArr)
                        this.checkArr = newArr;
                },
                immediate: true
            }
        }
    });
}
</script>
</component>