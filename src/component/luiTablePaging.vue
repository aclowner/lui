<component>
<style>
.lui-table.paging{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: .16rem;
}
.thead{    
    background: rgba(0, 0, 0, .1);
}
.thead .tr{
    line-height: 3.2;
}
.tbody{
    flex: 1;
    overflow: hidden;
}
.tfoot{
    border-top: var( --input-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;    
}
.tr.tr-empty{
    border-bottom: none;
}
.tr.tr-empty span{
    width: 100%;
    text-align: center;
}
.paging{
    display: flex;
    justify-content: flex-end;
}
.paging>a{
    width: 32px;
    height: 32px;
    margin-left: 4px;
    text-align: center;
    line-height: 30px;
    background: var(--select-bg);
    border: var(--input-border);
}
.paging>a.a-omit{
    border: none;
    background: none;
    font-weight: bold;
    line-height: 50px;
}
.paging>a.active{
    background: var(--active-color);
    border-color: #fff;
    color: #fff;
}
.paging>.a-prev, .paging>.a-next{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--input-color);
}
.paging>.a-prev:before, .paging>.a-next:before{
    content: "";
    width: 8px;
    height: 8px;
    border-left: double 4px;
    border-bottom: double 4px;
}
.paging>.a-prev:before{
    transform: rotate(45deg);
}
.paging>.a-next:before{
    transform: rotate(-135deg);
}
.nums{
    line-height: 3.5;
    position: relative;
}
.nums .a-size{
    display: inline-block;
    vertical-align: top;
    padding: 0 4px;
    transition: all 0.5s;
}
.nums .a-size:hover, .nums .a-size.active{
    padding: 0 16px;
    border-bottom: solid 1px var(--active-color);
    color: var(--active-color);
}
.nums .a-size:hover:after, .nums .a-size.active:after{
    content: "";
    display: inline-block;
    vertical-align: top;
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
    border-bottom: solid 5px;
    margin-left: 6px;
    margin-top: 13px;  
}
.size-arr{
    position: absolute;
    background: var(--select-bg);
    border: var(--input-border);
    right: 0;
    bottom: 32px;
    opacity: 0;
    transition: opacity 1s;
    z-index: -1;
}
.size-arr:focus{
    z-index: 1;
    opacity: 1;
}
.size-arr>a{
    line-height: 26px;
    display: block;
    margin: 2px;
    padding: 0 24px;
}
.size-arr>a:hover,.size-arr>a.active{
    color: var(--active-color);
}
</style>

<template>
<div class="lui-table paging">		
    <div class="thead" v-if="headTh">
        <div class="tr">
            <span v-for="(th,thi) in headTh" :key="thi" :class="['th','td-'+thi,th[1]?'td-'+th[1]:'']">{{th[0]}}</span>
        </div>
    </div>
    <div class="tbody _scroll">
        <div class="tr tr-empty" v-if="length==0"><span>暂无数据</span></div>
        <transition-group v-else name="table-tr" tag="div" mode='in-out' class="_con">
            <slot></slot>
        </transition-group>
    </div>
    <div class="tfoot">
        <span  v-if="length==0">总计:0</span>
        <template v-else>
            <div class="nums">						
                <span>当前{{show[0]+1}}-{{show[1]}}</span>/<span>总计{{length}}</span>
                <template>
                    <span>每页显示<a :class="['a-size',{active:sizeSelShow}]" @click="sizeClick">{{size}}</a></span>
                    <div class="size-arr" tabindex="1" ref="sizeArr" @blur="sizeArrBlur">
                        <a v-for="s in sizeArr" :key="s" :class="{active:s==size}" @click="sizeSel(s)">{{s}}</a>
                    </div>
                </template>
            </div>
            <div class="paging">
                <a class="a-prev" @click="pagePN(-1)" v-if="pageTotal>7"></a>
                <a v-for="(a,ai) in pageNums" :key="ai" :class="[(a=='...'?'a-omit':'a-num'),{active:a==pageIndex}]" @click="numClick(a)">{{a}}</a>
                <a class="a-next" @click="pagePN(1)"  v-if="pageTotal>7"></a>
            </div>
        </template>
    </div>
</div>
</template>

<script>
function luiTablePaging(){
    Object.assign(this, {
        name:"lui-table-paging",
        model:{
            prop:"value",
            event:"input"
        },
        props : {
            length:{default:0},
            value:{default:[]},            
            thead:{default:null},
            pageSize:{default:20},
            pageSizeArr:Array
        },
        data(){
            return {
                size:this.pageSize,
                sizeArr:this.pageSizeArr || [10,20,50],                
                pageIndex:1,
                sizeSelShow:false,			
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
            show(){
                let si = (this.pageIndex - 1)*this.size, ei = this.pageIndex * this.size;
                ei = Math.min(this.length,ei);
                return [si,ei];
            },
            pageTotal(){
                return Math.ceil(this.length/this.size);
            },
            pageNums(){
                let arr = null;
                if(this.pageTotal<8)
                    arr = this.pageTotal;
                else{
                    if(this.pageIndex<5)
                        arr = [1,2,3,4,5,"...",this.pageTotal];
                    else if(this.pageIndex>this.pageTotal-4)
                        arr = [1,"...",this.pageTotal-4,this.pageTotal-3,this.pageTotal-2,this.pageTotal-1,this.pageTotal];
                    else
                        arr = [1,"...",this.pageIndex-1,this.pageIndex,this.pageIndex+1,"...",this.pageTotal];
                }
                return arr;
            },
        },
        methods:{
            numClick(a){
                if(a!="...")
                    this.pageIndex = a;
            },
            sizeClick(){
                this.sizeSelShow = true;
                this.$refs.sizeArr.focus();
            },
            sizeArrBlur(){
                this.sizeSelShow = false;
            },
            sizeSel(s){
                this.size = s;
                this.$refs.sizeArr.blur();
            },
            pagePN(i){
                if((this.pageIndex<this.pageTotal && i==1)||(this.pageIndex>1&&i==-1))
                    this.pageIndex += i;
            },
        },
        watch : {
            pageTotal(v){
                //总页数小于当期页时，取最大页数
                if(this.pageIndex>v&&v>0)
                    this.pageIndex = v;
            },
            show:{
                handler:function(nv,ov){
                    let sei = [...nv,this.pageIndex];
                    this.$emit('input',sei);
                    this.$emit('change',sei);
                },                
                immediate: true
            }
        }
    });
}
</script>
</component>