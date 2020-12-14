
const {
    isString,
    isChar,
} = require("../../dist/emnorst.cjs.js");

const azAZ09 = "azAZ09";

describe("is/string", () => {
    /** @test {isString} */
    test("isString", () => {
        expect(isString("")).toBeTruthy();
        expect(isString("hogehoge")).toBeTruthy();
        expect(isString(new String)).toBeTruthy();
        expect(isString(1)).toBeFalsy();
    });
    /** @test {isChar} */
    test("isChar", () => {
        expect(isChar("c")).toBeTruthy();
        expect(isChar("string")).toBeFalsy();
        expect(isChar(["c"])).toBeFalsy();
    });
});
