<component>
<style>
.h100{
    height: 100%;
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
                <div class="tr" v-for="tr in listSel" :key="tr[trKey]">
                    <span class="td" v-for="(td,tdi) in headTh" :key="tdi" :class="['th','td-'+tdi,td[1]?'td-'+td[1]:'']">
                        <a v-if="select==1&&tdi==0" :class="['radio',{checked:selVal==tr[trKey]}]" @click="trCheckClick(tr[trKey],1)"></a>
                        <a v-if="select==2&&tdi==0" :class="['checkbox',{checked:selVal.includes(tr[trKey])}]" @click="trCheckClick(tr[trKey],2)"></a>
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
        model:{
            prop:"selectValue",
            event:"input"
        },
        props:{
            list:Array,
            thead:{default:null},
            height:{default:"100%"},    
            select:{default:0},
            trKey:{default:"id"},
            selectValue:{default:null}        
        },
        data(){
            return {
                selVal:null
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
            listSel(){
                let t = this.select,
                    key = this.trKey,
                    _list = this.list ? JSON.parse(JSON.stringify(this.list)) : []
                if(t==0)
                    return _list;
                else if(t==1){
                    let index = _list.findIndex(o=>o[key]==this.selVal);
                        item = _list[index];
                    _list.splice(index,1);
                    _list.unshift(item);
                    return _list;
                }
                else if(t==2){
                    let prev = _list.filter(o=>this.selVal.includes(o[key])),
                        next = _list.filter(o=>!this.selVal.includes(o[key]));
                    return [...prev,...next];
                }
                else{
                    console.log("lui-table 参数select有误");
                    return [];
                }
                    
            }
        },
        methods:{
            trCheckClick(id,t){
                //t 1：单选  2：多选                                   
                let key = this.trKey,
                    _list = JSON.parse(JSON.stringify(this.list));
                if(t==1){
                    this.selVal = id; 
                }
                else{
                    this.selVal.toggle(id);
                }               
                this.$emit("input",this.selVal);
            }
        },
        watch:{
            selectValue:{
                handler(nv){   
                    let selT = this.select,
                        newv = null;
                    if(selT==0)
                        return;
                    else if(selT==1)
                        newv = nv || "";
                    else if(selT==2)
                        newv = nv || [];
                    
                    if(newv != this.selVal)
                        this.selVal = newv;                       
                },
                immediate:true
            }
        }        
    });
}
</script>
</component>