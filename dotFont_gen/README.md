# Dotted Font Generator  

```js
function setup() {
  cnv = createCanvas(canvasW, canvasH);
  textFont(Amdal);
  
  colorA = color("white")
  colorB = color("white")

  let size = 7;
  let space = 4;
  
  grid2 = new Grid2(size, space, size, space, colorA, colorB);
  txt1 = new Texte();
}

function draw() {
  background(255, 255, 255, 255);

  frameRate(FPS)

  if (globalGlyphIndex >= 30) {
    globalGlyphIndex = 0;
    savingImgs = false;
    FPS = 1.5;
  }

  txt1.show(globalGlyphIndex);

  grid2.show();

  globalGlyphIndex++;
  if (savingImgs) {
    saveImgToPage(cnv.canvas)
  }
}
```