import { isArrayLike } from "../array-like";

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
});
