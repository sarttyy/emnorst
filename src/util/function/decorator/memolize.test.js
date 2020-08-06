/* eslint-disable */

import { memolize } from "./memolize.js";

describe("memolize", () => {
    /** @test {memolize} */
    it("memolize", () => {
        const spyFn = jasmine.createSpy();
        const fn = memolize(spyFn);
        fn(1);
        fn(1);
        fn(1);
        fn();
        fn();
        fn();
        fn(2);
        fn(2);
        fn({});
        fn({});
        expect(spyFn.calls.count()).toBe(5);
    });
});
