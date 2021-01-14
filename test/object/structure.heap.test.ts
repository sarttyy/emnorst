
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heap, CompareOrder } from "../emnorst.import";

describe("Heap", () => {
    const _case = <T>(
        mapper: (n: number) => T,
        getter: (v: T) => number,
        compareOrder: CompareOrder<T>,
    ): [(n: number) => T, (v: T) => number, CompareOrder<T>, boolean] => (
        [mapper, getter, compareOrder, compareOrder !== true]
    );
    test.each([
        _case(v => ({ val: v }), v => v.val, (l, r) => l.val > r.val),
        _case(v => new Number(v), v => v.valueOf(), false),
        _case(v => new Number(v), v => v.valueOf(), true),
    ])("Correct take-out order (case-%#)", (mapper, getter, compareOrder, gt) => {
        const originalData = [5, 1, 4, 3, 0, 6, 8, 9, 2, 7];
        const initData = originalData.map(mapper as any);
        const heap = new Heap<any>(initData, compareOrder);

        const sign = gt ? -1 : +1;
        originalData.sort((l, r) => (l - r) * sign);

        expect(getter(heap.remove()!)).toBe(originalData.pop());
        expect(getter(heap.remove()!)).toBe(originalData.pop());
        expect(getter(heap.remove()!)).toBe(originalData.pop());

        const online = gt ? 0 : 10;
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
