/* eslint-disable */

import { isChar, isIteratorResult, isIterable, isArrayLike, isEmpty, isThrowError } from "./util.js";

/** @test {util} */
describe("util/is", ()=>{
    /** @test {isChar} */
    it("isChar", ()=>{
        expect(isChar("c")).toBe(true);
        expect(isChar("test")).toBe(false);
    });
    /** @test {isIteratorResult} */
    it("isIteratorResult", ()=>{
        expect(isIteratorResult({ value: 1 })).toBe(true);
        expect(isIteratorResult({ done: true })).toBe(true);
        expect(isIteratorResult({})).toBe(false);
    });
    /** @test {isIterable} */
    it("isIterable", ()=>{
        expect(isIterable([])).toBe(true);
        expect(isIterable({})).toBe(false);
    });
    /** @test {isArrayLike} */
    it("isArrayLike", ()=>{
        expect(isArrayLike([])).toBe(true);
        expect(isArrayLike("isArrayLike")).toBe(true);
        expect(isArrayLike({ length: 0 })).toBe(true);
        expect(isArrayLike(()=>{})).toBe(false);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike(null)).toBe(false);
    });
    /** @test {isEmpty} */
    it("isEmpty", ()=>{
        expect(isEmpty("")).toBe(true);
        expect(isEmpty("c")).toBe(false);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(["not empty"])).toBe(false);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ prop: "not empty" })).toBe(false);
        expect(isEmpty(true)).toBe(false);
    });
    /** @test {isThrowError} */
    it("isThrowError", ()=>{
        expect(isThrowError("not function")).toBe(false);
        expect(isThrowError(()=>{})).toBe(false);
        expect(isThrowError(()=>{
            throw new Error("the error");
        })).toBe(true);
    });
});
