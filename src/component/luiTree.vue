<component>
<style>
.lui-tree{
    height: auto;
    width: 100%;
}
</style>

<template>
<div class="lui-tree">
    <scroll>
        <lui-tree-item v-for="item in list" :key="item.id" :data="item" :check="check" :check-arr="valArr"></lui-tree-item>    
    </scroll>  
</div>
</template>

<script>
NS.Component("luiTreeItem");
function luiTree(){
    Object.assign(this,{        
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            list:Array,
            check:{default:false},
            value:{default:""},
        },
        data(){
            return {
                valArr:[],
            }
        },
        watch:{
            value:{
                handler(nv){
                    if(nv != this.valArr.join(","))
                        this.valArr = nv.join(",");
                },
                immediate:true
            },
            valArr(nv){
                this.$emit("input",nv.join(","))
            }
        }
    });
}
</script>
</component>