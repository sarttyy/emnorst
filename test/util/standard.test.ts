
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
    const toStringSymbol = Symbol("toString");
    const valueOfSymbol = Symbol("valueOf");
    const OBJ_1 = {
        toString: () => toStringSymbol,
        valueOf: () => valueOfSymbol,
    };
    const OBJ_2 = {
        ...OBJ_1,
        [Symbol.toPrimitive](hint: string) { return hint; }
    };

    test.each`
        object   | string               | number               | $default             | $undefined
        ${{}}    | ${"[object Object]"} | ${"[object Object]"} | ${"[object Object]"} | ${"[object Object]"}
        ${OBJ_1} | ${toStringSymbol}    | ${valueOfSymbol}     | ${valueOfSymbol}     | ${valueOfSymbol}
        ${OBJ_2} | ${"string"}          | ${"number"}          | ${"default"}         | ${"default"}
    `("convert to primitive.", ({ object, string, number, $default, $undefined }) => {
        expect(toPrimitive(object, "string")).toBe(string);
        expect(toPrimitive(object, "number")).toBe(number);
        expect(toPrimitive(object, "default")).toBe($default);
        expect(toPrimitive(object)).toBe($undefined);
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
