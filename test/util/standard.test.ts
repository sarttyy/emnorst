
import { typeOf, getTypeOf, toPrimitive } from "../emnorst.import";

describe("type-of", () => {
    test("typeOf", () => {
        expect(typeOf(null)).toBe("Null");
        expect(typeOf(void 0)).toBe("Undefined");
        expect(typeOf(0)).toBe("Number");
        expect(typeOf(new Number)).toBe("Number");
    });
    test("getTypeOf", () => {
        expect(getTypeOf(null)).toBe("null");
        expect(getTypeOf(void 0)).toBe("undefined");
        expect(getTypeOf(0)).toBe("number");
        expect(getTypeOf(new Number)).toBe("Number");
    });
});

describe("toPrimitive", () => {
    const objObject = "[object Object]";
    const toStringSym = Symbol("toString");
    const valueOfSym = Symbol("valueOf");
    const OBJ_1 = {
        toString: () => toStringSym,
        valueOf: () => valueOfSym,
    };
    const OBJ_2 = {
        ...OBJ_1,
        [Symbol.toPrimitive](hint: string) { return hint; }
    };

    test.each`
        object   | string         | number        | $default
        ${{}}    | ${objObject}   | ${objObject}  | ${objObject}
        ${OBJ_1} | ${toStringSym} | ${valueOfSym} | ${valueOfSym}
        ${OBJ_2} | ${"string"}    | ${"number"}   | ${"default"}
    `("convert to primitive.", ({ object, string, number, $default }) => {
        expect(toPrimitive(object, "string")).toBe(string);
        expect(toPrimitive(object, "number")).toBe(number);
        expect(toPrimitive(object, "default")).toBe($default);
        expect(toPrimitive(object)).toBe($default);
    });

    test("throw error if unable to convert object.", () => {
        expect(() => {
            toPrimitive({ [Symbol.toPrimitive]: Object });
        }).toThrow(TypeError);

        expect(() => {
            toPrimitive({ toString: Object, valueOf: Object });
        }).toThrow(TypeError);

        expect(() => {
            toPrimitive({ toString: null, valueOf: null });
        }).toThrow(TypeError);
    });
});
