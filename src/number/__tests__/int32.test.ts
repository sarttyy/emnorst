import { MAX_INT32, MIN_INT32, MAX_UINT32, isInt32, isUint32 } from "../int32";

describe("int32", () => {
    test("isInt32", () => {
        // true
        expect(isInt32(0)).toBeTruthy();
        expect(isInt32(42)).toBeTruthy();
        expect(isInt32(-1)).toBeTruthy();
        // false
        expect(isInt32(1.5)).toBeFalsy();
        expect(isInt32(Object(0))).toBeFalsy();
    });
    test("isUint32", () => {
        // true
        expect(isUint32(0)).toBeTruthy();
        expect(isUint32(42)).toBeTruthy();
        // false
        expect(isUint32(-1)).toBeFalsy();
        expect(isUint32(1.5)).toBeFalsy();
        expect(isUint32(Object(0))).toBeFalsy();
    });
    test("MAX_INT32", () => {
        expect(isInt32(MAX_INT32)).toBeTruthy();
        expect(isInt32(MAX_INT32 + 1)).toBeFalsy();
    });
    test("MIN_INT32", () => {
        expect(isInt32(MIN_INT32)).toBeTruthy();
        expect(isInt32(MIN_INT32 - 1)).toBeFalsy();
    });
    test("MAX_UINT32", () => {
        expect(isUint32(MAX_UINT32)).toBeTruthy();
        expect(isUint32(MAX_UINT32 + 1)).toBeFalsy();
    });
});
