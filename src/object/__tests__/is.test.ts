
import { isEmpty, isArrayLike, isIterable, isObject, isPureObject } from "../is";

describe("is", () => {
    test("isArrayLike", () => {
        expect(isArrayLike([])).toBeTruthy();
        expect(isArrayLike("isArrayLike")).toBeTruthy();
        expect(isArrayLike({ length: 0 })).toBeTruthy();
        expect(isArrayLike({ length: -1 })).toBeFalsy();
        expect(isArrayLike({})).toBeFalsy();
        expect(isArrayLike(() => { /* noop */ })).toBeFalsy();
        expect(isArrayLike(null)).toBeFalsy();
    });
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
    test("isIterable", () => {
        expect(isIterable("")).toBeTruthy();
        expect(isIterable([])).toBeTruthy();
        expect(isIterable({ [Symbol.iterator]() {} })).toBeTruthy();
        expect(isIterable({ [Symbol.iterator]: null })).toBeFalsy();
        expect(isIterable(0)).toBeFalsy();
        expect(isIterable(null)).toBeFalsy();
    });
    test("isObject", () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject([])).toBeTruthy();
        expect(isObject(Object(""))).toBeTruthy();
        expect(isObject(() => { /* noop */ })).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
    });
    test("isPureObject", () => {
        expect(isPureObject({})).toBeTruthy();
        expect(isPureObject(new class {})).toBeFalsy();
    });
});
