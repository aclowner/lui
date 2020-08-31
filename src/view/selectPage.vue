<component>
<style>

</style>

<template>
<div class="page content">
    <h3><a >下拉选择</a></h3>
    <ul>
        <li>
            <p>lui-select</p>
            <p>
                <lui-select :list="list1" v-model="obj.s1" placeholder="请选择"></lui-select>
            </p>
            <p>
                <lui-select :list="list2" v-model="obj.s2"></lui-select>
            </p>
            <p>
                <lui-select :list="list3" :index="1" v-model="obj.s3"></lui-select>
            </p>
            <p>
                <lui-select :list="list4" :index="-1" :search="true" v-model="obj.s4"></lui-select>
            </p>
            <p>
                <input type="text" :value="JSON.stringify(obj)" readonly>
            </p>
        </li>
        <li>
            <p>使用说明</p>
            <p>
                <pre>
                <code class="js">list    数组类型，下拉选项数组，数据类型为数组，数组项支持1:对象、2:数组、3:值类型
数量类型1：[{id:"",name:""}...] 或者 [{Id:"",Name:""},...] 只支持指定字段，没有指定字段则认为非法数据
数据类型2: [["nj","南京"],["val","name"],...]  建议使用该数据类型
数据类型3：["option1","option2",....]
v-model  双向绑定数据选中的数据值
index    int类型，取值范围为>=-1的整数，-1时为特殊用法，表示取值为选择项的名称，对数据类型2无效
为>=0的整数，仅对数据类型3有效，用于索引取值相加，一般用于将索引从0开始转为从1开始
placeholder  string类型，文本框提示内容，默认为空
search  布尔类型，值为 true/false。是否打开搜索筛选功能
</code>
</pre>                
            </p>
        </li>
    </ul>
</div>
</template>

<script>
function selectPage(){
    Object.assign(this,{
        data(){
            return {
                list1:[{id:1,name:"option1"},{id:2,name:"option2"},{id:3,name:"option3"},{id:4,name:"option4"},{id:5,name:"option5"}],
                list2:[["nj","南京"],["wx","无锡"],["sz","苏州"],["yz","扬州"]],
                list3:["佩奇","乔治","猪爸爸","猪妈妈"],
                list4:["北京","上海","广东","江苏","江西","湖北","湖南","广西","山东","山西","陕西","河南","河北"],
                obj:{s1:"",s2:"",s3:"",s4:""}
            }
        }
    });
}
</script>
</component>