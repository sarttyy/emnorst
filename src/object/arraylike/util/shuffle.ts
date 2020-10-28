
import { xorshift } from "../../../number/random/xorshift";
import { copyBase } from "../../clone";
import { swap } from "../../property/swap";

export const shuffle: {
    <T>(origin: T[], copy?: boolean): T[];
    <T>(origin: ArrayLike<T>, copy?: boolean): ArrayLike<T>;
} = <T>(origin: ArrayLike<T>, copy=false) => {
    const result = copy ? copyBase(origin) : origin;
    for(let i = origin.length;i--;) {
        const rand = xorshift(0, i);
        swap(origin, i, rand, result);
    }
    return result;
};
