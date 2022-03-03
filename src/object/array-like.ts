import { isUint32 } from "~/number/int32";

export interface WritableArrayLike<T> {
    readonly length: number;
    [n: number]: T;
}

export const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
    if(value == null || typeof value === "function") {
        return false;
    }
    return isUint32((value as ArrayLike<unknown>).length);
};

export const at = <T>(arrlike: ArrayLike<T>, index: number): T | undefined => {
    const i = toAbsIndex(arrlike, index);
    if(i !== void 0) {
        return arrlike[i];
    }
};

export const updateAt = <T>(arrlike: WritableArrayLike<T>, index: number, val: T): void => {
    const i = toAbsIndex(arrlike, index);
    if(i !== void 0) {
        arrlike[i] = val;
    }
};

export const toAbsIndex = (arrlike: ArrayLike<unknown>, index: number): number | undefined => {
    const len = arrlike.length;
    const i = (index < 0 ? len : 0) + Math.trunc(index);
    return (0 <= i && i < len) ? i : void 0;
};
