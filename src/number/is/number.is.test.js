
const {
    isNumber,
    isEven,
    isOdd,
    isInteger,
    isInfinity,
    isPositive,
    isNegative,
    isPrime,
    uptrend,
    downtrend,
} = require("../../../dist/monster.cjs.js");

describe("is/number", () => {
    /** @test {isNumber} */
    test("isNumber", ()=>{
        expect(isNumber(123.456)).toBe(true);
        expect(isNumber(new Number)).toBe(true);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber(new Number(NaN))).toBe(false);
        expect(isNumber("1")).toBe(false);
    });
    /** @test {isEven} */
    test("isEven", () => {
        expect(isEven(0)).toBe(true);
        expect(isEven(1)).toBe(false);
    });
    /** @test {isOdd} */
    test("isOdd", () => {
        expect(isOdd(1)).toBe(true);
        expect(isOdd(0)).toBe(false);
    });
    /** @test {isInteger} */
    test("isInteger", ()=>{
        expect(isInteger(1)).toBe(true);
        expect(isInteger(1.5)).toBe(false);
        expect(isInteger("1")).toBe(false);
    });
    /** @test {isInfinity} */
    test("isInfinity", () => {
        expect(isInfinity(Infinity)).toBe(true);
        expect(isInfinity(-Infinity)).toBe(true);
        expect(isInfinity(99999999)).toBe(false);
        expect(isInfinity("")).toBe(false);
    });
    /** @test {isPositive} */
    test("isPositive", () => {
        expect(isPositive(10)).toBe(true);
        expect(isPositive(0)).toBe(true);
        expect(isPositive(-0)).toBe(false);
        expect(isPositive(-10)).toBe(false);
        expect(isPositive("")).toBe(false);
    });
    /** @test {isNegative} */
    test("isNegative", () => {
        expect(isNegative(10)).toBe(false);
        expect(isNegative(0)).toBe(false);
        expect(isNegative(-0)).toBe(true);
        expect(isNegative(-10)).toBe(true);
        expect(isNegative("")).toBe(false);
    });
    /** @test {isPrime} */
    test("isPrime", () => {
        expect(isPrime(2)).toBe(true);
        expect(isPrime(1697)).toBe(true);
        expect(isPrime(256)).toBe(false);
        expect(isPrime(123456789)).toBe(false);
        expect(isPrime(NaN)).toBe(false);
        expect(isPrime(-100)).toBe(false);
        expect(isPrime("")).toBe(false);
    });
    test("trend", () => {
        expect(uptrend(1, 2, 2, 3)).toBe(true);
        expect(downtrend(3, 2, 2, 1)).toBe(true);
    });
});
