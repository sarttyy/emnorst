/* eslint-disable */

import {
    isFunction,
    isIterable,
    isNullLike,
    isNull,
    isDefined,
    isUndefined,
    isPrimitive,
} from "./index.js";

describe("is/other", () => {
    /** @test {isFunction} */
    it("isFunction", () => {
        expect(isFunction(()=>{})).toBe(true);
        expect(isFunction("1")).toBe(false);
    });
    /** @test {isIterable} */
    it("isIterable", () => {
        expect(isIterable([])).toBe(true);
        expect(isIterable({})).toBe(false);
    });
    describe("null-like", () => {
        /** @test {isNullLike} */
        it("isNullLike", () => {
            expect(isNullLike(null)).toBe(true);
            expect(isNullLike(void 0)).toBe(true);
            expect(isNullLike([])).toBe(false);
        });
        /** @test {isNull} */
        it("isNull", () => {
            expect(isNull(null)).toBe(true);
            expect(isNull(void 0)).toBe(false);
            expect(isNull([])).toBe(false);
        });
        /** @test {isDefined} */
        it("isDefined", () => {
            expect(isDefined(null)).toBe(true);
            expect(isDefined(void 0)).toBe(false);
        });
        /** @test {isUndefined} */
        it("isUndefined", () => {
            expect(isUndefined(void 0)).toBe(true);
            expect(isUndefined(null)).toBe(false);
        });
    });
    /** @test {isPrimitive} */
    it("isPrimitive", () => {
        expect(isPrimitive("")).toBe(true);
        expect(isPrimitive(new String)).toBe(false);

        expect(isPrimitive(0)).toBe(true);
        expect(isPrimitive(new Number)).toBe(false);

        expect(isPrimitive(false)).toBe(true);
        expect(isPrimitive(new Boolean)).toBe(false);

        expect(isPrimitive(Symbol(""))).toBe(true);
        expect(isPrimitive(BigInt(1))).toBe(true);
        expect(isPrimitive(null)).toBe(true);
        expect(isPrimitive(void 0)).toBe(true);
        expect(isPrimitive({})).toBe(false);
    });
});