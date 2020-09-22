
// Lui = NS.Import("../../dep/lui/js/Lui");

NS.Component([
    "../component/luiCheckbox",
    "../component/luiCheckboxGroup",
    "../component/luiRadioGroup",
    "../component/luiSwitch",
    "../component/luiSearch",
    "../component/luiTagInput",
    "../component/luiSelect",
    "../component/luiDatetime",
    "../component/luiFileImg",
    "../component/luiFileSelect",
    "../component/luiTablePaging",
    "../component/luiTable",
    "../component/luiTree",
]);

//临时代码


const menus = NS.Load("../asset/json/menu.json");
const routes = NS.Import("routes");

Tween =  NS.Import("../../dep/namespace/Tween");

function start(){

    let router = new VueRouter({
        routes:new routes()
    });

    vue = new Vue({
        el:"#vue",
        router:router,
        data:{
            menus:menus,
            route:{},
        },
        created(){ 
        },
        methods:{
        },
        watch:{
            $route(to,from){
                this.route = to;
                console.log(1,to,from);
            }
        },
    });
}