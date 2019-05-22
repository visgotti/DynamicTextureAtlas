/**
 * RenderedAtlas will render pixi render textures based on atlas data.
 **/
import { MultiAtlas } from './';

export default class RenderedAtlas extends MultiAtlas {
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private atlasRenderTextures: {[atlasIndex: number]: PIXI.RenderTexture } = {};
    private mappedTextures: {[ textureId: string]: PIXI.Texture } = {};
    constructor(renderer, maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength)
    {
        super(maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength);
        this.renderer = renderer;
    }

    public addTexture(id, texture) {
        const sprite = new PIXI.Sprite();
        return this.addSprite(id, sprite, true);
    }

    /**
     * Initialized the given sprite into an open atlas position and then renders the sprites current
     * texture to a RenderTexture and returns a new texture from the render texture.
     * @param id - id of the sprite we want mapped to the newly created texture
     * @param sprite - sprite that has a texture we want to merge into our atlas
     * @param deleteSprite - if we want to delete the sprite and its textures after
     */
    public addSprite (id, sprite: PIXI.Sprite, deleteSprite=false) : PIXI.Texture {
        if(this.mappedTextures[id]) {
            if(deleteSprite) {
                sprite.destroy({children: true, texture: true, baseTexture: true});
            }
            return this.mappedTextures[id];
        }

        const { atlasIndex, rect } = this.addRect(id, sprite.width, sprite.height);

        if(!(atlasIndex in this.atlasRenderTextures)) {
            this.atlasRenderTextures[atlasIndex] = PIXI.RenderTexture.create(this.maxAtlasWidth, this.maxAtlasHeight);
        }

        const renderTexture = this.atlasRenderTextures[atlasIndex];

        // assign sprite position to the open rect
        sprite.position.x = rect.x;
        sprite.position.y = rect.y;

        // render sprite to render texture
        this.renderer.render(sprite, renderTexture, false);

        // make a reference to the new texture using render texture as base.
        const texture = new PIXI.Texture(
            renderTexture.baseTexture,
            new PIXI.Rectangle(rect.x, rect.y, rect.width, rect.height),
        );

        this.mappedTextures[id] = texture;

        if(deleteSprite) {
            sprite.destroy({children: true, texture: true, baseTexture: true});
        }
        return texture;
    }
}