/* eslint-disable */

import * as is from "../../../src/utility/is/index.js";

/** @test {utility} */
describe("util/is", ()=>{
    /** @test {isNegative} */
    it("isNegative", ()=>{
        expect(is.isNegative(0)).toBe(false);
        expect(is.isNegative(-0)).toBe(true);
    });
    /** @test {isPositive} */
    it("isPositive", ()=>{
        expect(is.isPositive(0)).toBe(true);
        expect(is.isPositive(-0)).toBe(false);
    });
    /** @test {isInfinity} */
    it("isInfinity", ()=>{
        expect(is.isInfinity(Infinity)).toBe(true);
        expect(is.isInfinity(-Infinity)).toBe(true);
        expect(is.isInfinity(99999999)).toBe(false);
    });
    /** @test {isPrime} */
    it("isPrime", ()=>{
        expect(is.isPrime(2)).toBe(true);
        expect(is.isPrime(1697)).toBe(true);
        expect(is.isPrime(NaN)).toBe(false);
    });
    /** @test {isOdd} */
    it("isOdd", ()=>{
        expect(is.isOdd(1)).toBe(true);
        expect(is.isOdd(0)).toBe(false);
    });
    /** @test {isEven} */
    it("isEven", ()=>{
        expect(is.isEven(0)).toBe(true);
        expect(is.isEven(1)).toBe(false);
    });
});
