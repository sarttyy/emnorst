import { toAbsIndex, at, updateAt, isArrayLike } from "../array-like";

describe("array-like", () => {
    test.each([
        ...[
            [],
            "string",
            { length: 0 },
        ].map(x => [x, true]),
        ...[
            { length: -1 },
            { length: 2 ** 32 },
            {},
            () => { /* noop */ },
            null,
        ].map(x => [x, false]),
    ])("isArrayLike(%p)", (value, expected) => {
        expect(isArrayLike(value)).toBe(expected);
    });
    test.each([
        ["0123", 0, 0],
        ["0123", -0, 0],
        ["0123", 1, 1],
        ["0123", 1.5, 1],
        ["0123", -1, 3],
        ["0123", -1.5, 3],
    ])("toAbsIndex(%p, %p)", (arrlike, value, expected) => {
        expect(toAbsIndex(arrlike, value)).toBe(expected);
    });
    test.each([
        ["0123", NaN],
        ["0123", 4],
        ["0123", -5],
    ])("toAbsIndex(%p, %p)", (arrlike, value) => {
        expect(toAbsIndex(arrlike, value)).toBeUndefined();
    });
    test("at", () => {
        const arr = [0, 1, 2, 3] as const;
        const arrlike = {
            ...arr,
            length: arr.length,
            10: ":-(",
            undefined: ":-(",
        } as const;
        expect(at(arrlike, 0.5)).toBe(0);
        expect(at(arrlike, -2)).toBe(2);
        expect(at(arrlike, 10)).toBe(undefined);
    });
    test("updateAt", () => {
        const arr = [0, 1, 2, 3];
        updateAt(arr, 0.5, 0.5);
        updateAt(arr, -2, 22);
        updateAt(arr, 10, 10);
        expect(arr).toStrictEqual([0.5, 1, 22, 3]);
    });
});
