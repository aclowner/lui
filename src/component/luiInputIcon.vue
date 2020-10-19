<component>
<style>
.lui-input-icon{
    position: relative;
    width: 100%;
}
.iconfont{
    position: absolute;    
    font-size: .2rem;
    top: 50%;
    transform: translateY(-50%);
    right: .1rem;
}
.icon-pos-left .iconfont{
    left: .1rem;
    right: unset;
}
</style>

<template>
<div :class="['lui-input-icon','icon-pos-'+position]">   
    <slot></slot>
    <i v-if="icon" :class="['icon',icon]" ></i>
</div>
</template>

<script>
function luiInputIcon(){
    Object.assign(this,{
        props:{
            icon:{default:""},
            position:{default:"right"}
        }
    });
}
</script>
</component>