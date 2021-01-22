
import { primeFactorization /* , Factors */ } from "../emnorst.import";

describe("primeFactorization", () => {
    const factorToNumber = (factors: ReturnType<typeof primeFactorization>) => (
        factors.reduce((accum, [mantissa, exp]) => (
            accum * (mantissa ** exp)
        ), 1)
    );

    test("factor is reversible.", () => {
        const num = 100;
        const factors = primeFactorization(num);
        const restoredNum = factorToNumber(factors);

        expect(restoredNum).toBe(num);
    });

    test("factor is empty." , () => {
        expect(primeFactorization(0)).toHaveLength(0);
        expect(primeFactorization("" as unknown as number)).toHaveLength(0);
        expect(primeFactorization(-10)).toHaveLength(0);
        expect(primeFactorization(10.5)).toHaveLength(0);
    });
});
