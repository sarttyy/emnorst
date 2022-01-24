import { isPrimitive, toPrimitive } from "../primitive";

const primitives = ["string", 0, BigInt(0), true, Symbol(), null, void 0];

describe("isPrimitive", () => {
    test.each(primitives)("isPrimitive(%v) === true", v => {
        expect(isPrimitive(v)).toBe(true);
    });
    test.each([
        {},
        Object(0),
        Object(Symbol()),
    ])("isPrimitive(%v) === false", v => {
        expect(isPrimitive(v)).toBe(false);
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
        [Symbol.toPrimitive](hint: string) {
            return hint;
        },
    };

    test.each`
        object   | string         | number        | default
        ${{}}    | ${objObject}   | ${objObject}  | ${objObject}
        ${OBJ_1} | ${toStringSym} | ${valueOfSym} | ${valueOfSym}
        ${OBJ_2} | ${"string"}    | ${"number"}   | ${"default"}
    `("convert to primitive.", ({ object, string, number, default: $default }) => {
        expect(toPrimitive(object, "string")).toBe(string);
        expect(toPrimitive(object, "number")).toBe(number);
        expect(toPrimitive(object, "default")).toBe($default);
        expect(toPrimitive(object)).toBe($default);
    });
    test.each(primitives)("toPrimitive(%p)", v => {
        expect(toPrimitive(v)).toBe(v);
    });
    test("throw error if unable to convert object.", () => {
        expect(() => {
            toPrimitive({ ...OBJ_1, [Symbol.toPrimitive]: Object });
        }).toThrow(TypeError);

        expect(() => {
            toPrimitive({ toString: Object, valueOf: Object });
        }).toThrow(TypeError);

        expect(() => {
            toPrimitive({ toString: null, valueOf: null });
        }).toThrow(TypeError);
    });
});
