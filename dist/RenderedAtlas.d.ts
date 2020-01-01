/// <reference types="pixi.js" />
/**
 * RenderedAtlas will render pixi render textures based on atlas data.
 **/
import { MultiAtlas } from './';
export default class RenderedAtlas extends MultiAtlas {
    private renderer;
    private atlasRenderTextures;
    private mappedTextures;
    constructor(renderer: any, maxAtlasWidth: any, maxAtlasHeight: any, expectedMinTextureLength: any);
    addTexture(id: any, texture: any): PIXI.Texture;
    getTexture(id: any): PIXI.Texture;
    /**
     * Initialized the given sprite into an open atlas position and then renders the sprites current
     * texture to a RenderTexture and returns a new texture from the render texture.
     * @param id - id of the sprite we want mapped to the newly created texture
     * @param sprite - sprite that has a texture we want to merge into our atlas
     * @param deleteSprite - if we want to delete the sprite and its textures after
     */
    addSprite(id: any, sprite: PIXI.Sprite, deleteSprite?: boolean): PIXI.Texture;
}
