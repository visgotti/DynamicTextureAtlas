import { expect } from 'chai';
import { Atlas } from '../src';

describe('Atlas class', () => {
    let atlas;
    beforeEach('Constructs a new 100x100 atlas with an expected min texture length of 10', () => {
        atlas = new Atlas(100, 100, 10);
        // should initially have the only open rect be based on the width/height of atlas
        expect(atlas.openRects.length).to.equal(1);
        expect(atlas.openRects).to.deep.equal([{ x: 0, y: 0, width: 100, height: 100 }]);
    });
    describe('atlas.getOpenRect', () => {
        it('Should find the initial rect as starting width and height', () => {
            const data = atlas.getOpenRect(10, 10);
            expect(data).to.deep.equal({
                found: true,
                rect: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },
                index: 0,
                rotated: false,
            })
        });
        it('Should find not find an initial rect since the dimensions are greater than starting atlas size', () => {
            const data = atlas.getOpenRect(101, 1);
            expect(data).to.deep.equal({ found: false })
        })
    });
    describe('atlas.divideRectAndUpdateOpenRect', () => {
        it('Should divide 100x100 into a 90x10 and a 100x90 when inserting a 10x10 at proper positions', () => {
            atlas.divideRectAndUpdateOpenRects(0, 10, 10);
            expect(atlas.openRects.length).to.equal(2);
            expect(atlas.openRects).to.deep.include({ x: 10, y: 0, width: 90, height: 10 });
            expect(atlas.openRects).to.deep.include({ x: 0, y: 10, width: 100, height: 90 });
        });
        it('Should divide with the 10x10 and then a 20x20', () => {
            atlas.divideRectAndUpdateOpenRects(0, 10, 10);
            expect(atlas.openRects.length).to.equal(2);
            atlas.divideRectAndUpdateOpenRects(1, 20, 20);
            expect(atlas.openRects.length).to.equal(3);
            // should still have the 90x10 one since 20x20 doesnt fit
            expect(atlas.openRects).to.deep.include({ x: 10, y: 0, width: 90, height: 10 });

            // then the 100x90 one should have been split
            expect(atlas.openRects).to.deep.include({ x: 20, y: 10, width: 80, height: 20 });
            expect(atlas.openRects).to.deep.include({ x: 0, y: 30, width: 100, height: 70 })
        });
        it('should divide with a 91x91 which should clear the openRects array since the expectedMinTextureLength wont fit', () => {
            atlas.divideRectAndUpdateOpenRects(0, 91, 91);
            expect(atlas.openRects.length).to.equal(0);
        })
    });
    describe('atlas.addRect', () => {
        it('should add a 10x10 rect at top left position', () => {
            const rect = atlas.addRect(0, 10, 10);
            expect(rect).to.deep.equal({ x: 0, y: 0, width: 10, height: 10 })
        });
        it('should add a 10x10 rect then another 10x10 below it', () => {
            atlas.addRect(0, 10, 10);
            const rect = atlas.addRect(1, 10, 10);
            expect(rect).to.deep.equal({ x: 0, y: 10, width: 10, height: 10 })
        });
        it('should return false if it doesnt fit anywhere', () => {
            expect(atlas.addRect(0, 101, 10)).to.equal(false);
        });
        it('should fill up with 100 10x10s and then return false', () => {
            for(let i = 0; i < 100; i++) {
                // should be able to add all of these
                const rect = atlas.addRect(i, 10, 10);
                expect(rect).to.not.equal(false);
            }
            // now should be false
            expect(atlas.addRect(100, 1, 1)).to.equal(false);
            // should have no open rects
            expect(atlas.openRects.length).to.equal(0);
        });
    });
})