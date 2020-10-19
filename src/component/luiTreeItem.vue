<component>
<style>
.lui-tree-item{    
    position: relative;
}
.item-self{    
    line-height: 2;
    display: flex;
    align-items: center;
}
.item-child .item-self, .item-child .item-child{
    padding-left: .32rem;
}
.item-self .iconfont{
    font-size: .12rem;
    line-height: 1;
    border: solid .01rem #c0c0c0;
    color: #999;
    padding: .01rem;
    margin-right: .08rem;
    cursor: pointer;
}
.item-child .lui-tree-item:before{
    content: "";
    position: absolute;
    top: 0;
    left: .07rem;
    bottom: 0;
    border-left: solid .01rem #cfcfcf;
}
.item-child .lui-tree-item:after{
    content: "";
    position: absolute;
    top: .15rem;
    left: .07rem;
    width: .18rem;
    border-top: solid .01rem #cfcfcf;
}
.item-child .lui-tree-item:last-child:before{
    height: .16rem;
}
</style>

<template>
<div class="lui-tree-item">
    <div class="item-self">
        <a :class="['icon',open?'i-minus':'i-add']" @click="open=!open" v-if="data.child&&data.child.length>0"></a>
        <a :class="['checkbox',{checked:checkArr.indexOf(data.id+'')>=0}]" v-if="check" @click="checkClick(data.id)"></a>
        <span>{{data.name}}</span>
    </div>
    <div class="item-child" v-if="data.child&&data.child.length>0" v-show="open">
        <lui-tree-item ref="child" v-for="citem in data.child" :key="citem.id" :data="citem" :check="check" :check-arr="checkArr" @child-change="childChange"></lui-tree-item>   
    </div>
</div>
</template>

<script>
function luiTreeItem(){
    Object.assign(this,{
        name:"lui-tree-item",
        props:{
            "data":{},
            "check":{default:false},
            "checkArr":Array,
            "change":{default:true}
        },
        data(){
            return {
                open:false,
            }
        },
        methods:{
            checkClick(id){
                let index = this.checkArr.indexOf(id+''),
                    childAllIds = this.getAllChildIds();
                childAllIds.push(id+'');
                if(index<0){                    
                    //选中
                    let child = JSON.parse(JSON.stringify(this.checkArr));
                    newArr = childAllIds.filter(o=>this.checkArr.indexOf(o)<0);
                    this.checkArr.push(...newArr);
                }else{
                    //取消选择
                    this.checkArr.spliceArr(childAllIds);
                }           
                this.$emit("child-change");       
            },
            getAllChildIds(){
                let child = this.data.child || [];
                return child.childFlat().map(o=>o.id+'');
            },
            childChange(){
                
                let id = this.data.id+'',
                    index = this.checkArr.indexOf(id),
                    childAllIds = this.getAllChildIds(),
                    ckids = this.checkArr.filter(o=>childAllIds.indexOf(o)>=0);
                if(ckids.length>0){
                    if(index<0)
                        this.checkArr.push(id);
                }                    
                else
                    this.checkArr.splice(index,1);
                this.$emit("child-change");
            }
        },
        watch:{
        }
    });
}
</script>
</component>