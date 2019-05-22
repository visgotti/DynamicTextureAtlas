declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export default class MultiAtlas {
    private availableAtlasses;
    private atlasses;
    private mappedRects;
    private expectedMinTextureLength;
    maxAtlasWidth: number;
    maxAtlasHeight: number;
    constructor(maxAtlasWidth: any, maxAtlasHeight: any, expectedMinTextureLength: any);
    getMappedRects(atlasIndex: any): {
        [id: string]: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    addRect(id: any, width: any, height: any): {
        atlasIndex: number;
        rect: Rect;
    };
    private atlasFactory;
}
export {};
