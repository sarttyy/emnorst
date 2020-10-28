/* eslint-disable */

import { benchmark } from "./benchmark.js";

/** @test {object} */
describe("benchmark", () => {
    /** @test {randomStr} */
    it("benchmark", () => {
        expect(benchmark(()=>{}, 1)).toEqual({
            success: true,
            executionsCount: jasmine.any(Number),
            score: jasmine.any(Number),
            totalTime: jasmine.any(Number),
            once: jasmine.any(Number),
        });
    });
    it("throw Error", () => {
        const e = console.error;
        console.error = ()=>{};
        expect(benchmark(()=>{
            throw new Error("the error");
        }, 1)).toEqual({
            success: false,
            executionsCount: jasmine.any(Number),
            score: jasmine.any(Number),
            totalTime: jasmine.any(Number),
            once: jasmine.any(Number),
        });
        let i = 2;
        expect(benchmark(()=>{
            if(!--i) throw new Error("the error");
        }, 1)).toEqual({
            success: false,
            executionsCount: jasmine.any(Number),
            score: jasmine.any(Number),
            totalTime: jasmine.any(Number),
            once: jasmine.any(Number),
        });
        console.error = e;
    });
});
