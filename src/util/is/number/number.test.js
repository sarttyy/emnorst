/* eslint-disable */

import {
    isNumber,
    isEven,
    isOdd,
    isInteger,
    isInfinity,
    isPositive,
    isNegative,
    isMersenne,
    isPrime,
} from "./index.js";

describe("is/number", () => {
    /** @test {isNumber} */
    it("isNumber", ()=>{
        expect(isNumber(1)).toBe(true);
        expect(isNumber(128.128)).toBe(true);
        expect(isNumber(new Number())).toBe(true);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber("1")).toBe(false);
    });
    /** @test {isEven} */
    it("isEven", () => {
        expect(isEven(0)).toBe(true);
        expect(isEven(1)).toBe(false);
    });
    /** @test {isOdd} */
    it("isOdd", () => {
        expect(isOdd(1)).toBe(true);
        expect(isOdd(0)).toBe(false);
    });
    /** @test {isInteger} */
    it("isInteger", ()=>{
        expect(isInteger(1)).toBe(true);
        expect(isInteger(1.5)).toBe(false);
        expect(isInteger("1")).toBe(false);
    });
    /** @test {isInfinity} */
    it("isInfinity", () => {
        expect(isInfinity(Infinity)).toBe(true);
        expect(isInfinity(-Infinity)).toBe(true);
        expect(isInfinity(99999999)).toBe(false);
        expect(isInfinity("")).toBe(false);
    });
    /** @test {isPositive} */
    it("isPositive", () => {
        expect(isPositive(10)).toBe(true);
        expect(isPositive(0)).toBe(true);
        expect(isPositive(-0)).toBe(false);
        expect(isPositive(-10)).toBe(false);
        expect(isPositive("")).toBe(false);
    });
    /** @test {isNegative} */
    it("isNegative", () => {
        expect(isNegative(10)).toBe(false);
        expect(isNegative(0)).toBe(false);
        expect(isNegative(-0)).toBe(true);
        expect(isNegative(-10)).toBe(true);
        expect(isNegative("")).toBe(false);
    });
    /** @test {isMersenne} */
    it("isMersenne", () => {
        expect(isMersenne(1)).toBe(true);
        expect(isMersenne(127)).toBe(true);
        expect(isMersenne(128)).toBe(false);
        expect(isMersenne(NaN)).toBe(false);
        expect(isMersenne(-1)).toBe(false);
        expect(isNegative("1")).toBe(false);
    });
    /** @test {isPrime} */
    it("isPrime", () => {
        expect(isPrime(2)).toBe(true);
        expect(isPrime(1697)).toBe(true);
        expect(isPrime(256)).toBe(false);
        expect(isPrime(123456789)).toBe(false);
        expect(isPrime(NaN)).toBe(false);
        expect(isPrime(-100)).toBe(false);
        expect(isPrime("")).toBe(false);
    });
});
