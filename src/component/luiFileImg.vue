<component>
<style>
.lui-file-img{
    display: flex;
    position: relative;
}
.a-img-add, .div-img-added{
    width: 1.2rem;
    height: 1.2rem;
    border: var(--input-border);    
    position: relative;
}
.a-file-add-icon{
    font-size: .36rem;
    color: var(--input-border-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
}
.div-img-added{
    padding: .01rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .2rem;
}
.div-img-added img{
    max-width: 1.16rem;
    max-height: 1.16rem;
}
.div-img-added-ope{
    position: absolute;
    height: 0.4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.75);
    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
    transition: all .4s;
}
.div-img-added:hover .div-img-added-ope{
    opacity: 1;
}
.a-added-ope{    
    font-size: .22rem;
    transition: all 0.2s;
    position: relative;
} 
.a-added-ope:hover{
    font-size: .24rem;
}
.icon-zoom-out{
    color: var(--blue);
}
.icon-switch{
    color: var(--green);
}
.icon-del{
    color: var(--orange);
}
</style>

<template>
<div class="lui-file-img">
    <div class="div-img-added" v-for="(img,ii) in imgArr" :key="ii">
        <img :src="img.src" alt="">
        <div class="div-img-added-ope">
            <a class="a-added-ope iconfont icon-zoom-out" @click="imgOpe(1,$event)"></a>
            <a class="a-added-ope iconfont icon-switch">
                <input type="file" class="file-input-transparent" accept="image/*" @change="addImg($event,ii)">
            </a>
            <a class="a-added-ope  iconfont icon-del" @click="imgOpe(3,ii)"></a>
        </div>
    </div>
    <a class="a-img-add" v-if="length==0||imgArr.length<length">
        <input type="file" class="file-input-transparent" accept="image/*" :multiple="length==1?false:true" @change="addImg($event)">
        <i class="a-file-add-icon iconfont icon-add"></i>
    </a>
</div>
</template>

<script>
function luiFileImg(){
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
                imgArr:[],
            }
        },
        methods:{
            addImg(e,i){
                this.update = true;
                for(let file of e.target.files){
                    let vf = file.ToJson();
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload=(e)=>{
                        vf.src = e.target.result;  
                        if(i == undefined)
                            this.imgArr.push(vf);    
                        else
                            this.imgArr.splice(i,1,vf);                                          
                    }                  
                }
            },
            imgOpe(t,param){
                //t 1:放大  2:更换  3:删除
                if(t==1){
                    //param 点击事件参数

                }
                else if(t==3){
                    //param 图片数组索引
                    this.imgArr.splice(param,1);
                }
            }
        }
    });
}
</script>
</component>