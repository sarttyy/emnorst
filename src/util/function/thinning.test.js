/* eslint-disable */

import { throttle, debounce } from "./thinning.js";

/** @test {object} */
describe("thinning", () => {
    beforeEach(() => {
        jasmine.clock().install();
    });
    afterEach(() => {
        jasmine.clock().uninstall();
    });
    /** @test {throttle} */
    it("throttle", () => {
        const spyFn = jasmine.createSpy();
        const fn = throttle(spyFn);
        fn();
        fn();
        fn();
        jasmine.clock().tick(1001);
        expect(spyFn.calls.count()).toBe(2);
    });
    /** @test {debounce} */
    it("debounce", () => {
        const spyFn = jasmine.createSpy();
        const fn = debounce(spyFn);
        fn();
        fn();
        jasmine.clock().tick(1001);
        fn();
        jasmine.clock().tick(1001);
        expect(spyFn.calls.count()).toBe(2);
    });
});
