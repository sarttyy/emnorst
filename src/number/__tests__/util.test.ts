import { clamp, modulo } from "../util";

describe("number-util", () => {
    test("clamp", () => {
        expect(clamp(NaN, 0, 0)).toBe(NaN);
        expect(clamp(0, NaN, 0)).toBe(0);
        expect(clamp(0, 0, NaN)).toBe(0);
    });
    test("modulo", () => {
        expect(modulo(12, 7)).toBe(5);
        expect(modulo(12, -7)).toBe(5);
        expect(modulo(-12, 7)).toBe(2);
        expect(modulo(-12, -7)).toBe(2);
    });
    test("modulo (zero)", () => {
        expect(modulo(1, 1)).toBe(0);
        expect(modulo(-1, 1)).toBe(0);
        expect(modulo(1, -1)).toBe(0);
        expect(modulo(-1, -1)).toBe(0);
    });
});
