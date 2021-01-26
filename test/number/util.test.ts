
import { toBaseN, parseBaseN, primeFactorize /* , Factors */, sum, top } from "../emnorst.import";

describe("primeFactorize", () => {
    const factorToNumber = (factors: ReturnType<typeof primeFactorize>) => (
        factors.reduce((accum, [mantissa, exp]) => (
            accum * (mantissa ** exp)
        ), 1)
    );

    test.each([100, 2**31-1])("factor is reversible.", num => {
        const factors = primeFactorize(num);
        const restoredNum = factorToNumber(factors);

        expect(restoredNum).toBe(num);
    });

    test("factor is empty." , () => {
        expect(primeFactorize(0)).toHaveLength(0);
        expect(primeFactorize("" as unknown as number)).toHaveLength(0);
        expect(primeFactorize(-10)).toHaveLength(0);
        expect(primeFactorize(10.5)).toHaveLength(0);
    });
});

describe("number/util", () => {
    test("toBaseN/parseBaseN", () => {
        const num = 1234, numBase62 = "jU";
        expect(toBaseN(num)).toBe(`${num}`);
        expect(toBaseN(num, 16)).toBe(num.toString(16));
        expect(toBaseN(num, 62)).toBe(numBase62);

        expect(parseBaseN(`${num}`)).toBe(num);
        expect(parseBaseN(num.toString(16), 16)).toBe(num);
        expect(parseBaseN(numBase62, 62)).toBe(num);

        expect(toBaseN(0)).toBe("0");
        expect(parseBaseN("")).toBe(0);
    });

    test("sum", () => {
        expect(sum("12345")).toBe("12345");
        expect(sum([1, 2, 3, 4, 5], "", String)).toBe("12345");
        expect(sum([1, 2, 3, 4, 5])).toBe(15);
        expect(sum([
            { val: 1 },
            { val: 2 },
            { val: 3 },
            { val: 4 },
            { val: 5 },
        ], null, obj => obj.val)).toBe(15);
    });

    test("top", () => {
        expect(top([10, 5, 3, 8, 6, 1])).toBe(10);
        expect(top([10, 5, 3, 8, 6, 1], (l, r) => l > r)).toBe(1);
        expect(top("abcdef")).toBe("f");
        expect(top([])).toBe(null);
    });
});
