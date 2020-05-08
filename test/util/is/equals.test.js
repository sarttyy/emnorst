/* eslint-disable */

import * as is from "../../../src/utility/is/index.js";

/** @test {utility} */
describe("util/is", ()=>{
    /** @test {equals} */
    it("equals", ()=>{
        expect(is.equals(NaN, NaN)).toBe(true);
        expect(is.equals(0, -0)).toBe(true);
        expect(is.equals(0, 0, 1)).toBe(false);
    });
    /** @test {isPositive} */
    it("equalsType", ()=>{
        expect(is.equalsType(NaN, -Infinity, 0)).toBe(true);
        expect(is.equalsType([], {})).toBe(false);
    });
});
