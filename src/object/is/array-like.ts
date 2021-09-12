import { isUint32 } from "~/number/int32";

export const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
    if(value == null || typeof value === "function") {
        return false;
    }
    const len = (value as ArrayLike<unknown>).length;
    return isUint32(len);
};
