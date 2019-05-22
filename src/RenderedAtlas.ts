/**
 * RenderedAtlas will render pixi render textures based on atlas data.
 **/
import { MultiAtlas } from './';

export default class RenderedAtlas extends MultiAtlas {
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private atlasRenderTextures: {[atlasIndex: number]: PIXI.RenderTexture } = {};
    private mappedTextures: any = {};
    private mappedSprites: {[id: string]: Array<PIXI.Sprite> } = {};
    constructor(renderer, maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength)
    {
        super(maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength);
        this.renderer = renderer;
    }

    /**
     * Initialized the given sprite into an open atlas position and then renders the sprites current
     * texture to a RenderTexture and returns a new texture from the render texture.
     * @param id - id of the sprite we want mapped to the newly created texture
     * @param sprite - sprite that has a texture we want to merge into our atlas
     * @param deleteSprite - if we want to delete the sprite and its textures after
     */
    public addSprite (id, sprite: PIXI.Sprite) : PIXI.Texture {
        // the mapped texture already exists now check to see
        // if we need a new mapped sprite array.
        if(this.mappedTextures[id]) {
            if(this.mappedSprites[id]) {
                this.mappedSprites[id].push(sprite);
            } else {
                this.mappedSprites[id] = [sprite];
            }
            sprite.texture = this.mappedTextures[id];
            return;
        }

        const { atlasIndex, rect } = this.addRect(id, sprite.width, sprite.height);

        if(!(atlasIndex in this.atlasRenderTextures)) {
            this.atlasRenderTextures[atlasIndex] = PIXI.RenderTexture.create(this.maxAtlasWidth, this.maxAtlasHeight);
        }

        const container = new PIXI.Container();
        const oldRenderTextureSprite = new PIXI.Sprite(this.atlasRenderTextures[atlasIndex]);
        oldRenderTextureSprite.position.x = 0;
        oldRenderTextureSprite.position.y = 0;

        container.addChild(oldRenderTextureSprite);

        const copiedSprite = new PIXI.Sprite(sprite.texture);

        container.addChild(copiedSprite);
        // assign sprite position to the open rect
        copiedSprite.position.x = rect.x;
        copiedSprite.position.y = rect.y;

        // create the new render texture
        const newRenderTexture = PIXI.RenderTexture.create(this.maxAtlasWidth, this.maxAtlasHeight);
        // render sprite to render texture
        this.renderer.render(container, newRenderTexture);

        container.removeChild(oldRenderTextureSprite);
        oldRenderTextureSprite.destroy({ children: true, texture: true, baseTexture: true });

        container.removeChild(copiedSprite);
        copiedSprite.destroy({ children: true, texture: false, baseTexture: false });

        // update current render texture
        this.atlasRenderTextures[atlasIndex] = newRenderTexture;

        container.destroy({ children: true, baseTexture: false, texture: false });

        // add the sprite to lookup
        this.mappedSprites[id] = [sprite];

        // updates all sprites with new textures using new render texture as base texture
        // also updates the mappedTextures
        this.updateSpriteTextures(atlasIndex);
    }

    public removeSprite(id, sprite) {
        const sprites = this.mappedSprites[id];
        let len = sprites.length;
        while(len--) {
            if(sprites[len] === sprite) {
                sprites.splice(len, 1);
                if(!sprites.length) {
                    delete this.mappedSprites[id];
                }
                return;
            }
        }
    }

    public updateSpriteTextures(atlasIndex) {
        const rects = this.getMappedRects(atlasIndex);
        const renderTexture = this.atlasRenderTextures[atlasIndex];
        for(let id in this.mappedSprites) {
            const sprites = this.mappedSprites[id];
            const rect = rects[id];
            const texture = new PIXI.Texture(
                renderTexture.baseTexture,
                new PIXI.Rectangle(rect.x, rect.y, rect.width, rect.height),
            );
            this.mappedTextures[id] = texture;
            let len = sprites.length;
            while(len--) {
                let sprite = sprites[len];
                sprite.texture.destroy();
                sprite.texture = texture;
            }
        }
    }
}