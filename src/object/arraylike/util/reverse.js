
import { swap } from "../../property/swap.js";
import { copyType } from "../../clone/copyType.js";

export const reverse = (origin, copy=false) => {
    const result = copy ? copyType(origin) : origin;
    for(let i = 0, j = origin.length;i < j;swap(origin, i++, --j, result));
    return result;
};
