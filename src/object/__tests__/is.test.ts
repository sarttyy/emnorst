
import { isEmpty } from "../is";

describe("is", () => {
    test("isEmpty", () => {
        expect(isEmpty("")).toBeTruthy();
        expect(isEmpty("c")).toBeFalsy();
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty(["not empty"])).toBeFalsy();
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty({ prop: "not empty" })).toBeFalsy();
        expect(isEmpty(true)).toBeFalsy();
        expect(isEmpty(0)).toBeFalsy();
    });
});
