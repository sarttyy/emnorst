
import { Each } from "../../util/loop/base/each-class.js";

export const sum = (numbers) => {
    let total = 0;
    for(const each = new Each(numbers);each.continue();)
        total += each.current.value;
    return total;
};
