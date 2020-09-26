<component>
<style>
</style>

<template>
<div class="checkbox-group">    
    <a :class="['checkbox',{checked:checkArr.includes(ck[0])}]" v-for="(ck,ci) in optionArr" :key="ci" @click="ckClick(ci,ck)">
        <span>{{ck[1]}}</span>    
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
                optionArr:[],
                checkArr:[],
            }
        },
        methods:{
            ckClick(i,o){      
                this.checkArr.toggle(o[0]);
                this.$emit("input",this.checkArr.join(","))
            }
        },
        watch:{
            model:{
                handler:function(nv,ov){
                    let checkStr = this.checkArr.join(",");
                    if(nv != checkStr){
                        let newArr = nv ? nv.split(",") : [];
                        this.checkArr = newArr;
                    }                        
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