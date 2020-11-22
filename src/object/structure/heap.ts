
import { swap } from "../property/swap";
import { lessThan, Comparator } from "../../util/data/comparator/comparator";

const { push, pop } = Array.prototype;

interface WritableArrayLike<T> {
    length: number;
    [n: number]: T;
}

/**
 * IDEA: 個別エクスポートのため関数宣言して`static name = f;`する?
 */
export class Heap<T> {
    get size(): number { return this.heap.length; }
    [Symbol.toStringTag]: "Heap";
    private readonly heap: T[] = [];
    constructor(
        items?: ArrayLike<T> | Heap<T>,
        private readonly comparator: Comparator<T>=lessThan,
    ) {
        let i = 0;
        if(items instanceof Heap) while(i < items.heap.length)
            this.heap.push(items.heap[i++]);
        else if(items) while(i < items.length)
            this.add(items[i++]);
    }
    /**
     * Add element to heap.
     * @param item elements to add
     */
    add(item: T): void {
        Heap.insert(this.heap, item, this.comparator);
    }
    /**
     * @return minimum or maximum value in heap
     */
    peek(): T { return this.heap[0]; }
    /**
     * Remove element from heap.
     * @return removed elements
     */
    remove(): T {
        return Heap.remove(this.heap, this.comparator);
    }
    /**
     * ヒープ配列に要素を追加します。
     * @param list Heaped ArrayLike object
     * @param item elements to add
     * @param comparator 比較関数
     */
    static insert<U>(list: WritableArrayLike<U>, item: U, comparator?: Comparator<U>): void {
        push.call(list, item);
        Heap.upHeap(list, void 0, comparator);
    }
    /**
     * ヒープ配列から要素を削除します。
     * @param list Heaped ArrayLike object
     * @param comparator 比較関数
     * @return removed elements
     */
    static remove<U>(list: WritableArrayLike<U>, comparator?: Comparator<U>): U {
        const result = list[0];
        const last: U = pop.call(list);
        if(result !== last) list[0] = last;
        Heap.downHeap(list, 0, void 0, comparator);
        return result;
    }
    static upHeap<U>(list: WritableArrayLike<U>, i=list.length-1, comparator: Comparator<U>=lessThan): void {
        const temp = list[i], refi = i;
        while(i > 0) {
            const parentI = (i - 1) / 2 | 0;
            const parent = list[parentI];
            if(comparator(parent, temp)) break;
            list[i] = parent;
            i = parentI;
        }
        if(refi !== i) list[i] = temp;
    }
    static downHeap<U>(list: WritableArrayLike<U>, i=0, limit=list.length-1, comparator: Comparator<U>=lessThan): void {
        const temp = list[i], refi = i;
        while(true) {
            let childI = 2 * i + 1;
            if(childI > limit) break;
            if(childI < limit && comparator(list[childI+1], list[childI]))
                childI++;
            const child = list[childI];
            if(!comparator(child, temp)) break;
            list[i] = child;
            i = childI;
        }
        if(refi !== i) list[i] = temp;
    }
    /**
     * Destructively heapify ArrayLike object.
     * @param list ArrayLike object to heapify
     * @param comparator 比較関数
     */
    static heapify<U extends WritableArrayLike<unknown>>(list: U, comparator?: Comparator<U[number]>): U {
        for(let i = 0;i < list.length;)
            Heap.upHeap(list, i++, comparator);
        return list;
    }
    /**
     * Destructively heapsort ArrayLike object.
     * @param list ArrayLike object for heap sorting.
     * @param comparator 比較関数
     */
    static sort<U extends WritableArrayLike<unknown>>(list: U, comparator?: Comparator<U[number]>): U {
        Heap.heapify(list, comparator);

        let i = list.length;
        while(--i > 0) {
            swap(list, 0, i);
            Heap.downHeap(list, 0, i - 1, comparator);
        }
        return list;
    }
}
Heap.prototype[Symbol.toStringTag] = "Heap";
