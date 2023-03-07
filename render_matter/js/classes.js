class DataSet {
    constructor(name, jsondata, offsetX, offsetY) {
        this.name = name;
        this.jsondata = jsondata;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
}

const ListNameFonts = ['Alphabet', 'Raleway Dots', 'Default P5 font', 'Egyptienne Large', 'Garamond Italic', 'PeaceSans', 'Pilow', 'Typefesse', 'Mainz', "Phrase", "article", "Amdal"];
// const ListOffsetX = [300, 100, 360, 220, 325, 220, 220, 220, 220]
const ListOffsetX = [320, 100, 380, 250, 320, 250, 230, 250, 250, -100, 0, 0]
const ListOffsetY = [150, -0, 130, 70, -20, 50, 80, 100, 80, 20, 0, 0]

for (let i = 0; i < ListOffsetY.length; i++) {
    ListOffsetY[i] += 30;
    console.log(ListOffsetY[i])
    ListOffsetX[i] += 50;
}

const nbrDataSets = 12;
let ListDataSets = [];

let currentSetValue = 1 - (1);

let dataSetIndex = 0;

loadDataSets();
function loadDataSets() {
    // for (let i = 0; i < nbrDataSets; i++) {
    let url = './data/json_data_' + (1 + dataSetIndex) + '.json';
    console.log(dataSetIndex >= nbrDataSets)
    if (dataSetIndex < nbrDataSets) {
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(jsondata => {
                ListDataSets.push(new DataSet(ListNameFonts[dataSetIndex], jsondata, ListOffsetX[dataSetIndex], ListOffsetY[dataSetIndex]))
                dataSetIndex++;
                loadDataSets();
            });
    } else {
        // creaParticules2(19);
        showLetter('start');
    }
}