
const { Heap } = require("../dist/emnorst.cjs.js");

describe("Heap", () => {
    test("sort", () => {
        const array = [2, 7, 3, 0, 5, 1, 8, 4, 6];
        const sortedArray = Heap.sort(array);
        expect(sortedArray).toEqual([8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });
});
