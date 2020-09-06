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
        </li>
        <li>
            <p>lui-date(yyyy-MM)</p>
            <p>
                <lui-datetime v-model="obj.s2" format="yyyy-MM"></lui-datetime>
            </p>
        </li>
        <li>
            <p>lui-date(yyyy)</p>
            <p>
                <lui-datetime v-model="obj.s3" format="yyyy"></lui-datetime>
            </p>
        </li>
        <li>
            <p>lui-date(hh:mm)</p>
            <p>
                <lui-datetime v-model="obj.s4" format="hh:mm"></lui-datetime>
            </p>
        </li>
        <li>
            <p>lui-date(yyyy-MM-dd hh:mm)</p>
            <p>
                <lui-datetime v-model="obj.s5" format="yyyy-MM-dd hh:mm"></lui-datetime>
            </p>
        </li>
        <li>
            <p>lui-date(min/max)</p>
            <p>
                <lui-datetime v-model="obj.s6" min="2020-09-02" :max="-1"></lui-datetime>
            </p>
        </li>
        <li>
            <p>绑定数据</p>
            <p>
                <input type="text" :value="JSON.stringify(obj)" readonly>
            </p>
        </li>
        <li>
            <p>使用说明</p>
            <p>
                <pre>
                <code class="js">组件名称    lui-datetime
可选参数    format  srring  日期时间选择类型  yyyy-MM-dd(默认)/yyyy-MM/yyyy/hh:mm/yyyy-MM-dd hh:mm
           min  string/int  最小值  精确到天，包含该天  string为具体日期， int表示相对于今天加天数
           max  string/int  最大值  精确到天，包含该天  string为具体日期， int表示相对于今天加天数
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
        },
        created(){
            let d = new Date();
            console.log(new Date("2020-12-22").format("yyyy-M-d"));
        }
    });
}
</script>
</component>