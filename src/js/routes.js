
const {welcome,buttonPage,checkPage,inputPage,selectPage,datePage,filePage,tablePage,popupPage} = NS.Component([
    "../view/welcome",
    "../view/buttonPage",
    "../view/checkPage",
    "../view/inputPage",
    "../view/selectPage",
    "../view/datePage",
    "../view/filePage",
    "../view/tablePage",
    "../view/popupPage"
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
            path:"/popup",
            name:"popup",
            component:popupPage,
        }
    ];

    return rounts;
}