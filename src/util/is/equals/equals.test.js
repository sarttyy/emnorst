/* eslint-disable */

import { equals, is } from "./index.js";

describe("is/equals", () => {
    /** @test {equals} */
    it("equals", () => {
        expect(equals(NaN, NaN)).toBe(true);
        expect(equals(0, -0)).toBe(true);
        expect(equals(0, 0, 1)).toBe(false);
    });
    /** @test {equalsType} */
    xit("equalsType", () => {
        expect(equalsType(NaN, -Infinity, 0)).toBe(true);
        expect(equalsType([], {})).toBe(false);
    });
    /** @test {is} */
    it("is", () => {
        expect(is(NaN, NaN)).toBe(true);
        expect(is(0, -0)).toBe(false);
    });
});
