<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >checkbox</a></h3>
    <ul>
        <li>
            <p>单个勾选(html)</p>
            <p>
                <a class="checkbox"><span>是否选择</span></a>                
            </p>
            <span class="remark">需自行编写勾选事件，通过类名check控制是否选中，内容可放在checkbox外，可不填写内容</span>
        </li>
        <li>
            <p>单个勾选(组件)</p>
            <p>
                <lui-checkbox v-model="ck1">是否选择</lui-checkbox>({{ck1}})
            </p>
            <span class="remark">选中值双向绑定，值为0/1</span>
        </li>
        <li>
            <p>lui-checkbox-group</p>
            <p>数据类型1 ([o1,o2,o3...] index==-1)</p>
            <p>
                <lui-checkbox-group :list="['option1','option2','option3']" :index="-1" v-model="da.check1"></lui-checkbox-group>
            </p>
            <p>数据类型2 ([[id,name],[id,name]...])</p>
            <p>
                <lui-checkbox-group :list="[[1,'option1'],[2,'option2'],[3,'option3']]" v-model="da.check2"></lui-checkbox-group>
            </p>
             <p>数据类型2 ([{id,name},{id,name}...])</p>
            <p>
                <lui-checkbox-group :list="[{id:1,name:'选项1'},{id:2,name:'选项2'},{id:3,name:'选项3'}]" v-model="da.check3"></lui-checkbox-group>
            </p>
            <p>
                <input type="text" :value="JSON.stringify(da)">
            </p>
            <p>lui-checkbox-group 参数说明</p>
            <p>
                <pre>
                <code class="js">list     传入radio选项数组，支持 [[value,name]...]、 [name1,name2...]、[{id:1,name:'内容'...}]
v-model  双向绑定数据选中的数据值，第一种数据绑定值为value，第二种数据绑定值为索引
index    值为-1时绑定值名称,取索引时与index相加
</code>
</pre>                
            </p>
        </li>
    </ul>

    <h3><a >radio</a></h3>
    <ul>
        <li>
            <p>radio-group</p>
            <p>
                <lui-radio-group :list="['option1','option2','option3']" :index="1" v-model="radioVal1"></lui-radio-group>
            </p>
            <p>
                <input type="text" :value="radioVal1">
            </p>
            <p>
                <lui-radio-group :list="[['option1','option1'],['option2','option2'],['option3','option3']]"  v-model="radioVal2"></lui-radio-group>
            </p>
            <p>
                <input type="text" :value="radioVal2">
            </p>
            <p>
                <pre>
                <code class="js">list     传入radio选项数组，支持 [[value,name]...]、 [name1,name2...]、[{id:1,name:'内容'...}]
v-model  双向绑定数据选中的数据值，第一种数据绑定值为value，第二种数据绑定值为索引
index    值为-1时绑定值名称,取索引时与index相加
</code>
</pre>                
            </p>
        </li>
    </ul>

    <h3><a >switch</a></h3>
    <ul>
        <li>
            <p>lui-switch</p>
            <p>
                <lui-switch v-model="sw"></lui-switch>
            </p>
            <p>
                <input type="text" :value="sw">
            </p>
             <p>
                <pre>
                <code class="js">on     开-内容,
off    关-内容
v-model  开：1，关：0
</code>
</pre>                
            </p>
        </li>      
    </ul>
</div>
</template>

<script>
function checkPage(){
    Object.assign(this,{
        data(){
            return {
                ck1:1,
                da:{},
                da2:"",
                radioVal1:"",
                radioVal2:"option2",
                sw:1
            }            
        },
        computed:{
        },
        watch:{

        }
    });
}
</script>
</component>