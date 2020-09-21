<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >lui-table-paging</a></h3>
    <ul>
        <li>
            <p>分页表格</p>
            <div class="p" >
                <div class="table-area" style="width:100%;height: 40vh;">
                    <lui-table-paging class="" :thead="tdKey" :length="list.length" v-model="listSE">
                        <div class="tr" v-for="(tr,ti) in listShow" :key="ti">
                            <span class="td">{{listSE[0]+ti+1}}</span>
                            <span class="td">{{tr.name}}</span>
                            <span class="td">{{tr.sex==1?"男":"女"}}</span>
                            <span class="td">{{tr.age}}</span>
                            <span class="td">{{tr.city}}</span>
                        </div>
                    </lui-table-paging>
                </div>                 
            </div>
        </li>
        <li>
            <p>使用说明</p>
            <p>
                <pre> 
                <code class="js">组件名称  lui-table-paging
必须参数  length  int  用于分页数据总长度， 
         v-model Array  长度为3，0:开始索引,1:结束索引,2:当前页码
         thead   null/Object/Array  表头字段,null不显示表头,支持数据{key1:name1,key2:name2} 、[name1,name2]、[[name1,key1],[name2,key2]]
可选参数  pageSize  int 每页显示数量
         pageSizeArr Array  每页显示数量可选择数组
                </code>
                </pre>
            </p>
        </li>
    </ul>

   
</div>


</template>

<script>
function tablePage(){
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
    Object.assign(this,{
        data(){
            return {
                tdKey:{number:"编号",name:"姓名",sex:"性别",age:"年龄",city:"城市"},
                list:[],
                listSE:[0,0],
            }
        },
        computed:{
            listShow(){
                return this.list.slice(...this.listSE);
            }
        },
        created(){
            this.list = list;
        }
    });
}
</script>
</component>