
import { isEmpty, isArrayLike, isObject, isPureObject } from "../is";

describe("is", () => {
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
    test("isArrayLike", () => {
        expect(isArrayLike([])).toBeTruthy();
        expect(isArrayLike("isArrayLike")).toBeTruthy();
        expect(isArrayLike({ length: 0 })).toBeTruthy();
        expect(isArrayLike({ length: -1 })).toBeFalsy();
        expect(isArrayLike({})).toBeFalsy();
        expect(isArrayLike(() => { /* noop */ })).toBeFalsy();
        expect(isArrayLike(null)).toBeFalsy();
    });
    test("isObject", () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject([])).toBeTruthy();
        expect(isObject(Object(""))).toBeTruthy();
        expect(isObject(null)).toBeFalsy();
    });
    test("isPureObject", () => {
        expect(isPureObject({})).toBeTruthy();
        expect(isPureObject(new class {})).toBeFalsy();
    });
});
