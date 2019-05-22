let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const canvas = document.getElementById('canvas')
const renderer = PIXI.autoDetectRenderer({
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

const atlas = new DTA.RenderedAtlas(renderer, 2048, 2048, 500);
console.log('atlas was', atlas);

const stage = new PIXI.Container();

PIXI.loader
    .add('sprites/bunny_0.png')
    .add('sprites/bunny_1.png')
    .add('sprites/bunny_2.png')
    .add('sprites/bunny_3.png')
    .add('sprites/bunny_4.png')
    .add('sprites/bunny_5.png')
    .add('sprites/bunny_6.png')
    .add('sprites/bunny_7.png')
    .add('sprites/bunny_8.png')
    .add('sprites/bunny_9.png')
    .add('sprites/bunny_10.png')
    .add('sprites/bunny_0 - Copy.png')
    .add('sprites/bunny_1 - Copy.png')
    .add('sprites/bunny_2 - Copy.png')
    .add('sprites/bunny_3 - Copy.png')
    .add('sprites/bunny_4 - Copy.png')
    .add('sprites/bunny_5 - Copy.png')
    .add('sprites/bunny_6 - Copy.png')
    .add('sprites/bunny_7 - Copy.png')
    .add('sprites/bunny_8 - Copy.png')
    .add('sprites/bunny_9 - Copy.png')
    .add('sprites/bunny_10 - Copy.png')
    .load(onLoaded);

function onLoaded(loader, resources) {
    let drawX = 0;
    let timeStart = Date.now();
    for(let i = 0; i < 11; i++) {
        const newSprite = new PIXI.Sprite(resources[`sprites/bunny_${i}.png`].texture);
        atlas.addSprite(i, newSprite);
        newSprite.x = drawX;
        newSprite.y = 50;
        stage.addChild(newSprite);
        drawX+= 50;
        /*
        if(i < 11) {

        } else {
                let j = i - 11;
                const newSprite = new PIXI.Sprite(resources[`sprites/bunny_${j} - Copy.png`].texture);
                atlas.addSprite(i, newSprite);
                newSprite.x = drawX;
                newSprite.y = 50;
                stage.addChild(newSprite);
                drawX+= 50;
        }

         */
    }

    console.log('it took', Date.now() - timeStart);
    console.log('the stage was', stage);
    renderer.render(stage);
}

