<component>
<style>   
.lui-date{
    position: relative;
    width: 100%;
}
.lui-select{
    width: 100%;
    position: relative;
} 
.sel-list{
    position: absolute !important;
    top: var(--input-height);
    margin-top: 2px;
    right: 0;
    left: 0;
    height: auto;
    border: var(--input-border);
    background: var(--select-bg);
    z-index: 9;
}
.lui-select ._con{
    display: block;
    padding: 2px;
    overflow: hidden;
    max-height: 166px;
}
.lui-select li{
    display: block;
    line-height: 30px;
    margin: 1px 0;
    padding: 0 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.lui-select:before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: var(--input-height);
    border-left: var(--input-border);
}
.lui-select input{
    padding-right: .52rem;
}
.lui-select:after{
    content: "";
    position: absolute;
}
.lui-select:after{
    color: var(--input-border-color);
    border-top: solid 5px;
    border-left: solid 6px transparent;
    border-right: solid 6px transparent;
    right: .2rem;
    top: 50%;
    transform: translate(50%,-50%);
}
.lui-select li:hover{
    background: rgba(0, 0, 0, .06);
}
.lui-select li.active{
    color: var(--active-color);
}
.lui-select ._scroll ._bar {
    width: 6px;
}
</style>

<template>
    <div class="lui-select">
        <input type="text" v-model="text" :readonly="!search" @focus="inputFocus" @blur="inputBlur" @mousedown="inputMD" :placeholder="placeholder"/>
        <div class="_scroll sel-list" v-show="show" tabindex="99" @blur="show=false" @mousedown="evTag='lmd'">
            <ul class='_con'>
                <li class="disable" v-if='!optionArrShow||optionArrShow.length==0'>暂无数据</li>
                <template v-else>                    
                    <li v-for="(lo,li) in optionArrShow" :key="li" :class="{active:lo[0]==value}" @click="liClick(lo)">{{lo[1]}}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
function luiSelect(){
    Object.assign(this,{
        name:"lui-select",                      //组件名
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            'value':"",
            'list':{default(){return []}},                       //下拉数组       
            "index":{default:0},                //该参数为整个组件的灵魂，有意想不到的效果
            'placeholder':'',                   //输入框提示文字
            'search':{default:false},
        },
        data(){
            return{
                listSels : this.list,     //下拉选项列表
                optionArr:[],
                optionArrShow:[],
                selVal:"",                
                text:"",                //输入框显示值
                show:false,             //下拉框展开、收起
                evTag:"",               //失去焦点前操作元素判断，用于判断下拉框是否收起  imd表示input上鼠标按下  lmd表示在下拉列表上鼠标按下
                textTag:"",
            }
        },
        methods:{
            inputFocus(){
                //输入框获取焦点，如果输入框点击获取焦点，不做展开下拉处理，点击事件已处理，如果其他方式获取焦点则打开下拉框
                if(this.evTag!="imd")
                    this.show = true;
                this.evTag = "";                        
            },
            inputMD(){
                //赋值点击标签evTag为imd，inputFocus根据改值判断是否通过点击获取焦点
                this.evTag = "imd";
                //打开、关闭下拉框切换
                this.show = !this.show;
            },
            inputBlur(){
                //输入框失去焦点  如果下拉框点击会赋值evTag为lmd，下拉框获取焦点，此时不关闭下拉框，由下拉框失去焦点时关闭，如果不是下拉框点击，则直接关闭下拉框
                if(this.evTag!="lmd")
                    this.show = false;				
            },
            liClick(lo){
                //下拉选项点击选中          
                //关闭下拉框
                this.show = false;
                let activeValue = lo[0];
                if(activeValue == this.selVal)
                    return;
                let activeIndex = this.optionArr.findIndex(o=>o[0]==activeValue);
                let dataSource = this.list[activeIndex];                
                this.selVal = activeValue;
                this.$emit("input",lo[0]);          //更新选择值
                this.$emit('change',dataSource,activeIndex);             //发出选择时间change                
            },
            setText(nv){             
                //设置输入框显示值      
                this.textTag = "st";   //text赋值为选择或数据绑定，非搜索，用于搜索判断          
                let val = nv || this.value || "";
                if(this.optionArr.length==0 || val=="" || val==undefined){
                    this.text = ""; 
                    return;
                }                             
                let activeOption = this.optionArr.find(o=>o[0]==val);
                this.text = activeOption[1];                
            }
        },	
        watch:{
            list:{
                //监听下拉列表数据，立即监听
                handler:function(nv,ov){       
                    if(JSON.stringify(nv) == JSON.stringify(ov))   
                        return;         
                    this.optionArr = Lui.TransListData(nv,this.index);
                    // if(!nv || !Array.isArray(nv))
                    //     this.optionArr = [];
                    // else{
                    //     this.optionArr = nv.map((o,i)=>{
                    //         //为了减少参数，将index作了特殊使用，当需要使用的值为索引时，index为>=0的整数，获取的值为选项索引+index；当index === -1时，表示值为名称
                    //         let isName = this.index === -1;
                    //         //选项数据为错误数据，则添加错误选项 -2
                    //         if(!o)
                    //             return [-2,""];
                    //         //选项为对象  则取id/name或者Id/Name，没有id/Id 则为错误数据
                    //         if(o.constructor === Object)
                    //             return [isName?(o.name||o.Name||-2):(o.id||o.Id||-2),o.name||o.Name];
                    //         //选项为数组  只支持[value,name] --暂未作详细判断
                    //         else if(o.constructor == Array)
                    //             return o.length==2 ? o : [-2,""];
                    //         //简单值类型  则取索引作为值
                    //         else
                    //             return [isName?o:(i+this.index+""),o];
                    //     });
                    // }
                    this.optionArrShow = this.optionArr;
                    this.setText();
                },
                immediate: true               
            },
            value:{
                handler:function(nv,ov){
                    if(nv != this.selVal)
                        this.selVal = nv;
                },
                immediate: true                
            },
            selVal(nv){
                this.setText(nv);
            },
            text(nv,ov){
                if(this.search){
                    if(this.textTag!="st" && nv)
                        this.optionArrShow = this.optionArr.filter(o=>o[1].indexOf(nv)>=0);
                    else
                        this.optionArrShow = this.optionArr;
                }
                this.textTag = "";                
            }
        }
    })
}
</script>
</component>