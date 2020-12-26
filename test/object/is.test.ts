
import {
    isEmpty,
    // isMatch,
    // isEquals,
    isSorted,
    isIterable,
    isArray,
    isTypedArray,
    isArrayLike,
    isObject,
    isObjectLike,
    isPureObject,
} from "../emnorst.import";

describe("is/object", () => {
    /** @test {isEmpty} */
    test("isEmpty", () => {
        expect(isEmpty("")).toBeTruthy();
        expect(isEmpty("c")).toBeFalsy();
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty(["not empty"])).toBeFalsy();
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty({ prop: "not empty" })).toBeFalsy();
        expect(isEmpty(true)).toBeFalsy();
        expect(isEmpty(0)).toBeFalsy();
    });
    test.skip("isMatch", () => {
        let isMatch: any;
        expect(isMatch({}, {})).toBeTruthy();
        expect(isMatch({}, {})).toBeFalsy();
    });
    test.skip("isEquals", () => {
        let isEquals: any;
        expect(isEquals({}, {})).toBeTruthy();
        expect(isEquals({}, {})).toBeFalsy();
    });
    test("isSorted", () => {
        const comparator = (l: number, r: number) => l > r;
        expect(isSorted([1, 2, 3], comparator)).toBeTruthy();
        expect(isSorted([1, 3, 2], comparator)).toBeFalsy();
    });
    test("isIterable", () => {
        expect(isIterable("")).toBeTruthy();
        expect(isIterable([])).toBeTruthy();
        expect(isIterable(new Map)).toBeTruthy();
        expect(isIterable({
            [Symbol.iterator]() { /* noop */ }
        })).toBeTruthy();
        expect(isIterable({})).toBeFalsy();
        expect(isIterable(0)).toBeFalsy();
    });
    /** @test {isArray} */
    test("isArray", () => {
        expect(isArray([])).toBeTruthy();
        expect(isArray("isArrayLike")).toBeFalsy();
        expect(isArray({ length: 0 })).toBeFalsy();
    });
    /** @test {isTypedArray} */
    test("isTypedArray", () => {
        expect(isTypedArray([])).toBeFalsy();
    });
    /** @test {isArrayLike} */
    test("isArrayLike", () => {
        expect(isArrayLike([])).toBeTruthy();
        expect(isArrayLike("isArrayLike")).toBeTruthy();
        expect(isArrayLike({ length: 0 })).toBeTruthy();
        expect(isArrayLike(() => { /* noop */ })).toBeFalsy();
        expect(isArrayLike({})).toBeFalsy();
        expect(isArrayLike(null)).toBeFalsy();
    });
    /** @test {isObject} */
    test("isObject", () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject(Object(""))).toBeTruthy();
        expect(isObject({})).toBeTruthy();
        expect(isObject([])).toBeTruthy();
        expect(isObject(new Boolean)).toBeTruthy();
        expect(isObject(null)).toBeFalsy();
    });
    /** @test {isObjectLike} */
    test("isObjectLike", () => {
        expect(isObjectLike({})).toBeTruthy();
        expect(isObjectLike(() => { /* noop */ })).toBeTruthy();
        expect(isObjectLike(null)).toBeFalsy();
    });
    /** @test {isPureObject} */
    test("isPureObject", () => {
        expect(isPureObject({})).toBeTruthy();
        expect(isPureObject([])).toBeFalsy();
        expect(isPureObject(new class {})).toBeFalsy();
        expect(isPureObject(new Boolean)).toBeFalsy();
    });
});
