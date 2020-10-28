
import { xorshift } from "../../../number/random/xorshift.js";
import { copyType } from "../../clone/copyType.js";
import { swap } from "../../property/swap.js";

export const shuffle: {
    <T>(origin: T[], copy?: boolean): T[];
    <T>(origin: ArrayLike<T>, copy?: boolean): ArrayLike<T>;
} = <T>(origin: ArrayLike<T>, copy=false) => {
    const result = copy ? copyType(origin) : origin;
    for(let i = origin.length;i--;) {
        const rand = xorshift(0, i);
        swap(origin, i, rand, result);
    }
    return result;
};
