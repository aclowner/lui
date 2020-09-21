<component>
<style>
.lui-switch{
    min-width: .6rem;
    height: .32rem;
    border: var(--input-border);
    border-radius: .2rem / .17rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    transition: background .4s;
}
.lui-switch span{
    opacity: 0;
}
.lui-switch span.offt{
    padding: 0 .08rem 0 .16rem ;
}
.lui-switch span.ont{
    padding: 0 .16rem 0 .08rem;
}
.lui-switch span.show{
    opacity: 1;
}
.lui-switch:before{
    content: "";
    position: absolute;
    background: var(--input-border-color);
    width: .2rem;
    height: .2rem;
    border-radius: 100%;   
    right: .08rem; 
    transition: all .6s;
}
.lui-switch.on:before{
    right: unset;
    left: 0.08rem;
}
.lui-switch.on{
    background: var(--active-color);
    border: none;
    color: #fff;
}
.lui-switch.on:before{
    background: #fff;
}
</style>

<template>
<div :class="['lui-switch',{on:val}]" @click="change">    
    <span :class="['offt',{show:!val}]">{{off}}</span>
    <span :class="['ont',{show:val}]">{{on}}</span>
</div>
</template>

<script>
function luiSwitch(){
    Object.assign(this,{
        name:"lui-switch",
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            on:{default:"开"},
            off:{default:"关"},
            value:"",
        },
        data(){
            return {
                val: false
            }
        },
        methods:{
            change(){
                this.val = !this.val;
                this.$emit("input",this.val?1:0);
            }
        },
        watch:{
            value:{
                handler(nv){
                    let vb = nv == 1 ? true : false;
                    if(vb != this.val)
                        this.val = vb;
                },
                immediate: true
            }
        }
    });
}
</script>
</component>