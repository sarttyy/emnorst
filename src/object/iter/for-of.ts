
import { getIterator } from "./get-iterator";

export const forOf = <T>(
    iterable: Iterable<T>,
    fn: (val: T, idx: number, iterator: Iterator<T>) => unknown
): unknown => {
    const iterator = getIterator(iterable);
    let iterResult: IteratorResult<T>;
    let i = 0;
    while(!(iterResult = iterator.next()).done) {
        const result = fn(iterResult.value, i++, iterator);
        if(result != null) return result;
    }
};
