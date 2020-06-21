/* eslint-disable */

import { isDefined, isUndefined, isNull, isNullLike, isBoolean, isString, isNumber, isSymbol, isFunction, isObject, isObjectLike, isPureObject, isPrimitive, isArguments, isRegExp, isError } from "./type.js";

/** @test {utility} */
describe("util/is", ()=>{
    /** @test {isDefined} */
    it("isDefined", ()=>{
        expect(isDefined(null)).toBe(true);
        expect(isDefined(void 0)).toBe(false);
    });
    /** @test {isUndefined} */
    it("isUndefined", ()=>{
        expect(isUndefined(void 0)).toBe(true);
        expect(isUndefined(null)).toBe(false);
    });
    /** @test {isNull} */
    it("isNull", ()=>{
        expect(isNull(null)).toBe(true);
        expect(isNull(void 0)).toBe(false);
        expect(isNull([])).toBe(false);
    });
    /** @test {isNullable} */
    it("isNullable", ()=>{
        expect(isNullLike(null)).toBe(true);
        expect(isNullLike(void 0)).toBe(true);
        expect(isNullLike([])).toBe(false);
    });
    /** @test {isBoolean} */
    it("isBoolean", ()=>{
        expect(isBoolean(new Boolean)).toBe(true);
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(0)).toBe(false);
    });
    /** @test {isString} */
    it("isString", ()=>{
        expect(isString("hogehoge")).toBe(true);
        expect(isString(new String)).toBe(true);
        expect(isString(1)).toBe(false);
    });
    /** @test {isNumber} */
    it("isNumber", ()=>{
        expect(isNumber(1)).toBe(true);
        expect(isNumber(128.128)).toBe(true);
        expect(isNumber(new Number())).toBe(true);
        expect(isNumber("1")).toBe(false);
    });
    /** @test {isSymbol} */
    it("isSymbol", ()=>{
        expect(isSymbol(Symbol("hogehoge"))).toBe(true);
        expect(isSymbol("1")).toBe(false);
    });
    /** @test {isFunction} */
    it("isFunction", ()=>{
        expect(isFunction(()=>{})).toBe(true);
        expect(isFunction("1")).toBe(false);
    });
    /** @test {isObject} */
    it("isObject", ()=>{
        expect(isObject(new Object)).toBe(true);
        expect(isObject(new Array)).toBe(true);
        expect(isObject(new Boolean)).toBe(true);
        expect(isObject(Object(""))).toBe(true);
        expect(isObject(null)).toBe(false);
    });
    /** @test {null} */
    it("isObjectLike", ()=>{
        expect(isObjectLike({})).toBe(true);
        expect(isObjectLike(()=>{})).toBe(true);
        expect(isObjectLike(null)).toBe(false);
    });
    /** @test {null} */
    it("isPureObject", ()=>{
        expect(isPureObject({})).toBe(true);
        expect(isPureObject([])).toBe(false);
        expect(isPureObject(new class {})).toBe(false);
        expect(isPureObject(new Boolean)).toBe(false);
    });
    /** @test {null} */
    it("isPrimitive", ()=>{
        expect(isPrimitive("")).toBe(true);
        expect(isPrimitive(1)).toBe(true);
        expect(isPrimitive(true)).toBe(true);
        expect(isPrimitive(Symbol(""))).toBe(true);
        expect(isPrimitive(BigInt(1))).toBe(true);
        expect(isPrimitive(null)).toBe(true);
        expect(isPrimitive(void 0)).toBe(true);
        expect(isPrimitive({})).toBe(false);
    });
    /** @test {null} */
    it("isArguments", ()=>{
        expect(isArguments((function() {
            return arguments;
        })())).toBe(true);
        expect(isArguments([])).toBe(false);
    });
    /** @test {null} */
    it("isRegExp", ()=>{
        expect(isRegExp(/./)).toBe(true);
        expect(isRegExp("/./")).toBe(false);
    });
    /** @test {null} */
    it("isError", ()=>{
        expect(isError(new Error)).toBe(true);
        expect(isError(new TypeError)).toBe(true);
        expect(isError({})).toBe(false);
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
