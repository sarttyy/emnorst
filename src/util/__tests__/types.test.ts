import { assert } from "../types";

describe("assert", () => {
    test("as", () => {
        // @ts-expect-error
        expect(() => { assert.as(); }).toThrow();
        expect(() => { assert.as(undefined); }).not.toThrow();
    });
    test("nonNullable", () => {
        expect(() => { assert.nonNullable(null); }).toThrow();
        expect(() => { assert.nonNullable(undefined); }).toThrow();
        expect(() => { assert.nonNullable(""); }).not.toThrow();
    });
});
