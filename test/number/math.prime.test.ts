
import { primeFactorize /* , Factors */ } from "../emnorst.import";

describe("primeFactorization", () => {
    const factorToNumber = (factors: ReturnType<typeof primeFactorize>) => (
        factors.reduce((accum, [mantissa, exp]) => (
            accum * (mantissa ** exp)
        ), 1)
    );

    test("factor is reversible.", () => {
        const num = 100;
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
