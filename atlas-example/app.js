
var atlasWidthInput = document.getElementById('atlas-width');
var atlasHeightInput = document.getElementById('atlas-height');
atlasHeightInput.value = 512;
atlasWidthInput.value = 512;

var minRectWidthInput = document.getElementById('min-rect-width');
var maxRectWidthInput = document.getElementById('max-rect-width');
minRectWidthInput.value = 70;
maxRectWidthInput.value = 300;

var minRectHeightInput = document.getElementById('min-rect-height');
var maxRectHeightInput = document.getElementById('max-rect-height');
minRectHeightInput.value = 70;
maxRectHeightInput.value = 300;

var addRectBtn = document.getElementById('add-rect');
addRectBtn.onclick = () => { addRect() };

var resetBtn = document.getElementById('reset');
resetBtn.onclick = () => { redraw(); };

var fillBtn = document.getElementById('fill');
fillBtn.onclick = () => { fillAtlas() };

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var atlas = null;
var addedRects;

redraw();

function fillAtlas() {
    if(!atlas) return;
    while(atlas.hasOpenRects()) {
        addRect();
    }
}

function redraw() {
    addedRects = 0;

    // get what the minLength of added rects will be
    var minLength = minRectHeightInput.value < minRectWidthInput.value ? minRectHeightInput.value : minRectWidthInput.value
    var atlasHeight = parseInt(atlasHeightInput.value);
    var atlasWidth = parseInt(atlasWidthInput.value);

    atlas = new DTA.Atlas(atlasWidth, atlasHeight, minLength);
    canvas.height = atlasHeight;
    canvas.width = atlasWidth;
    canvas.style.height =  atlasHeight + "px";
    canvas.style.width = atlasWidth + "px";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addRect() {
    if(!atlas) return;

    const width = getRandomInt(minRectWidthInput.value, maxRectWidthInput.value);
    const height = getRandomInt(minRectHeightInput.value, maxRectHeightInput.value);
    const rect = atlas.addRect(addedRects++, width, height);
    if(rect) {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.closePath();
    }
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
