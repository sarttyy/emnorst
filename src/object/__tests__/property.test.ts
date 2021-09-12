
import { getAllKeys, getEnumerableKeys, has, toPropertyKey } from "../property";

describe("property", () => {
    test("has", () => {
        expect(has({ hoge: null }, "hoge")).toBeTruthy();
        expect(has(Object.create({ hoge: null }), "hoge")).toBeFalsy();
    });
    test("getAllKeys", () => {
        expect(getAllKeys({})).toEqual([]);
        const obj = { hoge: null };
        Object.defineProperty(obj, "huga", {});
        Object.defineProperty(obj, Symbol.for("piyo"), {});
        expect(getAllKeys(obj)).toEqual(["hoge", "huga", Symbol.for("piyo")]);
    });
    test("getEnumerableKeys", () => {
        const keys = ["hoge", "huga", Symbol("piyo")];
        const obj = Object.fromEntries(keys.map(key => [key, null]));
        Object.defineProperty(obj, "non enumerable prop name", {});
        Object.defineProperty(obj, Symbol("non enumerable symbol"), {});
        expect(getEnumerableKeys(obj)).toEqual(keys);
    });
    test("toPropertyKey", () => {
        expect(toPropertyKey("string")).toBe("string");
        expect(toPropertyKey(42)).toBe("42");
        expect(toPropertyKey(Symbol.for("symbol"))).toBe(Symbol.for("symbol"));
        expect(toPropertyKey({ toString: () => 1, valueOf: () => 2 })).toBe("1");
    });
});
