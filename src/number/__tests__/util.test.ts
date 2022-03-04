import { modulo } from "../util";

describe("number-util", () => {
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
