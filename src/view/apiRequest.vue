<component>
<style>
</style>

<template>
<div class="page content">Lui
    <h3><a >Lui.Get()</a></h3>
    <ul>
        <li>        
            <p><strong>示例</strong></p>
            <pre>
                <code class="js">Lui.Get({
    path:"url2"        //默认为配置文件path默认路径，可配置其他路径，通过字段名匹配(path.url2)
    api:"bsGetxxx",        //接口名称
    data:{id:xxx},        //传入参数为json对象
    resultFormat:true        //返回结果格式化，格式化方式为特定处理，默认格式化
    errCall:false        //默认false，发送错误不回调，统一处理，为true则回调自定义处理    
}).then(res=>{
    //res 数据处理成功返回结果 
})
.catch(res=>{
    //res 请求失败或数据处理错误
});</code>
</pre>
        </li>
        <li>
            <p><strong>返回</strong></p>
            <p>返回promise对象</p>
        </li>
    </ul>

    <h3><a >Lui.Post()</a></h3>
    <ul>
        <li>        
            <p><strong>示例</strong></p>
            <pre>
                <code class="js">Lui.Post({
    path:"url2"        //默认为配置文件path默认路径，可配置其他路径，通过字段名匹配(path.url2)
    api:"bsGetxxx",        //接口名称
    data:{id:xxx},        //传入参数为json对象
    resultFormat:true        //返回结果格式化，格式化方式为特定处理，默认格式化
    errCall:false        //默认false，发送错误不回调，统一处理，为true则回调自定义处理    
}).then(res=>{
    //res 数据处理成功返回结果 
})
.catch(res=>{
    //res 请求失败或数据处理错误
});</code>
</pre>
        </li>
        <li>
            <p><strong>返回</strong></p>
            <p>返回promise对象</p>
        </li>
    </ul>
    
</div>
</template>

<script>
function apiRequest(){
    Object.assign(this,{
    });
}
</script>
</component>