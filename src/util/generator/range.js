
import { isInfinity } from "../is/number/infinity.js";
import { Each } from "../loop/base/each-class.js";
import { xrange } from "./xrange.js";

export const range = (start, end, step=1) => {
    if(isInfinity(start) || isInfinity(end))
        throw new RangeError("Only a finite number can be specified.");
    const result = [];
    const rangeGenerator = xrange(start, end, step);
    const each = new Each(rangeGenerator, "iterable");
    while(each.continue())
        result.push(each.current.value);
    return result;
};
