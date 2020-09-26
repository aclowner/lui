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
                <lui-input-icon icon="icon-search"><input type="text" v-model="search"></lui-input-icon>
            </p>
            <p>
                <lui-input-icon icon="icon-search" position="left"><input type="text"></lui-input-icon>
            </p>
        </li>
        <li>
            <p>前/后标签</p>
            <p>
                <lui-input-tag before="前面内容"><input type="text"></lui-input-tag>
            </p>
            <p>
                <lui-input-tag after="后面内容"><input type="text"></lui-input-tag>
            </p>
            <p>
                <lui-input-tag before="电子邮件" after="@qq.com"><input type="text"></lui-input-tag>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
function inputPage(){
    Object.assign(this,{
        data(){
            return {
                search:""
            }
        },
        watch:{
        }
    });
}
</script>
</component>