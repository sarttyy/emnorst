
const { typeOf, getTypeOf } = require("../../../dist/emnorst.cjs.js");

describe("type", () => {
    test("typeOf", () => {
        expect(typeOf(null)).toBe("Null");
        expect(typeOf()).toBe("Undefined");
        expect(typeOf(0)).toBe("Number");
        expect(typeOf(new Number)).toBe("Number");
    });
    test("getTypeOf", () => {
        expect(getTypeOf(null)).toBe("null");
        expect(getTypeOf()).toBe("undefined");
        expect(getTypeOf(0)).toBe("number");
        expect(getTypeOf(new Number)).toBe("Number");
    });
});
