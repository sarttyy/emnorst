
import { copyType } from "../../clone/copyType.js";
import { swap } from "../../property/swap.js";

export const reverse: {
    <T>(origin: T[], copy?: boolean): T[];
    <T>(origin: ArrayLike<T>, copy?: boolean): ArrayLike<T>;
} = <T>(origin: ArrayLike<T>, copy=false) => {
    const result = copy ? copyType(origin) : origin;
    let i = 0, j = origin.length;
    while(i < j) swap(origin, i++, --j, result);
    return result;
};
