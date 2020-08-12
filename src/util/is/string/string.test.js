/* eslint-disable */

import {
    isString,
    isChar,
    isLowerCase,
    isUpperCase,
} from "./index.js";

const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const false26 = new Array(26).fill(false);
const true26 = new Array(26).fill(true);
const false10 = new Array(10).fill(false);
const charCodeAt = (char) => char.charCodeAt();

describe("is/string", () => {
    /** @test {isString} */
    it("isString", () => {
        expect(isString("")).toBe(true);
        expect(isString("hogehoge")).toBe(true);
        expect(isString(new String)).toBe(true);
        expect(isString(1)).toBe(false);
    });
    /** @test {isChar} */
    it("isChar", () => {
        expect(isChar("c")).toBe(true);
        expect(isChar("test")).toBe(false);
        expect(isChar(["c"])).toBe(false);
    });
    /** @test {isLowerCase} */
    it("isLowerCase", () => {
        expect(isLowerCase(letter)).toBe(false);
        expect(isLowerCase("()")).toBe(false);
        expect(isLowerCase("lower letter")).toBe(true);
        expect(isLowerCase("Letter")).toBe(false);
        expect(isLowerCase(null)).toBe(false);

        const expectData1 = [...letter].map(isLowerCase);
        expect(expectData1).toEqual([ ...true26, ...false26, ...false10]);
        // const expectData2 = [...letter].map(charCodeAt).map(isLowerCase);
        // expect(expectData2).toEqual([ ...true26, ...false26, ...false10]);
    });
    /** @test {isUpperCase} */
    it("isUpperCase", () => {
        expect(isUpperCase(letter)).toBe(false);
        expect(isUpperCase("()")).toBe(false);
        expect(isUpperCase("UPPER LETTER")).toBe(true);
        expect(isUpperCase("Letter")).toBe(false);
        expect(isUpperCase(null)).toBe(false);

        const expectData1 = [...letter].map(isUpperCase);
        expect(expectData1).toEqual([ ...false26, ...true26, ...false10]);
        // const expectData2 = [...letter].map(charCodeAt).map(isUpperCase);
        // expect(expectData2).toEqual([ ...false26, ...true26, ...false10]);
    });
});
