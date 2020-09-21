<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >config</a></h3>
    <ul>
        <li>        
            <p><strong>Lui.config</strong></p>
            <p>
                获取配置数据，只读
            </p>
        </li> 
    </ul>
    <h3><a >Hit</a></h3>
    <ul>
        <li>        
            <p><strong>Lui.Hit(t)</strong></p>
             <p>
                <button class="btn btn-border blue mr2" @click="hit(1)">默认提示1</button>
                <button class="btn btn-border orange mr2" @click="hit(2)">默认提示2</button>
                <button class="btn btn-border yeelow" @click="hit(3)">提示自定义内容</button>
            </p>
            <span class="remark">3s后关闭</span>
        </li> 
    </ul>
    <h3><a >Waiting</a></h3>
    <ul>
        <li>        
            <p><strong>Lui.Waiting(true/false/1/0)</strong></p>
            <p>
                <button class="btn btn-border" @click="waiting">等待动画</button>
            </p>
            <span class="remark">10s后关闭</span>
        </li> 
    </ul>
    <h3><a >Guid</a></h3>
    <ul>
        <li>        
            <p><strong>Lui.Guid()</strong></p>
            <p>
                生成一段新的32位guid
            </p>
            <p>
                <button class="btn btn-border" @click="guid">生成guid</button>
            </p>
        </li> 
    </ul>
</div>
</template>

<script>
function apiOther(){
    Object.assign(this,{
        methods:{
            hit(t){
                Lui.Hit(t==3?"提示自定义内容":t)
            },
            waiting(){
                Lui.Waiting(1);
                setTimeout(()=>{
                    Lui.Waiting(0)
                },10000)
            },
            guid(){
                Lui.Hit("生成新的guid是："+Lui.Guid());
            }
        }
    });
}
</script>
</component>