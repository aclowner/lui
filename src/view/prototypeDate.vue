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
function prototypeDate(){
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
                    ["format(fmt)","时间格式化(yyyy-MM-dd hh:mm:ss)"],
                    ["addDays(days,fmt)","时间添加多少天,返回参数可fmt格式化"]
                ];
            }
        }    
    });
}
</script>
</component>