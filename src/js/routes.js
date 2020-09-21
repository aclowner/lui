
const {welcome,buttonPage,checkPage,inputPage,selectPage,datePage,filePage,tablePage,tablePage2,treeSelect,popupPage,apiRequest,apiCookie,apiOther} = NS.Component([
    "../view/welcome",
    "../view/buttonPage",
    "../view/checkPage",
    "../view/inputPage",
    "../view/selectPage",
    "../view/datePage",
    "../view/filePage",
    "../view/tablePage",
    "../view/tablePage2",
    "../view/treeSelect",
    "../view/popupPage",
    "../view/apiRequest",
    "../view/apiCookie",
    "../view/apiOther"
]);

function routes(){
    
    let  rounts = [
        {
            path:"/",
            name:"welcome",
            component:welcome
        },
        {
            path:"/button",
            name:"button",
            component:buttonPage
        },
        {
            path:"/check",
            name:"check",
            component:checkPage,
        },
        {
            path:"/input",
            name:"input",
            component:inputPage,
        },
        {
            path:"/select",
            name:"select",
            component:selectPage,
        },
        {
            path:"/date",
            name:"date",
            component:datePage,
        },
        {
            path:"/file",
            name:"file",
            component:filePage,
        },
        {
            path:"/table",
            name:"table",
            component:tablePage,
        },
        {
            path:"/table2",
            name:"table2",
            component:tablePage2,
        },
        {
            path:"/treeSelect",
            name:"treeSelect",
            component:treeSelect,
        },
        {
            path:"/popup",
            name:"popup",
            component:popupPage,
        },
        {
            path:"/apiRequest",
            name:"apiRequest",
            component:apiRequest,
        },
        {
            path:"/apiCookie",
            name:"apiCookie",
            component:apiCookie,
        },
        {
            path:"/apiOther",
            name:"apiOther",
            component:apiOther,
        }
    ];

    return rounts;
}