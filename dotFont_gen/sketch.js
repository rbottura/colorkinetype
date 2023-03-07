let WiW = window.innerWidth, WiH = window.innerHeight;
let canvasW = 400, canvasH = 400;

class Grid {
  constructor(width, r, g, b) {
    this.width = width;
    this.space = width * 4;

    this.r = r;
    this.g = g;
    this.b = b;

    this.gridH = WiW;
    this.gridW = WiW;

    this.grid = WiH;

    this.nbrLinesH = this.gridH / (this.width + this.space);
    this.nbrLinesW = this.gridW / (this.width + this.space);

    this.nbrLines = this.grid / (this.width + this.space);
  }
  show() {
    //rows 
    for (let i = 0; i < this.nbrLines; i++) {
      line(0, i * this.width * 2 + (this.width / 2), this.grid, i * this.width * 2 + (this.width / 2));
      stroke(this.r, this.g, this.b);
      strokeWeight(this.width);
    }

    //cols
    for (let i = 0; i < this.nbrLines; i++) {
      line(i * this.width * 2 + (this.width / 2), 0, i * this.width * 2 + (this.width / 2), this.grid);
      stroke(this.r, 255, this.b)
      strokeWeight(this.width);
    }
  }
}

class Grid2 {
  constructor(sizeX, spaceX, sizeY, spaceY, colorX, colorY) {

    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.spaceX = spaceX;
    this.spaceY = spaceY;

    this.colorX = colorX;
    this.colorY = colorY;

    this.gridH = WiW;
    this.gridW = WiW;

    this.grid = WiH;

    //rows
    this.nbrLinesH = this.gridH / (this.sizeY + this.spaceY);

    //cols
    this.nbrLinesW = this.gridW / (this.sizeX + this.spaceX);

    this.nbrLines = this.grid / (this.width + this.space);
  }
  show() {
    //rows 
    for (let i = 0; i < this.nbrLinesH; i++) {
      line(0, i * (this.sizeY + this.spaceY), this.gridH, i * (this.sizeY + this.spaceY));
      stroke(this.colorY);
      strokeWeight(this.sizeY);
    }

    //cols
    for (let i = 0; i < this.nbrLinesW; i++) {
      line(i * (this.sizeX + this.spaceX), 0, i * (this.sizeX + this.spaceX), this.gridW);
      stroke(this.colorX)
      strokeWeight(this.sizeX);
    }
  }
}

class Texte {
  constructor() {
    this.content = "";
    this.size = 260;
    this.height = this.size + 50;

    for (let i = 11568; i < 11568+30; i++) {
      this.content += String.fromCharCode(i);
    }
    this.arrTxt = this.content.split('');
  }
  show(glyph) {
    textSize(this.size + this.size / 4)
    fill(0);
    noStroke();
    push()
    translate(150, 10)
    textAlign(CENTER, BASELINE)
    text(this.arrTxt[glyph], this.size / 6, this.height)
    pop()
  }
}

let Img1;
let Amdal;

function preload() {
  Img1 = loadImage('./ps1.png')
  Amdal = loadFont('./font/AMDAL-Regular.otf');
  EgyptienneL = loadFont('./font/EgyptienneLarge-Regular.otf');
  GaramondI = loadFont('./font/Garamond-Italic.ttf');
  PeaceSans = loadFont('./font/Peace_sans.otf');
  Lithops = loadFont('./font/Lithops-Regular.otf');
  Pilow = loadFont('./font/Pilowlava-Regular.otf');
  Typefesse = loadFont('./font/Typefesse_Claire-Obscure.otf');
  Mainz = loadFont('./font/Mainz.otf');
}

let colorB, grid2, txt1, grid1, colorA;
let globalGlyphIndex = 0;

let cnv, savingImgs = false;

function setup() {
  cnv = createCanvas(canvasW, canvasH);
  textFont(Amdal);
  // colorA = color("rgba(255,120,0,0.5)")
  // colorB = color("rgba(0,120,255,0.5)")
  colorA = color("white")
  colorB = color("white")

  let size = 7;
  let space = 4;
  grid2 = new Grid2(size, space, size, space, colorA, colorB);
  txt1 = new Texte();
}

let loopIndex = 0;
let FPS = 2; 

function draw() {
  // blendMode(BLEND)
  background(255, 255, 255, 255);
  frameRate(FPS)

  // image(Img1, 0, 0)

  if (globalGlyphIndex >= 30) {
    globalGlyphIndex = 0;
    savingImgs = false;
    FPS = 1.5;
  }

  txt1.show(globalGlyphIndex);
  // console.log(frameCount)
  push()
  // translate(150, -250)
  // rotate(PI / 4);
  // translate(-12, -12)
  grid2.show();
  pop()

  globalGlyphIndex++;
  if (savingImgs) {
    saveImgToPage(cnv.canvas)
  }
  // saveCanvas('Mainz' + frameCount, 'png');
  // console.log(frameCount);
}

document.addEventListener("keydown", (e) => {
  if (e.key == "s") {
    savingImgs = true;
  } else if (e.key == "t") {
    savingImgs = false;
  }
})

let images_folder = document.querySelector("#img_saved_wrapper");

function saveImgToPage(canvas) {
  let newImg = document.createElement("img")
  newImg.classList.add("letter_image")
  let canvasImg = canvas.toDataURL();
  newImg.src = canvasImg

  images_folder.appendChild(newImg);
}

let load_gpe_btn = document.querySelector("#load_gpe_btn");
load_gpe_btn.addEventListener("click", () => restart())

function restart() {
  globalGlyphIndex = 0;
  savingImgs = true;
  FPS = 6;
}

let erase_btn = document.querySelector("#erase_btn");
erase_btn.addEventListener("click", () => clearImages())

function clearImages() {
  globalGlyphIndex = 0;
  savingImgs = false;
  images_folder.innerHTML = "";
}


let save_gpe_btn = document.querySelector("#save_gpe_btn")
save_gpe_btn.addEventListener("click", () => saveBatch())


let letterImgs = document.querySelectorAll("img");
function saveBatch() {
  letterImgs = document.querySelectorAll("img");
  console.log(letterImgs)
  var i = 0;

  var id = setInterval(() => {

    if (i >= letterImgs.length) {
      clearInterval(id);
      return;
    }

    let image = letterImgs[i];
    i++;
    var a = document.createElement('a');
    console.log(image)
    a.href = image.src
    a.download = image.src
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }, 300)

}