/* eslint-disable */

import {
    isString,
    isChar,
    isLowerLetter,
    isUpperLetter,
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
    /** @test {isLowerLetter} */
    it("isLowerLetter", () => {
        const expectData1 = [...letter].map(isLowerLetter);
        expect(expectData1).toEqual([ ...true26, ...false26, ...false10]);
        const expectData2 = [...letter].map(charCodeAt).map(isLowerLetter);
        expect(expectData2).toEqual([ ...true26, ...false26, ...false10]);
    });
    /** @test {isUpperLetter} */
    it("isUpperLetter", () => {
        const expectData1 = [...letter].map(isUpperLetter);
        expect(expectData1).toEqual([ ...false26, ...true26, ...false10]);
        const expectData2 = [...letter].map(charCodeAt).map(isUpperLetter);
        expect(expectData2).toEqual([ ...false26, ...true26, ...false10]);
    });
});
