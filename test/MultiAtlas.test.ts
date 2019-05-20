import { expect } from 'chai';
import { MultiAtlas } from '../src';

describe('Atlas class', () => {
    let atlas;
    beforeEach('Constructs a new 100x100 multi atlas with an expected min texture length of 10', () => {
        atlas = new MultiAtlas(100, 100, 10);
    });
    describe('MultiAtlas.addRect', () => {
        it('Adds 100 10x10 rects all to the one initial atlas and then removes it from available since its full', () => {
            for(let i = 0; i < 100; i++) {
                const { atlasIndex, rect } = atlas.addRect(i, 10, 10);
                expect(atlasIndex).to.equal(0);
            }
            expect(atlas.availableAtlasses.length).to.equal(0);
        });
        it('fills wit 100 10x10 and then the next one gets added to a new atlas and there should be two atlasses now', () => {
            for(let i = 0; i < 100; i++) {
                const { atlasIndex, rect } = atlas.addRect(i, 10, 10);
                expect(atlasIndex).to.equal(0);
            }
            expect(atlas.availableAtlasses.length).to.equal(0);
            expect(atlas.atlasses.length).to.equal(1);

            const { atlasIndex, rect } = atlas.addRect(100, 10, 10);
            expect(atlasIndex).to.equal(1);
            expect(atlas.availableAtlasses.length).to.equal(1);
            expect(atlas.atlasses.length).to.equal(2);
        });
    })
})