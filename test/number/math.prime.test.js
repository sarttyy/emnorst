
const { primeFactorization } = require("../../dist/emnorst.cjs.js");

const factorToNumber = (factors) => {
    const entries = Object.entries(factors);
    return entries.reduce((accum, [mantissa, exp]) => accum * mantissa ** exp, 1);
};

test("primeFactorization", () => {
    const num = 100;
    const factors = primeFactorization(num);
    const restoredNum = factorToNumber(factors);

    expect(restoredNum).toBe(num);
});

test("none" , () => {
    expect(primeFactorization(0)).toEqual({});
    expect(primeFactorization("")).toEqual({});
    expect(primeFactorization(-10)).toEqual({});
    expect(primeFactorization(10.5)).toEqual({});
});
