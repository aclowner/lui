<component>
<style>

</style>

<template>
<div class="page content">
    <h3><a >tree-select</a></h3>
    <ul>
        <li>
            <p>树列表</p>
            <div class="p" style="max-height:50vh;">
                <lui-tree :list="tree"></lui-tree>
            </div>
        </li>
        <li>
            <p>树列表勾选</p>
            <div class="p" style="max-height:50vh;">
                <lui-tree :list="tree" :check="true" v-model="val"></lui-tree>
            </div>
            <p>
                <lui-tag-input before="绑定值"><input type="text" :value="val"></lui-tag-input>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
function treeSelect(){
    Object.assign(this,{
        data(){
            return {
                tree:[],
                val:""
            }
        },
        created(){
            let json = NS.Load("src/asset/json/tree.json");
            this.tree = json.toTree();
        }
    });
}
</script>
</component>