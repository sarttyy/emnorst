
const { anonymous, Arguments } = require("../../dist/emnorst.cjs.js");

describe.skip("simple", () => {
    /** @test {anonymous} */
    it("anonymous", () => {
        expect(anonymous(1, true, null)).toBe(1);
        const fn = anonymous(function() {});
        expect(fn.name).toBe("");
    });

    /** @test {Arguments} */
    it("Arguments", () => {
        const { toString } = Object.prototype;
        expect(toString.call(Arguments())).toBe("[object Arguments]");
        expect(toString.call(new Arguments())).toBe("[object Arguments]");
    });
});
