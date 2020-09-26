<component>
<style>
p>button{
    margin-right: 10px;
}
</style>

<template>
<div class="page content">

    <h3><a >按钮(button)</a></h3>

    <ul>
        <li>
            <p><strong>默认背景button</strong></p>
            <p>
                <button class="btn btn-lg">默认大</button>
                <button class="btn blue btn-lg">蓝色大</button>
                <button class="btn green btn-lg">绿色大</button>  
                <button class="btn yellow btn-lg">黄色大</button>
                <button class="btn orange btn-lg">橙色大</button>
                <button class="btn btn-lg" disabled>不可用</button>
               
            </p>
            <p>
                <button class="btn">default</button>
                <button class="btn blue">blue</button>
                <button class="btn green">green</button>
                <button class="btn yellow">yellow</button>
                <button class="btn orange">orange</button>
                <button class="btn" disabled>default is disable</button>
            </p>
            
            <p>
                <button class="btn btn-sm">default sm</button>
                <button class="btn blue btn-sm">blue sm</button>
                <button class="btn green btn-sm">green sm</button>  
                <button class="btn yellow btn-sm">yellow sm</button>
                <button class="btn orange btn-sm">orange sm</button>
                <button class="btn btn-sm" disabled>default sm is disable</button>
            </p>
            <p>
                <button class="btn btn-mini">default mini</button>
                <button class="btn blue btn-mini">blue mini</button>
                <button class="btn green btn-mini">green mini</button>  
                <button class="btn yellow btn-mini">yellow mini</button>
                <button class="btn orange btn-mini">orange mini</button>
                <button class="btn btn-mini" disabled>default mini is disable</button>
            </p>
            <!-- <p>
                <span class="html-code">
                    {{h1.def}}<br/>{{h1.blue}}<br/>{{h1.green}}<br/>{{h1.dis}}
                </span>                
            </p> -->
        </li>
        <li>
            <p><strong>边框button</strong></p>
            <p>
                <button class="btn btn-border btn-lg">border lg</button>
                <button class="btn btn-border blue btn-lg">border lg</button>
                <button class="btn btn-border green btn-lg">border lg</button>  
                <button class="btn btn-border yellow btn-lg">border lg</button>
                <button class="btn btn-border orange btn-lg">border lg</button>
                <button class="btn btn-border btn-lg" disabled>border is disable</button>
            </p>
            <p >
                <button class="btn btn-border">default border</button>
                <button class="btn btn-border blue">blue border</button>
                <button class="btn btn-border green">green border</button>  
                <button class="btn btn-border yellow">yellow border</button>
                <button class="btn btn-border orange">orange border</button>
                <button class="btn btn-border" disabled>border is disable</button>
            </p>            
            <p>
                <button class="btn btn-border btn-sm">default border sm</button>
                <button class="btn btn-border blue btn-sm">border sm</button>
                <button class="btn btn-border green btn-sm">border sm</button>  
                <button class="btn btn-border yellow btn-sm">border sm</button>
                <button class="btn btn-border orange btn-sm">border sm</button>
                <button class="btn btn-border btn-sm" disabled>border sm is disable</button>
            </p>
            <p>
                <button class="btn btn-border btn-mini">border mini</button>
                <button class="btn btn-border blue btn-mini">border mini</button>
                <button class="btn btn-border green btn-mini">border mini</button>  
                <button class="btn btn-border yellow btn-mini">border mini</button>
                <button class="btn btn-border orange btn-mini">border mini</button>
                <button class="btn btn-border btn-mini" disabled>border mini is disable</button>
            </p>
        </li>
        <li>
            <p><strong>使用说明</strong></p>
            <pre>
                <code class="js">标签：button
依赖class：btn
可选calss：btn-bordeer  默认背景button，添加btn-border则生成无背景边框button
          btn-lg/btn-sm/btn-mini  表示大小(大/小/最小)，无则默认大小
          blue/green/yellow/orange  表示颜色，边框时表示边框颜色和字体颜色
                </code>
            </pre>
        </li>
    </ul>

</div>
</template>

<script>
function buttonPage(){
    Object.assign(this,{
        data(){
            return{
                h1:{
                    def:'<button class="btn">default</button>',
                    blue:'<button class="btn blue">default</button>',
                    green:'<button class="btn green">green</button>',
                    dis:'<button class="btn" disabled>this is disable</button>',
                },
                h2:{
                    def:'<button class="btn btn-border">default</button>',
                    yellow:' <button class="btn btn-border yellow">yellow</button>',
                    orange:'<button class="btn btn-border orange">orange</button>',
                    dis:'<button class="btn btn-border" disabled>this is disable</button>',
                },
                h3:{
                    d1:'<button class="btn btn-sm">default</button>',
                    d2:'<button class="btn blue btn-sm">blue</button>',
                    d3:'<button class="btn btn-border yellow btn-sm">yellow</button>',
                    d4:'<button class="btn btn-border btn-sm" disabled>border is disable</button>',
                    d5:'<button class="btn btn-sm" disabled>default is disable</button>',
                    d6:'<button class="btn btn-mini">default</button>',
                    d7:'<button class="btn btn-mini" disabled>default is disable</button>'
                },
                h4:{
                    d1:'<button class="btn btn-border btn-lg">default</button>',
                    d2:'<button class="btn btn-border blue btn-lg">blue</button>',
                    d3:'<button class="btn yellow btn-lg">yellow</button>',
                    d4:'<button class="btn btn-lg" disabled>default is disable</button>',
                    d5:'<button class="btn btn-border btn-lg" disabled>border is disable</button>'
                }
            }
        }
    });
}
</script>
</component>