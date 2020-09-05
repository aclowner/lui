<component>
<style>
.lui-table{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: .16rem;
}
.h100{
    height: 100%;
}
.thead{    
    background: rgba(0, 0, 0, .1);
}
.h100 .tbody{
    flex: 1;
    overflow: hidden;
}

</style>

<template>
<div :class="['lui-table',{h100:height=='100%'}]">
    <div class="thead" v-if="headTh">
        <div class="tr">
            <span v-for="(th,thi) in headTh" :key="thi" :class="['th','td-'+thi,th[1]?'td-'+th[1]:'']">{{th[0]}}</span>
        </div>
    </div>
    <div class="tbody _scroll">
        <div class="tr tr-empty" v-if="list&&list.length==0"><span>暂无数据</span></div>
        <transition-group v-else name="table-tr" tag="div" mode='in-out' class="_con" :style="{'maxHeight':height}">
            <template v-if="list">
                <div class="tr" v-for="(tr,ti) in list" :key="ti">
                    <span class="td" v-for="(td,tdi) in headTh" :key="tdi" :class="['th','td-'+tdi,td[1]?'td-'+td[1]:'']">
                        {{tr[td[1]]}}
                    </span>
                </div>
            </template>
            <slot v-else></slot>
        </transition-group>
    </div>
</div>
</template>

<script>
function luiTable(){
    Object.assign(this,{
        name:"lui-table",
        props:{
            list:Array,
            thead:{default:null},
            height:{default:"100%"},            
        },
        data(){
            return {

            }
        },
        computed:{
            headTh(){
                if(!this.thead || this.thead.length == 0)
                    return false;
                if(this.thead.constructor == Array){
                    return this.thead.map(o=>{
                        if(!o)
                            return [null];
                        if(o.constructor == Array)
                            return o.length == 2 ? [o[0],o[1]] : [null];
                        else
                            return [o+""]
                    });
                }
                else if(this.thead.constructor === Object){
                    let re = [];
                    for(let key in this.thead){
                        re.push([this.thead[key]+"",key]);
                    }
                    return re;
                }
                else
                    return false;
            },
        }        
    });
}
</script>
</component>