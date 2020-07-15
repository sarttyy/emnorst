/* eslint-disable */

import { isNegative, isPositive, isInfinity, isPrime, isOdd, isEven } from "./number.js";

/** @test {util} */
describe("util/is", ()=>{
    /** @test {isPositive} */
    it("isPositive", ()=>{
        expect(isPositive(10)).toBe(true);
        expect(isPositive(0)).toBe(true);
        expect(isPositive(-0)).toBe(false);
        expect(isPositive(-10)).toBe(false);
    });
    /** @test {isNegative} */
    it("isNegative", ()=>{
        expect(isNegative(10)).toBe(false);
        expect(isNegative(0)).toBe(false);
        expect(isNegative(-0)).toBe(true);
        expect(isNegative(-10)).toBe(true);
    });
    /** @test {isInfinity} */
    it("isInfinity", ()=>{
        expect(isInfinity(Infinity)).toBe(true);
        expect(isInfinity(-Infinity)).toBe(true);
        expect(isInfinity(99999999)).toBe(false);
    });
    /** @test {isPrime} */
    it("isPrime", ()=>{
        expect(isPrime(2)).toBe(true);
        expect(isPrime(1697)).toBe(true);
        expect(isPrime(256)).toBe(false);
        expect(isPrime(123456789)).toBe(false);
        expect(isPrime(NaN)).toBe(false);
    });
    /** @test {isOdd} */
    it("isOdd", ()=>{
        expect(isOdd(1)).toBe(true);
        expect(isOdd(0)).toBe(false);
    });
    /** @test {isEven} */
    it("isEven", ()=>{
        expect(isEven(0)).toBe(true);
        expect(isEven(1)).toBe(false);
    });
});
