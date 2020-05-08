/* eslint-disable */
// test code.

import * as is from "../../../src/utility/is/index.js";

/** @test {utility} */
describe("util/is", ()=>{
    /** @test {isUndefined} */
    it("isUndefined", ()=>{
        expect(is.isUndefined(void 0)).toBe(true);
        expect(is.isUndefined(null)).toBe(false);
    });
    /** @test {isNull} */
    it("isNull", ()=>{
        expect(is.isNull(null)).toBe(true);
        expect(is.isNull(void 0)).toBe(false);
        expect(is.isNull([])).toBe(false);
    });
    /** @test {isNullable} */
    it("isNullable", ()=>{
        expect(is.isNullable(null)).toBe(true);
        expect(is.isNullable(void 0)).toBe(true);
        expect(is.isNullable([])).toBe(false);
    });
    /** @test {isBoolean} */
    it("isBoolean", ()=>{
        expect(is.isBoolean(new Boolean)).toBe(true);
        expect(is.isBoolean(true)).toBe(true);
        expect(is.isBoolean(false)).toBe(true);
        expect(is.isBoolean(0)).toBe(false);
    });
    /** @test {isString} */
    it("isString", ()=>{
        expect(is.isString("hogehoge")).toBe(true);
        expect(is.isString(new String)).toBe(true);
        expect(is.isString(1)).toBe(false);
    });
    /** @test {isNumber} */
    it("isNumber", ()=>{
        expect(is.isNumber(1)).toBe(true);
        expect(is.isNumber(128.128)).toBe(true);
        expect(is.isNumber(new Number())).toBe(true);
        expect(is.isNumber("1")).toBe(false);
    });
    /** @test {isSymbol} */
    it("isSymbol", ()=>{
        expect(is.isSymbol(Symbol("hogehoge"))).toBe(true);
        expect(is.isSymbol("1")).toBe(false);
    });
    /** @test {isFunction} */
    it("isFunction", ()=>{
        expect(is.isFunction(()=>{})).toBe(true);
        expect(is.isFunction("1")).toBe(false);
    });
    /** @test {isObject} */
    it("isObject", ()=>{
        expect(is.isObject(new Object)).toBe(true);
        expect(is.isObject(new Array)).toBe(true);
        expect(is.isObject(new Boolean)).toBe(true);
        expect(is.isObject(Object(""))).toBe(true);
        expect(is.isObject(null)).toBe(false);
    });
    /** @test {null} */
    it("", ()=>{});
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
