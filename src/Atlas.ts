type Rect = {
    x: number,
    y: number,
    width: number,
    height: number
}

export default class Atlas {
    private mappedRects: {[id: string]: Rect } = {};
    private maxAtlasWidth: number;
    private maxAtlasHeight: number;
    private expectedMinTextureLength: number;
    private openRects: Array<Rect>;

    /**
     *
     * @param maxAtlasWidth - width of atlas textures must fit within
     * @param maxAtlasHeight - height of atlas textures must fit within
     * @param minTextureLength - min length of what expected textures should be, uses this to decide
     *                          if the split rects should be added to the open rects array.
     */
    constructor(maxAtlasWidth, maxAtlasHeight, expectedMinTextureLength) {
        this.expectedMinTextureLength = expectedMinTextureLength;
        this.maxAtlasWidth = maxAtlasWidth;
        this.maxAtlasHeight = maxAtlasHeight;
        this.openRects = [{ x: 0, y: 0, width: this.maxAtlasWidth, height: this.maxAtlasHeight}];
    }

    public reset() {
        this.openRects = [{ x: 0, y: 0, width: this.maxAtlasWidth, height: this.maxAtlasHeight}];
        this.mappedRects = {};
    }

    public hasOpenRects() {
        return this.openRects.length > 0;
    }

    public addRect(id, width, height) {
        if(this.openRects.length === 0) {
            return false;
        }
        if(id in this.mappedRects) {
            throw new Error('Id already mapped')
        }

        let data = this.getOpenRect(width, height);

        // if there was no open rects we return false
        if(!(data.found)) return false;

        const { rect, index, rotated } = data;
        const {x, y} = rect;
        this.divideRectAndUpdateOpenRects(index, width, height);
        const mappedRect = { x, y, width, height };
        this.mappedRects[id] = mappedRect;
        return mappedRect;
    }

    /**
     * Gets the rect at a given index and divides it after inserting
     * the smaller rect at the top left position of it. Then updates the openRects list
     * by removing the original large rect and adding the split rects if they are large enough
     * @param lgRectIndex
     * @param smRect
     */
    private divideRectAndUpdateOpenRects(lgRectIndex: number, smRectWidth: number, smRectHeight: number) {
        // get reference then delete it since itll be split
        const lgRect = this.openRects[lgRectIndex];
        this.openRects.splice(lgRectIndex, 1);

        let newRects = [];
        if(lgRect.width > smRectWidth) {
            let x = lgRect.x + smRectWidth;
            let y = lgRect.y;
            let width = lgRect.width - smRectWidth;
            let height = smRectHeight;
            if(width >= this.expectedMinTextureLength && height >= this.expectedMinTextureLength) {
                this.openRects.push({ x, y, width, height})
            }
        }

        if(lgRect.height > smRectHeight) {
            let x = lgRect.x;
            let y = lgRect.y + smRectHeight;
            let width = lgRect.width;
            let height = lgRect.height - smRectHeight;
            if(width >= this.expectedMinTextureLength && height >= this.expectedMinTextureLength) {
                this.openRects.push({ x, y, width, height})
            }
        }
        return newRects;
    }

    /**
     * Iterates through available rects inside the atlas to find
     * where the first one fits.
     * @param width
     * @param height
     */
    private getOpenRect(width, height) : { found: boolean, rect?: Rect, index?: number, rotated?: boolean } {
        let len = this.openRects.length;
        while(len--) {
            let rect = this.openRects[len];
            if(width <= rect.width && height <= rect.height){
                return { found: true, rect, index: len, rotated: false }
            } else if (width <= rect.height && height <= rect.width) {
                //    return { rect, index, rotated: true }
            }
        }
        return { found: false };
    }
}