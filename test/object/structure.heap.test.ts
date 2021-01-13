
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heap, CompareOrder } from "../emnorst.import";

describe("Heap", () => {
    const _case = <T>(
        mapper: (n: number) => T,
        getter: (v: T) => number,
        online: number,
        compareOrder: CompareOrder<T>,
        gt: boolean = false,
    ): [(n: number) => T, (v: T) => number, number, CompareOrder<T>, boolean] => (
        [mapper, getter, online, compareOrder, gt]
    );
    test.each([
        _case(v => ({ val: v }), /* */ v => v.val, /* */ 0, (l, r) => l.val > r.val),
        _case(v => new Number(v), v => v.valueOf(), 0, false),
        _case(v => new Number(v), v => v.valueOf(), 10, true, true),
    ])("Correct take-out order (case-%#)", (mapper, getter, online, compareOrder, gt) => {
        const originalData = [5, 1, 4, 3, 0, 6, 8, 9, 2, 7];
        const initData = originalData.map(mapper as any);
        const heap = new Heap<any>(initData, compareOrder);

        originalData.sort((l, r) => (gt ? l > r : l < r) ? +1 : -1);

        expect(getter(heap.remove()!)).toBe(originalData.pop());
        expect(getter(heap.remove()!)).toBe(originalData.pop());
        expect(getter(heap.remove()!)).toBe(originalData.pop());

        heap.add(mapper(online));

        expect(getter(heap.remove()!)).toBe(online);
        expect(getter(heap.remove()!)).toBe(originalData.pop());
        expect(getter(heap.remove()!)).toBe(originalData.pop());
    });
    test("sort", () => {
        const sortedArray1 = Heap.sort([2, 7, 3, 0, 5, 1, 8, 4, 6], (l, r) => l < r);
        expect(sortedArray1).toEqual([...Array(9).keys()]);
        const sortedArray2 = Heap.sort([5, 1, 4, 3, 0, 6, 8, 9, 2, 7]);
        expect(sortedArray2).toEqual([...Array(10).keys()]);
    });
    test("heapify", () => {
        const data = Heap.heapify([5, 1, 4, 3, 0, 6, 8, 9, 2, 7]);

        const heapTest = (idx: number) => {
            let cIdx = idx * 2 + 1;
            if(cIdx < data.length) {
                expect(data[idx]).toBeGreaterThan(data[cIdx]);
                heapTest(cIdx);
            }
            if(++cIdx < data.length) {
                expect(data[idx]).toBeGreaterThan(data[cIdx]);
                heapTest(cIdx);
            }
        };
        heapTest(0);
    });
});
