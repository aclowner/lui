<component>
<style>
</style>

<template>
<div class="lui-tag-input">
    <span class="tag before" v-if="before">{{before}}</span>
    <input type="text">
    <span class="tag after" v-if="after">{{after}}</span>
</div>
</template>

<script>
function luiTagInput(){
    Object.assign(this,{
        props:{
            before:{default:""},
            after:{default:""}
        }
    });
}
</script>
</component>