declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export default class Atlas {
    mappedRects: {
        [id: string]: Rect;
    };
    private maxAtlasWidth;
    private maxAtlasHeight;
    private expectedMinTextureLength;
    private openRects;
    /**
     *
     * @param maxAtlasWidth - width of atlas textures must fit within
     * @param maxAtlasHeight - height of atlas textures must fit within
     * @param minTextureLength - min length of what expected textures should be, uses this to decide
     *                          if the split rects should be added to the open rects array.
     */
    constructor(maxAtlasWidth: any, maxAtlasHeight: any, expectedMinTextureLength: any);
    reset(): void;
    hasOpenRects(): boolean;
    addRect(id: any, width: any, height: any): false | {
        x: number;
        y: number;
        width: any;
        height: any;
    };
    /**
     * Gets the rect at a given index and divides it after inserting
     * the smaller rect at the top left position of it. Then updates the openRects list
     * by removing the original large rect and adding the split rects if they are large enough
     * @param lgRectIndex
     * @param smRect
     */
    private divideRectAndUpdateOpenRects;
    /**
     * Iterates through available rects inside the atlas to find
     * where the first one fits.
     * @param width
     * @param height
     */
    private getOpenRect;
}
export {};
