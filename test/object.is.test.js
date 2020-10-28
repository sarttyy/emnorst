
const {
    isEmpty,
    isMatch,
    isEquals,
    isSorted,
    isIterable,
    isArray,
    isTypedArray,
    isArrayLike,
    isObject,
    isObjectLike,
    isPureObject,
} = require("../dist/emnorst.cjs.js");

describe("is/object", () => {
    /** @test {isEmpty} */
    test("isEmpty", () => {
        expect(isEmpty("")).toBe(true);
        expect(isEmpty("c")).toBe(false);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(["not empty"])).toBe(false);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ prop: "not empty" })).toBe(false);
        expect(isEmpty(true)).toBe(false);
        expect(isEmpty(0)).toBe(false);
    });
    test.skip("isMatch", () => {
        expect(isMatch({}, {})).toBe(true);
        expect(isMatch({}, {})).toBe(false);
    });
    test.skip("isEquals", () => {
        expect(isEquals({}, {})).toBe(true);
        expect(isEquals({}, {})).toBe(false);
    });
    test("isSorted", () => {
        const comparator = (l, r) => l > r;
        expect(isSorted([1,2,3], comparator)).toBe(true);
        expect(isSorted([1,3,2], comparator)).toBe(false);
    });
    test("isIterable", () => {
        expect(isIterable("")).toBe(true);
        expect(isIterable([])).toBe(true);
        expect(isIterable(new Map)).toBe(true);
        expect(isIterable({
            [Symbol.iterator]() {}
        })).toBe(true);
        expect(isIterable({})).toBe(false);
        expect(isIterable(0)).toBe(false);
    });
    /** @test {isArray} */
    test("isArray", () => {
        expect(isArray([])).toBe(true);
        expect(isArray("isArrayLike")).toBe(false);
        expect(isArray({ length: 0 })).toBe(false);
    });
    /** @test {isTypedArray} */
    test("isTypedArray", () => {
        expect(isTypedArray([])).toBe(false);
    });
    /** @test {isArrayLike} */
    test("isArrayLike", () => {
        expect(isArrayLike([])).toBe(true);
        expect(isArrayLike("isArrayLike")).toBe(true);
        expect(isArrayLike({ length: 0 })).toBe(true);
        expect(isArrayLike(() => {})).toBe(false);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike(null)).toBe(false);
    });
    /** @test {isObject} */
    test("isObject", () => {
        expect(isObject({})).toBe(true);
        expect(isObject(Object(""))).toBe(true);
        expect(isObject(new Object)).toBe(true);
        expect(isObject(new Array)).toBe(true);
        expect(isObject(new Boolean)).toBe(true);
        expect(isObject(null)).toBe(false);
    });
    /** @test {isObjectLike} */
    test("isObjectLike", () => {
        expect(isObjectLike({})).toBe(true);
        expect(isObjectLike(() => {})).toBe(true);
        expect(isObjectLike(null)).toBe(false);
    });
    /** @test {isPureObject} */
    test("isPureObject", () => {
        expect(isPureObject({})).toBe(true);
        expect(isPureObject([])).toBe(false);
        expect(isPureObject(new class {})).toBe(false);
        expect(isPureObject(new Boolean)).toBe(false);
    });
});
