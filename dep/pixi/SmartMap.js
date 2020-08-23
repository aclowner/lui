const {Application, Container, Sprite, Graphics, utils, Point} = PIXI;

const   Event = utils.EventEmitter;
let options;
function SmartMap(option){
    Event.call(this);
    options = {
            antialias:true,
            transparent:true,
            resolution: 1
        },
        mapDiv = option.div;
    Object.assign(options,option);

    let app = new Application(options);
    window.onresize = app.resize();

    let scene = app.stage.addChild(new Container());
    scene.interactive = true;
    scene.name = "Scene";
    //scene.position.set(app.view.width/2, app.view.height/2);

    let screen = app.stage.addChild(new Container());
    screenTop.name = "Screen";

    this.mapDiv    = mapDiv;
    this.app       = app;
    this.view      = app.view;
    this.scene     = scene;
    this.screen    = screen;    
    this.isPlaying = true;

    BindZoomAndPan(this);
    mapDiv.appendChild(app.view);
}

function BindZoomAndPan(map){
    let {mapDiv, scene} = map;

    mapDiv.onmousedown = (ev) => {
        let dp = {
            x: scene.x - ev.offsetX,
            y: scene.y - ev.offsetY
        };
        mapDiv.onmousemove = (ev)=>{
            scene.x = ev.offsetX + dp.x;
            scene.y = ev.offsetY + dp.y;
        }
    };

    mapDiv.onmouseup = (ev)=>{
        mapDiv.onmousemove = null;
    }

    mapDiv.onwheel = (ev)=>{        
        let s = 0.15*ev.wheelDelta/Math.abs(ev.wheelDelta),
            dx = s * (ev.offsetX - scene.x),
            dy = s * (ev.offsetY - scene.y);        
        scene.x -= dx;
        scene.y -= dy;
        scene.scale.x *= 1+s;
        scene.scale.y *= 1+s;  
        if(options.scaleCall)      
            options.scaleCall(scene.scale.x);
    };
}

function DampingMove(scene,dMove){
    scene.x += dMove.x;
    scene.y += dMove.y;
    //todo:限制Map拖动区域
    // scene.x = Math.clamp(scene.x+dMove.x, 0, mapObj.view.width);
    // scene.y = Math.clamp(scene.y+dMove.y, 0, mapObj.view.height);
}