
import { getAllKeys, getEnumerableKeys, has, isEnumerableProp, isKey, toPropertyKey } from "../property";

describe("property", () => {
    test("toPropertyKey", () => {
        expect(toPropertyKey("string")).toBe("string");
        expect(toPropertyKey(42)).toBe("42");
        expect(toPropertyKey(Symbol.for("symbol"))).toBe(Symbol.for("symbol"));
        expect(toPropertyKey({ toString: () => 1, valueOf: () => 2 })).toBe("1");
    });
    test("isKey", () => {
        expect(isKey("")).toBeTruthy();
        expect(isKey(0)).toBeTruthy();
        expect(isKey(Symbol())).toBeTruthy();
        expect(isKey({})).toBeFalsy();
    });
    const obj = Object.defineProperty(
        Object.create({ protoProp: null }),
        "nonEnumerableProp",
        {},
    );
    obj.prop = null;
    test("has", () => {
        expect(has(obj, "prop")).toBeTruthy();
        expect(has(obj, "nonEnumerableProp")).toBeTruthy();
        expect(has(obj, "protoProp")).toBeFalsy();
    });
    test("isEnumerableProp", () => {
        expect(isEnumerableProp(obj, "prop")).toBeTruthy();
        expect(isEnumerableProp(obj, "nonEnumerableProp")).toBeFalsy();
        expect(isEnumerableProp(obj, "protoProp")).toBeFalsy();
    });
    test("getEnumerableKeys", () => {
        const keys = ["hoge", "huga", Symbol("piyo")];
        const obj = Object.fromEntries(keys.map(key => [key, null]));
        Object.defineProperty(obj, "nonEnumerableProp", {});
        Object.defineProperty(obj, Symbol("nonEnumerableSymbolProp"), {});
        expect(getEnumerableKeys(obj)).toEqual(keys);
    });
    test("getAllKeys", () => {
        expect(getAllKeys({})).toEqual([]);
        const obj = { hoge: null };
        Object.defineProperty(obj, "huga", {});
        Object.defineProperty(obj, Symbol.for("piyo"), {});
        expect(getAllKeys(obj)).toEqual(["hoge", "huga", Symbol.for("piyo")]);
    });
});
