
// import { memoize, throttle, debounce } from "../emnorst.import";
declare function memoize(fn: Function): Function;
declare function throttle(fn: Function): Function;
declare function debounce(fn: Function): Function;

/** @test {object} */
describe.skip("thinning", () => {
    /** @test {memoize} */
    test("memoize", () => {
        const spyFn = jest.fn();
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
        expect(spyFn).toHaveBeenCalledTimes(5);
    });
    beforeEach(() => {
        jest.useFakeTimers();
    });
    /** @test {throttle} */
    test("throttle", () => {
        const spyFn = jest.fn();
        const fn = throttle(spyFn);
        fn();
        fn();
        fn();
        jest.runAllTimers();
        expect(spyFn).toHaveBeenCalledTimes(2);
    });
    /** @test {debounce} */
    test("debounce", () => {
        const spyFn = jest.fn();
        const fn = debounce(spyFn);
        fn();
        fn();
        jest.runAllTimers();
        fn();
        jest.runAllTimers();
        expect(spyFn).toHaveBeenCalledTimes(2);
    });
});
