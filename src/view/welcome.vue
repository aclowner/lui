<component>
<style>
.page{
    height: 100%;
}
.s1{
    font-size: .32rem;
    line-height: 3;
    color: var(--active-color);
}
.s2{
    font-size: .20rem;
    line-height: 4;
}
.btn-start{
    background: var(--active-color);
    padding: 0 .5rem;
    line-height: 3;
    margin-top: .4rem;
    color: #fff;
    font-weight: 700;
    letter-spacing: .1rem;
    border-radius: 3px;
}
.btn-start:hover{
    transform: translateY(2px);
}
</style>

<template>
<div class="page flex column center">
    <img src="src/asset/img/logo.png" alt="">
    <span class="s1">Vue+NameSpace+Lui</span>
    <span class="s2">B端Vue UI组件库，B端运行编译Vue组件、动态导入JS，常用JavaScript原型扩展</span>

    <router-link class="btn-start" to="/button">开始</router-link>
</div>
</template>

<script>
function welcome(){
    let LuiSecret = NS.Import("../../dep/lui/js/LuiSecret");
    Object.assign(this,{
        created(){
            setTimeout(() => {
                let ks = document.querySelector(".btn-start");
                let t = Tween.Add({x:20}, {repeat:-1,yoyo:true});
                t.SetTimeKey({x:100}, 1, Tween.Easing.ElaOut);
                t.onPlaying.add(t=>{
                    ks.style.marginLeft = t.value.x + "px";
                });
            }, 2);
        }
    });
}
</script>
</component>