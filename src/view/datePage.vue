<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >日期时间选择</a></h3>
    <ul>
        <li>
            <p>lui-date</p>
            <p>
                <lui-datetime v-model="obj.s1" ></lui-datetime>
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
function datePage(){
    Object.assign(this,{
        data(){
            return {
                obj:{s1:""}
            }
        }
    });
}
</script>
</component>