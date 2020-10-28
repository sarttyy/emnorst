
const {
    isString,
    isChar,
    isLowerCase,
    isUpperCase,
} = require("../../../../dist/emnorst.cjs.js");

const azAZ09 = "azAZ09";

describe("is/string", () => {
    /** @test {isString} */
    test("isString", () => {
        expect(isString("")).toBe(true);
        expect(isString("hogehoge")).toBe(true);
        expect(isString(new String)).toBe(true);
        expect(isString(1)).toBe(false);
    });
    /** @test {isChar} */
    test("isChar", () => {
        expect(isChar("c")).toBe(true);
        expect(isChar("string")).toBe(false);
        expect(isChar(["c"])).toBe(false);
    });
    /** @test {isLowerCase} */
    test("isLowerCase", () => {
        expect(isLowerCase(azAZ09)).toBe(false);
        expect(isLowerCase("()")).toBe(false);
        expect(isLowerCase("lower letter")).toBe(true);
        expect(isLowerCase("Letter")).toBe(false);
        expect(isLowerCase(null)).toBe(false);

        expect([...azAZ09].map(isLowerCase)).toEqual([true, true, false, false, false, false]);
    });
    /** @test {isUpperCase} */
    test("isUpperCase", () => {
        expect(isUpperCase(azAZ09)).toBe(false);
        expect(isUpperCase("()")).toBe(false);
        expect(isUpperCase("UPPER LETTER")).toBe(true);
        expect(isUpperCase("Letter")).toBe(false);
        expect(isUpperCase(null)).toBe(false);

        expect([...azAZ09].map(isUpperCase)).toEqual([false, false, true, true, false, false]);
    });
});
