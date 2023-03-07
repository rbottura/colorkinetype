

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const basicShape = [];

let shapePts = [9.52, 12.4, 7.07, 16.39, 7.76, 11.76, 3.32, 13.25, 6.83, 10.14, 2.47, 8.42, 7.15, 8.3, 4.92, 4.18, 8.58, 7.09, 9.52, 2.5, 10.45, 7.09, 14.12, 4.18, 11.89, 8.3, 16.57, 8.42, 12.21, 10.14, 15.72, 13.25, 11.28, 11.76, 11.97, 16.39, 9.52, 12.4]

for (let i = 0; i < shapePts.length; i+=2) {
    let paires = [];
    paires.push(shapePts[i])
    paires.push(shapePts[i+1])
    basicShape.push(paires);
}

// console.log(pointShape)

// const basicShape = [[0 / divShape, 132 / divShape], [267 / divShape, 0 / divShape], [351 / divShape, 290 / divShape], [73 / divShape, 340 / divShape], [0 / divShape, 132 / divShape]];


const WiW = window.innerWidth, WiH = window.innerHeight;
const divShape = 20;


canvas.width = WiW;
canvas.height = WiH;

let data_set1;

fetch('./assets/alpha_data.json')
    .then(response => response.json())
    .then(jsondata => {
        data_set1 = jsondata;
        console.log(data_set1);
        setTimeout(() => { pathDataset1(); }, 1500)
    })


// Create the bézier paths for each of the glyphs.
// Note that the .notdef glyph is required.
const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
});

const aPath = new opentype.Path();

// console.log(aPath);

let abcGlyphs = [];
//pathDataset1();

let scale = 0.3;
let offSet_kerning = 600 * scale;
let offsetY = 0;
let indexLetter = 0;

let data1Glyphs = [];
let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
console.log(abc);

function pathDataset1() {
    for (let j = 0; j < data_set1.length; j++) {
        let newAbcPath = new opentype.Path();
        for (let i = 0; i < data_set1[j].length; i++) {

            newAbcPath.moveTo(basicShape[0][0] + data_set1[j][i][0], basicShape[0][1] + (data_set1[j][i][1] * (-1) + 500))

            for (let k = 0; k < basicShape.length; k++) {

                newAbcPath.lineTo(basicShape[k][0] + data_set1[j][i][0], basicShape[k][1] + (data_set1[j][i][1] * (-1) + 500))


                // if (k == basicShape.length - 1) {
                //     newAbcPath.moveTo(basicShape[k][0] + data_set1[j][i][0], basicShape[k][1] + data_set1[j][i][1])
                // } else {
                //     newAbcPath.lineTo(basicShape[k + 1][0] + data_set1[j][i][0], basicShape[k + 1][1] + data_set1[j][i][1])
                // }
            }

            // if (i == data_set1[j].length - 1) {
            //     newAbcPath.moveTo(data_set1[j][i][0], data_set1[j][i][1])
            //     newAbcPath.lineTo(data_set1[j][0][0], data_set1[j][0][1]);
            //     // newAbcPath.strokeWidth = 25;
            //     // console.log("last line");
            //     // newAbcPath
            // } else {
            //     // newAbcPath.beginPath();
            //     newAbcPath.moveTo(data_set1[j][i][0], data_set1[j][i][1]);
            //     newAbcPath.lineTo(data_set1[j][i + 1][0], data_set1[j][i + 1][1]);
            //     // newAbcPath.strokeWidth = 25;
            // }
        }

        newAbcPath.fill = "red";
        // console.log(newAbcPath);

        // console.log("abc [j] : " + abc[j]);
        // console.log("65 + j : " + (65 + j));

        let newGlyph = new opentype.Glyph({
            name: abc[j],
            unicode: 65 + j,
            advanceWidth: 650,
            path: newAbcPath,
            // fill: "black",
            // stroke: "red"
        })
        data1Glyphs.push(newGlyph);
    }

    setTimeout(() => { drawFont() }, 200)
}
// more drawing instructions...
const aGlyph = new opentype.Glyph({
    name: 'A',
    unicode: 65,
    advanceWidth: 650,
    path: aPath
});

const glyphs = [notdefGlyph, aGlyph];
const font_a = new opentype.Font({
    familyName: 'OpenTypeSans',
    styleName: 'Medium',
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs
});

function drawFont() {
    data1Glyphs.splice(0, 0, notdefGlyph);
    console.log(data1Glyphs)
    const font_data1 = new opentype.Font({
        familyName: 'Re-Alphabet',
        styleName: 'Medium',
        unitsPerEm: 800,
        ascender: 800,
        descender: -200,
        glyphs: data1Glyphs
    })
    console.log(font_data1);
    // font_data1.download();
    // font_a.drawPoints(ctx, "a", 50, 50, 12)
}



opentype.load('fonts/Re-Alphabet-Medium.otf', function (err, font) {
    if (err) {
        alert('Font could not be loaded: ' + err);
    } else {
        // Now let's display it on a canvas with id "canvas"
        const ctx = document.getElementById('canvas').getContext('2d');

        // Construct a Path object containing the letter shapes of the given text.
        // The other parameters are x, y and fontSize.
        // Note that y is the position of the baseline.
        const path = font.getPath('LOREM IPSUM', 0, 500, 800);

        console.log(path)

        path.fill = "tomato";
        path.stroke = "red";
        path.strokeWidth = 1;

        // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
        path.draw(ctx);
    }
});