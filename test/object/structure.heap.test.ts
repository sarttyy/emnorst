
import { Heap } from "../../dist/emnorst.cjs.js";

describe("Heap", () => {
    test("class", () => {
        const heap = new Heap<{ val: number }>(null, (l, r) => l.val < r.val);

        heap.add({ val: 1 });
        heap.add({ val: 4 });
        heap.add({ val: 3 });
        heap.add({ val: 1 });
        heap.add({ val: 2 });

        expect(heap.remove().val).toBe(1);
        expect(heap.remove().val).toBe(1);
        expect(heap.remove().val).toBe(2);

        heap.add({ val: 1 });

        expect(heap.remove().val).toBe(1);
        expect(heap.remove().val).toBe(3);
        expect(heap.remove().val).toBe(4);
    });
    test("sort", () => {
        const array = [2, 7, 3, 0, 5, 1, 8, 4, 6];
        const sortedArray = Heap.sort(array, (l, r) => l < r);
        expect(sortedArray).toEqual([8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });
});
