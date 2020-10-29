
const { explore } = require("../dist/emnorst.cjs.js");
// const { describe, test, expect } = require("@jest/globals");

describe("explore", () => {
    test("report", () => {
        const report = explore({ hoge: null });
        expect(report).toEqual({
            maxDepth: 0,
            skip: 0,
            break: 0,
            exit: false,
            hasRecursive: false,
        });
    });
    test("", () => {
        explore({}, {
            property({ path, route }) {
                expect(path).toMatch();
                expect(route);
            }
        });
    });
    // test("", () => {});
});
