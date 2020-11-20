
const {
    equals,
    isBoolean,
    isPrimitive,
    isFunction,
    isNullLike,
    isNull,
    isDefined,
    isUndefined,
} = require("../../dist/emnorst.cjs.js");

describe("util/is", () => {
    /** @test {equals} */
    test("equals", () => {
        expect(equals(NaN, NaN)).toBe(true);
        expect(equals(0, -0)).toBe(true);
        expect(equals(0, 0, 1)).toBe(false);
    });
    test("isBoolean", () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(new Boolean(true))).toBe(true);
        expect(isBoolean(new Boolean(false))).toBe(true);
        expect(isBoolean("true")).toBe(false);
    });
    /** @test {isPrimitive} */
    test("isPrimitive", () => {
        expect(isPrimitive("")).toBe(true);
        expect(isPrimitive(new String)).toBe(false);

        expect(isPrimitive(0)).toBe(true);
        expect(isPrimitive(new Number)).toBe(false);

        expect(isPrimitive(false)).toBe(true);
        expect(isPrimitive(new Boolean)).toBe(false);

        expect(isPrimitive(Symbol(""))).toBe(true);
        expect(isPrimitive(BigInt(1))).toBe(true);
        expect(isPrimitive(null)).toBe(true);
        expect(isPrimitive(void 0)).toBe(true);
        expect(isPrimitive({})).toBe(false);
    });
    /** @test {isFunction} */
    test.skip("isFunction", () => {
        expect(isFunction(() => {})).toBe(true);
        expect(isFunction(function*() {})).toBe(true);
        expect(isFunction("1")).toBe(false);
    });
    describe.skip("null-like", () => {
        /** @test {isNullLike} */
        test("isNullLike", () => {
            expect(isNullLike(null)).toBe(true);
            expect(isNullLike(void 0)).toBe(true);
            expect(isNullLike([])).toBe(false);
        });
        /** @test {isNull} */
        test("isNull", () => {
            expect(isNull(null)).toBe(true);
            expect(isNull(void 0)).toBe(false);
            expect(isNull([])).toBe(false);
        });
        /** @test {isDefined} */
        test("isDefined", () => {
            expect(isDefined(null)).toBe(true);
            expect(isDefined(void 0)).toBe(false);
        });
        /** @test {isUndefined} */
        test("isUndefined", () => {
            expect(isUndefined(void 0)).toBe(true);
            expect(isUndefined(null)).toBe(false);
        });
    });
});