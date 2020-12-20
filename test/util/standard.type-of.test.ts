
import { typeOf, getTypeOf } from "../emnorst.import";

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
