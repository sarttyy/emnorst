
const {
    equals,
    isBoolean,
    isPrimitive,
    isFunction,
} = require("../../dist/emnorst.cjs.js");

describe("util/is", () => {
    /** @test {equals} */
    test("equals", () => {
        expect(equals(NaN, NaN)).toBeTruthy();
        expect(equals(0, -0)).toBeTruthy();
        expect(equals(0, 0, 1)).toBeFalsy();
    });
    test("isBoolean", () => {
        expect(isBoolean(true)).toBeTruthy();
        expect(isBoolean(false)).toBeTruthy();
        expect(isBoolean(new Boolean(true))).toBeTruthy();
        expect(isBoolean(new Boolean(false))).toBeTruthy();
        expect(isBoolean("true")).toBeFalsy();
    });
    /** @test {isPrimitive} */
    test("isPrimitive", () => {
        expect(isPrimitive("")).toBeTruthy();
        expect(isPrimitive(new String)).toBeFalsy();

        expect(isPrimitive(0)).toBeTruthy();
        expect(isPrimitive(new Number)).toBeFalsy();

        expect(isPrimitive(false)).toBeTruthy();
        expect(isPrimitive(new Boolean)).toBeFalsy();

        expect(isPrimitive(Symbol(""))).toBeTruthy();
        expect(isPrimitive(BigInt(1))).toBeTruthy();
        expect(isPrimitive(null)).toBeTruthy();
        expect(isPrimitive(void 0)).toBeTruthy();
        expect(isPrimitive({})).toBeFalsy();
    });
    /** @test {isFunction} */
    test("isFunction", () => {
        expect(isFunction(() => {})).toBeTruthy();
        expect(isFunction(function*() {})).toBeTruthy();
        expect(isFunction("1")).toBeFalsy();
    });
});
