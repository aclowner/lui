<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >lui-layer</a></h3>
    <ul>
        <li>        
            <p><strong>open</strong></p>
            <p>
                <button class="btn btn-border blue" @click="popupForm()">弹出默认窗口</button>
            </p>
            <p>
                <button class="btn btn-border blue" @click="popupAny()">弹出自定义</button>
            </p>
            <span class="remark">弹出层默认遮罩上只有一个窗口，可以设置窗口都在遮罩上；弹出默认窗口已内置是否可拖动</span>
        </li> 
        <li>
            <p><strong>alert</strong></p>
            <p>
                <button class="btn btn-border green" @click="alert">弹出提示</button>
            </p>
        </li>
        <li>
            <p><strong>confirm</strong></p>
            <p>
                <button class="btn btn-border yellow" @click="confirm">弹出确认</button>
            </p>
        </li>
        <li>
            <p>layer 参数</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey2" :list="layerPros">
                </lui-table>
            </div>
        </li>
        <li>
            <p>layer 方法</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey" :list="layerFns">
                </lui-table>
            </div>
            <span class="remark">调用其他弹出层操作时，若该弹出层同时存在多个(同名)，则不处理</span>
        </li>
        <li>
            <p>弹出层 事件</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey" :list="popupEvents">
                </lui-table>
            </div>
            <span class="remark">调用其他弹出层操作时，若该弹出层同时存在多个(同名)，则不处理</span>
        </li>        
    </ul>

    <lui-layer ref="layer" ></lui-layer>
</div>
</template>

<script>
NS.Component([
    "popup/popupForm",
    "popup/popupD2",
    "popup/popupAny"
]);
function popupPage(){
    Object.assign(this,{
        data(){
            return {
                tdKey:["方法","描述"],
                tdKey2:["参数","描述"],
                layerFns:[
                    ["open(name,{operate})","打开弹出层，并调用弹出层相关处理"],
                    ["close(name)","关闭弹出层"],
                    ["closeAll()","关闭全部弹出层"],
                    ["alert(con,fnCall(re),[btns])","打开弹出框"],
                    ["confirm(con,fnCall(re),[btns])","打开确认框"]
                ],
                popupEvents:[
                    ["open(name,{operate})","打开弹出层，并调用弹出层相关处理"],
                    ["close({对其他弹出层操作})","关闭弹出层、关闭之前可调取其他弹出层"],
                    ["closeAll()","关闭全部弹出层"],
                    ["sibling({operate})","调用其他弹出层(名称)相关处理"],
                    ["alert(con,fnCall(re),[btns])","打开弹出框"],
                    ["confirm(con,fnCall(re),[btns])","打开确认框"]
                ],
                layerPros:[
                    ["cover","0/1/2 -- 0:无遮罩(透明),1:遮罩上只显示最近层,2:所有层都在遮罩上"]
                ]
            }
        },
        methods:{
            popupForm(){
                this.$refs.layer.open("popupForm",{num:1,fnForm1:[1,2,3]});
            },
            popupAny(){
                this.$refs.layer.open("popupAny");
            },
            alert(){
                this.$refs.layer.alert("这个是提示内容",re=>{
                    console.log(re);
                });
            },
            confirm(){
                this.$refs.layer.confirm("这个是提示内容",re=>{
                    console.log(re);
                });
            }
        }
    });
}
</script>
</component>