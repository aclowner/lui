<component>
<style>
</style>

<template>
<div class="page content">
    <h3><a >Number</a></h3>
    <ul>
        <li>
            <p>Number方法</p>
            <div class="div-table-fun">
                <lui-table class="border table-fun" :thead="tdKey" height="20vh">
                    <div class="tr" :key="1">
                        <span class="td td-0">toThousands()</span>
                        <span class="td">转千分位字符串</span>
                    </div>
                </lui-table>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
function prototypeInt(){
    Object.assign(this,{
        data(){
            return {
                tdKey:["方法","描述"]
            }
        }
    });
}
</script>
</component>