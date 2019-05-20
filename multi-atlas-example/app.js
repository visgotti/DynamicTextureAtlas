
var atlasWidthInput = document.getElementById('atlas-width');
var atlasHeightInput = document.getElementById('atlas-height');
atlasHeightInput.value = 200;
atlasWidthInput.value = 200;

var minRectWidthInput = document.getElementById('min-rect-width');
var maxRectWidthInput = document.getElementById('max-rect-width');
minRectWidthInput.value = 10;
maxRectWidthInput.value = 20;

var minRectHeightInput = document.getElementById('min-rect-height');
var maxRectHeightInput = document.getElementById('max-rect-height');
minRectHeightInput.value = 10;
maxRectHeightInput.value = 20;

var addRectBtn = document.getElementById('add-rect');
addRectBtn.onclick = () => { addRect() };

var resetBtn = document.getElementById('reset');
resetBtn.onclick = () => { redraw(); };

var canvases = document.getElementById("canvases");

var atlas = null;
var addedRects;

redraw()

function addCanvas() {
    var minLength = minRectHeightInput.value < minRectWidthInput.value ? minRectHeightInput.value : minRectWidthInput.value
    var atlasHeight = parseInt(atlasHeightInput.value);
    var atlasWidth = parseInt(atlasWidthInput.value);
    var canvas = document.createElement('canvas');
    canvases.appendChild(canvas);
    canvas.height = atlasHeight;
    canvas.width = atlasWidth;
    canvas.style.height =  atlasHeight + "px";
    canvas.style.width = atlasWidth + "px";
}

function redraw() {
    while(canvases.firstChild) {
        canvases.removeChild(canvases.firstChild);
    }
    addCanvas();
    addedRects = 0;

    var minLength = minRectHeightInput.value < minRectWidthInput.value ? minRectHeightInput.value : minRectWidthInput.value
    var atlasHeight = parseInt(atlasHeightInput.value);
    var atlasWidth = parseInt(atlasWidthInput.value);
    // get what the minLength of added rects will be
    atlas = new DTA.MultiAtlas(atlasWidth, atlasHeight, minLength);
}

function addRect() {
    if(!atlas) return;

    const width = getRandomInt(minRectWidthInput.value, maxRectWidthInput.value);
    const height = getRandomInt(minRectHeightInput.value, maxRectHeightInput.value);
    const { atlasIndex, rect } = atlas.addRect(addedRects++, width, height);

    let ctx;
    // add the canvas if its a new atlas index
    if(!(canvases.children[atlasIndex])) {
        addCanvas();
    }
    ctx = canvases.children[atlasIndex].getContext('2d');
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.closePath();
}

function getRandomInt(min, max) {
    min = Math.ceil(parseInt(min));
    max = Math.floor(parseInt(max));
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
