<component>
<style>
.file-list{
    padding: .12rem 0;
}
.file-item{
    width: 100%;
    display: flex;
    font-size: .16rem;
    line-height: 2.2;
    align-items: center;
}
.file-item:before{
    content: "";
    width: 0.08rem;
    height: 0.08rem;
    border-radius: .04rem;
    margin-right: .14rem;
}
.file-type-1:before{
    background: var(--blue);
}
.file-type-2:before{
    background: var(--green);
}
.file-type-2:before{
    background: var(--cyan);
}
.file-type-4:before{
    background: var(--yellow);
}
.file-size{
    margin-left: .06rem;
}
.file-del{
    margin-left: .2rem;
}
</style>

<template>
<div class="lui-file-select">
    <button class="btn blue">选择文件
        <input type="file" class="file-input-transparent" @change="addImg($event)" multiple="true">
    </button>
    <div class="file-list">
        <div :class="['file-item','file-type-'+f.type]" v-for="(f,fi) in fileArr" :key="fi">
            <span class="file-name toe">{{f.name}}</span>
            <span class="file-size">({{f.size}})</span>
            <span class="file-del"><button class="btn btn-mini orange" @click="fileOpe(1,fi)">删除</button></span>
        </div>
    </div>
</div>
</template>

<script>
function luiFileSelect(){
    Object.assign(this,{
        model:{
            prop:"value",
            event:"input"
        },
        props:{
            value:"",
            length:{default:1},        
        },
        data(){
            return {
                fileArr:[],
            }
        },
        methods:{
            addImg(e,i){
                this.update = true;
                for(let file of e.target.files){
                    let vf = lui.FileData(file.name,file.size);
                    this.fileArr.push(vf);                 
                }
            },
            fileOpe(t,param){
                //t 1:删除
                if(t==1){
                    //param 图片数组索引
                    this.fileArr.splice(param,1);
                }
            }
        }
    });
}
</script>
</component>