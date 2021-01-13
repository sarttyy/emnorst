
import { primeFactorization /* , Factors */ } from "../emnorst.import";

describe("primeFactorization", () => {
    const factorToNumber = (factors: ReturnType<typeof primeFactorization>) => {
        const entries = Object.entries(factors);

        return entries.reduce((accum, [mantissa, exp]) => (
            accum * Number(mantissa) ** exp
        ), 1);
    };

    test("factor is reversible", () => {
        const num = 100;
        const factors = primeFactorization(num);
        const restoredNum = factorToNumber(factors);

        expect(restoredNum).toBe(num);
    });

    test("factor is empty." , () => {
        expect(primeFactorization(0)).toEqual({});
        expect(primeFactorization("" as unknown as number)).toEqual({});
        expect(primeFactorization(-10)).toEqual({});
        expect(primeFactorization(10.5)).toEqual({});
    });
});
