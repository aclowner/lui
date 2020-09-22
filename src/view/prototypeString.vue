<component>
<style>
</style>

<template>

<div class="page content">
    <h3><a >Number</a></h3>
    <ul>
        <li>
            <p>String 属性</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey1" :list="data1">
                </lui-table>
            </div>
        </li>
        <li>
            <p>String 属性</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey2" :list="data2">
                </lui-table>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
function prototypeString(){
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
                this.data1 = [["extName","获取文件后缀名"]];
            },
            createFun(){
                this.data2 = [
                    ["toLink","驼峰命名转短横线"],
                    ["toJson","json字符串转json对象"],
                    ["toFileArr","文件字符串转文件数组对象"]
                ];
            }
        }        
    });
}
</script>
</component>