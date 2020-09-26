<component>
<style>
</style>

<template>
<div class="lui-input-tag">
    <span class="tag before" v-if="before">{{before}}</span>
    <slot></slot>
    <span class="tag after" v-if="after">{{after}}</span>
</div>
</template>

<script>
function luiInputTag(){
    Object.assign(this,{
        props:{
            before:{default:""},
            after:{default:""}
        }
    });
}
</script>
</component>