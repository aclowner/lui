<component>
<style>
</style>

<template>
<div class="lui-list-select">
    <lui-table class="td-flex-auto" :thead="tdKey" height="20vh">
        <div class="tr" v-for="(tr,tri) in list" :key="tri">
            <span class="td" v-for="(v,k,i) in tdKey" :key="i">
                <template v-if="i==0"><a class="radio" ></a></template>    
                {{tr[k]}}                             
            </span>
        </div>
    </lui-table>
</div>
</template>

<script>
function luiListSelect(){
    Object.assign(this,{
        props:{
            list:Array,
            thead:{default:null},
            keyId:{default:"id"},
        }
    });
}
</script>
</component>