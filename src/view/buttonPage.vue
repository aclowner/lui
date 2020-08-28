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
            <p><strong>基本button</strong></p>
            <p>
                <button class="btn">default</button>
                <button class="btn blue">blue</button>
                <button class="btn green">green</button>
                <button class="btn yellow">yellow</button>
                <button class="btn orange">orange</button>
                <button class="btn" disabled>this is disable</button>
            </p>
            <p>
                <span class="html-code">
                    {{h1.def}}<br/>{{h1.blue}}<br/>{{h1.green}}<br/>{{h1.dis}}
                </span>                
            </p>
        </li>
        <li>
            <p><strong>边框button</strong></p>
            <p >
                <button class="btn btn-border">default</button>
                <button class="btn btn-border blue">blue</button>
                <button class="btn btn-border green">green</button>  
                <button class="btn btn-border yellow">yellow</button>
                <button class="btn btn-border orange">orange</button>
                <button class="btn btn-border" disabled>this is disable</button>
            </p>
            <p >
                <span class="html-code">
                    {{h2.def}}<br/>{{h2.yellow}}<br/>{{h2.orange}}<br/>{{h2.dis}}
                </span>                
            </p>
        </li>
        <li>
            <p><strong>小button</strong></p>
            <p>
                <button class="btn btn-sm">default</button>
                <button class="btn blue btn-sm">blue</button>
                <button class="btn green btn-sm">green</button>  
                <button class="btn btn-border yellow btn-sm">yellow</button>
                <button class="btn btn-border orange btn-sm">orange</button>
                <button class="btn btn-border btn-sm" disabled>border is disable</button>
                <button class="btn btn-sm" disabled>default is disable</button>
            </p>
            <p>
                <span class="html-code">
                    {{h3.d1}}<br/>{{h3.d2}}<br/>{{h3.d3}}<br/>{{h3.d4}}<br/>{{h3.d5}}
                </span>                
            </p>
        </li>
        <li>
            <p><strong>大button</strong></p>
            <p>
                <button class="btn btn-border btn-lg">default</button>
                <button class="btn btn-border blue btn-lg">blue</button>
                <button class="btn btn-border green btn-lg">green</button>  
                <button class="btn yellow btn-lg">yellow</button>
                <button class="btn orange btn-lg">orange</button>
                <button class="btn btn-lg" disabled>default is disable</button>
                <button class="btn btn-border btn-lg" disabled>border is disable</button>
            </p>
            <p >
                <span class="html-code">
                    {{h4.d1}}<br/>{{h4.d2}}<br/>{{h4.d3}}<br/>{{h4.d4}}<br/>{{h4.d5}}
                </span>                
            </p>
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
                    d5:'<button class="btn btn-sm" disabled>default is disable</button>'
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