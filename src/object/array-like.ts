import { isUint32 } from "~/number/int32";

export const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
    if(value == null || typeof value === "function") {
        return false;
    }
    return isUint32((value as ArrayLike<unknown>).length);
};
