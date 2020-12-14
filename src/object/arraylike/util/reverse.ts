
import { copyBase } from "../../clone";
import { swap } from "../../property/swap";

export const reverse = <T extends ArrayLike<T>>(origin: T, copy=false): T => {
    const result = copy ? copyBase(origin) as T : origin;
    let i = 0, j = origin.length;
    while(i < j) swap(origin, i++, --j, result);
    return result;
};
