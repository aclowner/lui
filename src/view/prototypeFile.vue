<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >Date</a></h3>
    <ul>
        <li>
            <p>Date 方法</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey" :list="data">
                </lui-table>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
function prototypeFile(){
    Object.assign(this,{
        data(){
            return {
                tdKey:["方法","描述"],
                data:[],
            }
        },
        created(){
            this.createFun();
        },
        methods:{
            createFun(){
                this.data = [
                    ["toJson()","json对象转为指定json对象"]
                ];
            }
        }    
    });
}
</script>
</component>