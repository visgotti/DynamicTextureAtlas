/**
 * Multi Atlas will work by basically managing multiple atlas's and when trying to add
 * an image to one atlas fails it will create a new one
 **/
import { Atlas } from './';

type Rect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export default class MultiAtlas {
    private availableAtlasses: Array<Atlas>;
    private atlasses: Array<Atlas>;
    private mappedRects: { [id: string]: { atlasIndex: number, rect: Rect } } = {};
    private expectedMinTextureLength: number;
    public maxAtlasWidth: number;
    public maxAtlasHeight: number;
    constructor(maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength)
    {
        this.maxAtlasWidth = maxAtlasWidth;
        this.maxAtlasHeight = maxAtlasHeight;
        this.expectedMinTextureLength = expectedMinTextureLength;
        this.atlasses = [new Atlas(maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength)];
        this.availableAtlasses = [this.atlasses[0]];
        const mappedRects = {};
    }

    public getMappedRects(atlasIndex) {
        return this.atlasses[atlasIndex].mappedRects;
    }

    public addRect(id, width, height) {
        let found = false;
        let rect = null;
        for (let i = 0; i < this.availableAtlasses.length; i++) {
            const index = i;
            const atlas = this.availableAtlasses[i];
            rect = atlas.addRect(id, width, height);
            if (rect) {
                if (!atlas.hasOpenRects()) { // if the atlas doesnt have any more open rects we remove it from available
                    this.availableAtlasses.splice(i, 1);
                    i--;
                }
                this.mappedRects[id] = {
                    atlasIndex: index,
                    rect,
                }
                break;
            }
        }
        if (!rect) {
            const newAtlas = this.atlasFactory();
            const index = this.atlasses.push(newAtlas) - 1;
            this.availableAtlasses.push(newAtlas);
            rect = newAtlas.addRect(id, width, height);

            this.mappedRects[id] = {
                atlasIndex: index,
                rect,
            }
        }
        return this.mappedRects[id];
    }


    private atlasFactory() {
        return new Atlas(this.maxAtlasWidth, this.maxAtlasHeight, this.expectedMinTextureLength);
    }
}