
// Lui = NS.Import("../../dep/lui/js/Lui");
Lui.Waiting(1);
NS.Component([
    "../component/luiCheckbox",
    "../component/luiCheckboxGroup",
    "../component/luiRadioGroup",
    "../component/luiSwitch",
    "../component/luiInputIcon",
    "../component/luiInputTag",
    "../component/luiSelect",
    "../component/luiDatetime",
    "../component/luiFileImg",
    "../component/luiFileSelect",
    "../component/luiTablePaging",
    "../component/luiTable",
    "../component/luiTree",
    "../component/luiLayer",
]);

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
            menus:[],
            route:{},
        },
        created(){ 
            Lui.Get({
                path:"src/asset/json/menu.json",
                resultFormat:false
            }).then(re=>{
                this.menus = re;
                Lui.Waiting(0);
            });
        },
        methods:{
        },
        watch:{
            $route(to,from){
                this.route = to;
            }
        },
        mounted(){            
        }
    });    
}