Look at examples and tests for usages and how the algorithm works.

Basically I wanted to create something that can pack textures
extremely quickly. I know the packing algorithm is not very optimal 
in terms of memory/storage space, but the trade off allows us to pack 
new textures extremely quickly. 

    var atlas = new DTA.Atlas(atlasWidth, atlasHeight, expectedMinLength);

or 

    var multiAtlas = new DTA.MultiAtlas(atlasWidth, atlasHeight, expectedMinLength);


Brief usage - 


    var rect = atlas.addRect(id, w, h)
    // rect is either false if there was no room
    // or has the x, y, width, and height of the rect
    
    var data = multiAtlas.addRect(id, w, h)
    // data returns the rect and atlas index 
    // it will create a new atlas if it doesnt fit
    // on any of the already existing ones

It can be optimized I'm sure of it, and it will but what 
is important is keeping the atlas immutable. Once you pack 
in a texture, the position will not change. This will be a huge
performance boost when rendering sprites to a PIXI.RenderTexture,
since all it will need to do is draw
the new texture at the given position on the RenderTexture
while the rest of the RenderTexture remains exactly the same.


Added RenderedAtlas 

Keeps track of new textures mapped to the atlas

Usage - 
    
    const renderer = PIXI.autoDetectRenderer({});
    const atlas = new RenderedAtlas(renderer, atlasWidth, atlasHeight, expectedMinLength)
    const sprite = new PIXI.Sprite(texture);
    const mappedTexture = atlas.addSprite(textureId, sprite);
    sprite.texture = mappedTexture;