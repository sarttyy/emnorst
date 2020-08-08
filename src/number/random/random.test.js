/* eslint-disable */

import { xorshift, random, randomStr, probability } from "./index.js";

/** @test {object} */
describe("util/string/hash", () => {
    /** @test {xorshift} */
    it("xorshift", () => {
        xorshift(0, Infinity, 0xf0f0f0f0);
        const _ = [];
        for(let i = 10;i--;)
            _.push(xorshift());
        expect(_).toEqual([
            23689578, 111038900, 1465436192, 969043763, 1900776159,
            897313495, 549278009, 1331655798, 1402936162, 243335963,
        ]);
        expect(xorshift(10, 1)).toBe(2);
        expect(xorshift(1, 1)).toBe(1);
    });
    /** @test {random} */
    it("random", () => {
        xorshift(0, Infinity, 0xf0f0f0f0);
        const _ = [];
        for(let i = 10;i--;)
            _.push(random());
        expect(_).toEqual([
            0.011031319392393957, 0.051706517139313055,
            0.6823969034861759, 0.45124616634624365,
            0.8851178730303039, 0.4178441573948805,
            0.25577750487987766, 0.6201005529705903,
            0.6532930590460511, 0.11331213783161348,
        ]);
        expect(random(10, 1)).toBe(4.162825157010381);
        expect(random(1, 1)).toBe(1);
    });
    /** @test {randomStr} */
    it("randomStr", () => {
        xorshift(0, Infinity, 0xf0f0f0f0);
        expect(randomStr()).toBe("zu1u3y5w");
    });
    /** @test {probability} */
    it("probability", () => {
        xorshift(0, Infinity, 0xf0f0f0f0);
        expect(probability()).toBe(true);
        expect(probability()).toBe(true);
        expect(probability()).toBe(true);
        expect(probability()).toBe(false);
    });
});
