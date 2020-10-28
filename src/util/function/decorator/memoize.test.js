/* eslint-disable */

import { memoize } from "./memoize.js";

describe("memoize", () => {
    /** @test {memoize} */
    it("memoize", () => {
        const spyFn = jasmine.createSpy();
        const fn = memoize(spyFn);
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
