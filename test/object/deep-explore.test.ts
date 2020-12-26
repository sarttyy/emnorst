
import { explore } from "../emnorst.import";
// const { describe, test, expect } = require("@jest/globals");

describe.skip("explore", () => {
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
                expect(path).toMatchObject([]);
                expect(route);
            }
        });
    });
    // test("", () => {});
});
