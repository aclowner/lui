<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >lui-file-img</a></h3>
    <ul>
        <li>
            <p>单张图片(默认)</p>
            <p>
                <lui-file-img></lui-file-img>
            </p>
        </li>
        <li>
            <p>指定数量张图片</p>
            <p>
                <lui-file-img :length="3"></lui-file-img>
            </p>
        </li>
        <li>
            <p>不定量图片</p>
            <p>
                <lui-file-img :length="0"></lui-file-img>
            </p>
        </li>
    </ul>

    <h3><a >lui-file-select</a></h3>
    <ul>
        <li>
            <p>文件选择</p>
            <p>
                <lui-file-select></lui-file-select>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
function filePage(){
    Object.assign(this,{
        
    });
}
</script>
</component>