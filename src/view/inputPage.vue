<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >默认input输入</a></h3>
    <ul>
        <li>
            <p>input</p>
            <p>
                <input type="text">
            </p>
        </li>
        <li>
            <p>textarea</p>
            <p>
                <textarea ></textarea>        
            </p>
        </li>
    </ul>
    <h3><a >修饰输入</a></h3>
    <ul>
        <li>
            <p>搜索</p>
            <p>
                <lui-search></lui-search>
            </p>
        </li>
        <li>
            <p>前/后标签</p>
            <p>
                <lui-tag-input before="前面内容"><input type="text"></lui-tag-input>
            </p>
            <p>
                <lui-tag-input after="后面内容"><input type="text"></lui-tag-input>
            </p>
            <p>
                <lui-tag-input before="电子邮件" after="@qq.com"><input type="text"></lui-tag-input>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
function inputPage(){
    Object.assign(this,{
        
    });
}
</script>
</component>