/* eslint-disable */

import { equals, equalsType } from "./equals.js";

/** @test {util} */
describe("util/is", ()=>{
    /** @test {equals} */
    it("equals", ()=>{
        expect(equals(NaN, NaN)).toBe(true);
        expect(equals(0, -0)).toBe(true);
        expect(equals(0, 0, 1)).toBe(false);
    });
    /** @test {equalsType} */
    it("equalsType", ()=>{
        expect(equalsType(NaN, -Infinity, 0)).toBe(true);
        expect(equalsType([], {})).toBe(false);
    });
});
