
import { primeFactorization } from "../emnorst.import";

const factorToNumber = (factors: ReturnType<typeof primeFactorization>) => {
    const entries = Object.entries(factors);

    return entries.reduce((accum, [mantissa, exp]) => (
        accum * Number(mantissa) ** exp
    ), 1);
};

test("primeFactorization", () => {
    const num = 100;
    const factors = primeFactorization(num);
    const restoredNum = factorToNumber(factors);

    expect(restoredNum).toBe(num);
});

test("none" , () => {
    expect(primeFactorization(0)).toEqual({});
    expect(primeFactorization("" as unknown as number)).toEqual({});
    expect(primeFactorization(-10)).toEqual({});
    expect(primeFactorization(10.5)).toEqual({});
});
