const WiW = window.innerWidth, WiH = window.innerHeight;

let canvas_1;
let ctx;
let render;

Matter.use(MatterAttractors);

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine, world;

function setup() {
    let w;
    if (Math.trunc(WiW) % 2 == 0) {
        w = Math.trunc(WiW);
    } else {
        w = Math.trunc(WiW) + 1;
    }
    let h;
    if (Math.trunc(WiH) % 2 == 0) {
        h = Math.trunc(WiH)
    } else {
        h = Math.trunc(WiH) + 1;
    }
    createCanvas(w, h, P2D)
    frameRate(30)
    // console.log(canvas_1.elt.getContext("2d"))
    // console.log(canvas_1.elt)
    let newCnv = document.querySelector("canvas");
    let newCxt = document.querySelector("canvas").getContext('2d');

    engine = Engine.create(), world = engine.world;
    render = Render.create({
        engine: engine,
        canvas: newCnv,
        context: newCxt,
        // setPixelRatio: 10,
        options: {
            // width: Math.trunc(WiH/1.414),
            width: WiW,
            height: WiH,
            showAngleIndicator: false,
            wireframes: false,
            background: 'rgba(0,0,0,0)',
            pixelRatio: 1,
        }
    });
    console.log(render)
    // render.context = canvas_1.getContext('2d');
    Render.run(render);

    loadScripts()
}

function draw() {
    // background(color('white'))
    // blendMode(ADD)
    //if (frameCount % 21 == 0) {
    //    background('rgb(' + random() * 255 + ', 50,50)')
    //}
}

document.addEventListener("click", (e) => {
    let canvas = document.querySelectorAll("canvas")
    console.log(canvas)
    for (const elem of canvas) {
        console.log(elem.getContext("2d"))
    }
})

const listScripts = ["./js/script.js", "./js/classes.js"]
function loadScripts() {
    for (const elem of listScripts) {
        let newScript = document.createElement("script")
        newScript.src = elem;
        document.body.appendChild(newScript)
    }
}