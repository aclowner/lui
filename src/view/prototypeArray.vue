<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >Array</a></h3>
    <ul>
        <li>
            <p>Array 属性</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey1" :list="data1">
                </lui-table>
            </div>
        </li>
        <li>
            <p>Array 方法</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey2" :list="data2">
                </lui-table>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
function prototypeArray(){
    Object.assign(this,{
        data(){
            return {
                tdKey1:["属性","描述"],
                tdKey2:["方法","描述"],
                data1:[],
                data2:[],
            }
        },
        created(){
            this.createProe();
            this.createFun();
        },
        methods:{
            createProe(){
                this.data1 = [
                    ["last","数组最后一项"],
                    ["lastIndex","数组最后一项索引"],
                ];
            },
            createFun(){
                this.data2 = [
                    ["sum(name='')","数组求和"],
                    ["groupBy(name)","通过name字段分组"],
                    ["toTree(id='id',pid='pid',child='child')","pid数组转树"],
                    ["childFlat(id='id',pid='pid')","树数组子级拉平"],
                    ["toggle(v)","添加/移除指定值v(值类型数组)"],
                    ["spliceArr(arr)","移除多项arr(值类型数组)"]
                ];
            }
        }        
    });
}
</script>
</component>