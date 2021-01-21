
import { compare, CompareOrder } from "util/compare";

export const top = <T>(items: ArrayLike<T>, order?: CompareOrder<T>): T | null => {
    const len = items.length;
    if(len === 0) return null;

    let i = 1, topValue = items[0];
    while(i < len) {
        const item = items[i++];
        if(compare(topValue, item, order))
            topValue = item;
    }
    return topValue;
};
