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
                <lui-input-tag before="绑定值"><input type="text" :value="val"></lui-input-tag>
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
             Lui.Get({
                path:"src/asset/json/tree.json",
                resultFormat:false
            }).then(re=>{
                this.tree = re.toTree();
            });
        }
    });
}
</script>
</component>