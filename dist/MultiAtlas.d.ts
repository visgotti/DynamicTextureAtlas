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
    private maxAtlasWidth;
    private maxAtlasHeight;
    private expectedMinTextureLength;
    constructor(maxAtlasWidth: any, maxAtlasHeight: any, expectedMinTextureLength: any);
    addRect(id: any, width: any, height: any): {
        atlasIndex: number;
        rect: Rect;
    };
    private atlasFactory;
}
export {};
