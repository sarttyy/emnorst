
const {
    isString,
    isChar,
} = require("../../dist/emnorst.cjs.js");

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
});
