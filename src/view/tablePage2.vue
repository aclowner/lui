<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >lui-table</a></h3>
    <ul>
        <li>
            <p>自动加载</p>
            <div class="p" >
                <div class="table-area" style="width:100%;height: 30vh;">
                    <lui-table :thead="tdKey" :list="list">
                    </lui-table>
                </div>                 
            </div>
        </li>
        <li>
            <p>自定义加载</p>
            <div class="p" >
                <div class="table-area" style="width:100%;height: 30vh;">
                    <lui-table class="border" :thead="tdKey" height="20vh">
                        <div class="tr" v-for="(tr,tri) in list" :key="tri">
                            <span class="td" v-for="(v,k,i) in tdKey" :key="i">
                                <span v-if="k=='sex'">{{tr.sex==1?"男":"女"}}</span>
                                <span v-else :style="{color:k=='age'?'var(--active-color)':''}">{{tr[k]}}</span>                             
                            </span>
                        </div>
                    </lui-table>
                </div>                 
            </div>
        </li>
        <li>
            <p>列表单选</p>
            <div class="p" >
                <div class="table-area" style="width:100%;height: 30vh;">
                    <lui-table :thead="tdKey" :list="list" select="1" v-model="selVal1"></lui-table>
                </div>                 
            </div>
        </li>
        <li>
            <p>列表多选</p>
            <div class="p" >
                <div class="table-area" style="width:100%;height: 30vh;">
                    <lui-table :thead="tdKey" :list="list" select="2" v-model="selVal2"></lui-table>
                </div>                 
            </div>
        </li>
        <li>
            <p>列表选择数据</p>
            <p>
                <lui-input-tag before="单选值"><input type="text" :value="selVal1"></lui-input-tag>
            </p>
            <p>
                <lui-input-tag before="多选值"><input type="text" :value="selVal2.join(',')"></lui-input-tag>
            </p>
            
        </li>
        <li>
            <p>使用说明</p>
            <p>
                <pre> 
                <code class="js">组件名称  lui-table
可选参数  thead   null/Object/Array  表头字段,null不显示表头,支持数据{key1:name1,key2:name2} 、[[name1,key1],[name2,key2]]、[name1,name2]
         list  Array  没有该参数，或js判断flase则自定义tbody，该参数为数组自动加载列表，此事thead只支持两种数据
         height  String  默认100%,整个tbale占满父级高度，指定值需有单位（100px/100vh），表示tbody最大高度
         trKey  自动加载列表时tr的key字段，默认id,
         select  是否打开raido/check选择  0:无选择 1:raido单选 2:checkbox多选
         v-mdoel  select为1、2时，选中值
                </code>
                </pre>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
let list = [
    {id:1,name:"user-01",sex:1,age:22,city:"南京"},
    {id:2,name:"user-02",sex:1,age:21,city:"上海"},
    {id:3,name:"user-03",sex:0,age:23,city:"上海"},
    {id:4,name:"user-04",sex:1,age:22,city:"苏州"},
    {id:5,name:"user-05",sex:0,age:22,city:"南京"},
    {id:6,name:"user-06",sex:0,age:20,city:"南京"},
    {id:7,name:"user-07",sex:0,age:25,city:"南京"},
    {id:8,name:"user-08",sex:1,age:26,city:"杭州"},
    {id:9,name:"user-09",sex:1,age:20,city:"杭州"},
    {id:10,name:"user-10",sex:1,age:23,city:"南京"},
    {id:11,name:"user-11",sex:1,age:23,city:"南京"},
    {id:12,name:"user-12",sex:1,age:21,city:"无锡"}
];
function tablePage2(){
    Object.assign(this,{
        data(){
            return {
                list:list,
                tdKey:{id:"编号",name:"姓名",sex:"性别",age:"年龄",city:"城市"},
                selVal1:3,
                selVal2:[],
            }
        },
        created(){
            // setTimeout(()=>{
            //     this.list.reverse();
            // },10000)
            
        }
    });
}
</script>
</component>