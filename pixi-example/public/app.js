let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const canvas = document.getElementById('canvas')
const renderer = PIXI.autoDetectRenderer({
        forceCanvas: true,
        width: screenWidth,
        height: screenHeight,
        antialias: false,
        roundPixels: true,
        resolution:  1,
        view: canvas,
});

renderer.view.width = screenWidth;
renderer.view.height = screenHeight;
renderer.view.style.width = screenWidth + 'px';
renderer.view.style.height = screenHeight + 'px';
renderer.view.style.display = 'block';
renderer.view.style.position = 'absolute';
renderer.view.style.top = '0';
renderer.view.style.left = '0';
renderer.view.style.zIndex = '-1';
renderer.backgroundColor = 0xffffff;

const atlas = new DTA.RenderedAtlas(renderer, 2048, 2048, 210);
console.log('atlas was', atlas);

const stage = new PIXI.Container();

PIXI.loader
    .add('sprites/bunny_0.png')
    .add('sprites/bunny_1.png')
    .add('sprites/bunny_2.png')
    .add('sprites/bunny_3.png')
    .add('sprites/bunny_4.png')
    .add('sprites/bunny_5.png')
    .load(onLoaded);

function onLoaded(loader, resources) {
        let drawX = 0;
        let drawY = 50;

        let i = 0;
        let interval = setInterval(() => {
                const newSprite = new PIXI.Sprite(resources[`sprites/bunny_${i}.png`].texture);
                const timeStart = Date.now();
                atlas.addSprite(i, newSprite);
                console.log('rerender time', Date.now() - timeStart);
                newSprite.x = drawX;
                newSprite.y = drawY;
                stage.addChild(newSprite);
                drawX+= 50;
                renderer.render(stage);
                i++;
                if(i === 6){
                        clearInterval(interval);
                }
        }, 500);
}

