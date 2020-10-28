
import { copyBase } from "../../clone";
import { swap } from "../../property/swap";

export const reverse: {
    <T>(origin: T[], copy?: boolean): T[];
    <T>(origin: ArrayLike<T>, copy?: boolean): ArrayLike<T>;
} = <T>(origin: ArrayLike<T>, copy=false) => {
    const result = copy ? copyBase(origin) : origin;
    let i = 0, j = origin.length;
    while(i < j) swap(origin, i++, --j, result);
    return result;
};
