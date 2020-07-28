/* eslint-disable */

import {
    isArray,
    isArrayLike,
    isObject,
    isObjectLike,
    isPureObject,
    isTypedArray,
} from "./index.js";

describe("is/object", () => {
    /** @test {isEmpty} */
    it("isEmpty", () => {
        expect(isEmpty("")).toBe(true);
        expect(isEmpty("c")).toBe(false);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(["not empty"])).toBe(false);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ prop: "not empty" })).toBe(false);
        expect(isEmpty(true)).toBe(false);
        expect(isEmpty(0)).toBe(false);
    });
    /** @test {isArray} */
    it("isArray", () => {
        expect(isArray([])).toBe(true);
        expect(isArray("isArrayLike")).toBe(false);
        expect(isArray({ length: 0 })).toBe(false);
    });
    /** @test {isTypedArray} */
    it("isTypedArray", () => {
        expect(isTypedArray([])).toBe(false);
    });
    /** @test {isArrayLike} */
    it("isArrayLike", () => {
        expect(isArrayLike([])).toBe(true);
        expect(isArrayLike("isArrayLike")).toBe(true);
        expect(isArrayLike({ length: 0 })).toBe(true);
        expect(isArrayLike(()=>{})).toBe(false);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike(null)).toBe(false);
    });
    /** @test {isObject} */
    it("isObject", () => {
        expect(isObject({})).toBe(true);
        expect(isObject(Object(""))).toBe(true);
        expect(isObject(new Object)).toBe(true);
        expect(isObject(new Array)).toBe(true);
        expect(isObject(new Boolean)).toBe(true);
        expect(isObject(null)).toBe(false);
    });
    /** @test {isObjectLike} */
    it("isObjectLike", () => {
        expect(isObjectLike({})).toBe(true);
        expect(isObjectLike(()=>{})).toBe(true);
        expect(isObjectLike(null)).toBe(false);
    });
    /** @test {isPureObject} */
    it("isPureObject", () => {
        expect(isPureObject({})).toBe(true);
        expect(isPureObject([])).toBe(false);
        expect(isPureObject(new class {})).toBe(false);
        expect(isPureObject(new Boolean)).toBe(false);
    });
    // expect().toBe();
    // expect().not.toBe();
    // toEqual({})
    // toMatch
    // toBeDefined
    // toBeUndefined
    // toBeNull
    // toBeTruthy
    // toBeFalsy
    // expect([1, 2, 3]).toContain(3);
});
