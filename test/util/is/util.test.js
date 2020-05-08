/* eslint-disable */

import * as is from "../../../src/utility/is/index.js";

/** @test {utility} */
describe("util/is", ()=>{
    /** @test {isChar} */
    it("isChar", ()=>{
        expect(is.isChar("c")).toBe(true);
        expect(is.isChar("test")).toBe(false);
    });
    /** @test {isIteratorResult} */
    it("isIteratorResult", ()=>{
        expect(is.isNull(null)).toBe(true);
        expect(is.isNull(void 0)).toBe(false);
        expect(is.isNull([])).toBe(false);
    });
    /** @test {isIterator} */
    it("isIterator", ()=>{
        expect(is.isNullable(null)).toBe(true);
        expect(is.isNullable(void 0)).toBe(true);
        expect(is.isNullable([])).toBe(false);
    });
    /** @test {isIterable} */
    it("isIterable", ()=>{
        expect(is.isBoolean(new Boolean)).toBe(true);
        expect(is.isBoolean(true)).toBe(true);
        expect(is.isBoolean(false)).toBe(true);
        expect(is.isBoolean(0)).toBe(false);
    });
    /** @test {isArrayLike} */
    it("isArrayLike", ()=>{
        expect(is.isArrayLike([])).toBe(true);
        expect(is.isArrayLike("isArrayLike")).toBe(true);
        expect(is.isArrayLike({length: 0})).toBe(true);
        expect(is.isArrayLike({})).toBe(false);
    });
    /** @test {isEmpty} */
    it("isEmpty", ()=>{
        expect(is.isEmpty("")).toBe(true);
        expect(is.isEmpty("c")).toBe(false);
        expect(is.isEmpty([])).toBe(true);
        expect(is.isEmpty(["not empty"])).toBe(false);
        expect(is.isEmpty({})).toBe(true);
        expect(is.isEmpty({prop: "not empty"})).totoBe(false);
    });
    /** @test {isThrowError} */
    it("isThrowError", ()=>{
        expect(is.isThrowError("not function")).toBe(false);
        expect(is.isThrowError(()=>{})).toBe(false);
        expect(is.isThrowError(()=>{
            throw new Error("the error");
        })).toBe(true);
    });
});
