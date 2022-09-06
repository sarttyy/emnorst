import { isUint32 } from "~/number/int32";
import type { Repeat } from "../util/types";

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

type ToAbsIndex<T extends ArrayLike<unknown>, I extends number> = (
    I extends unknown
        ? `${I}` extends `-${infer IRight extends number}`
            ? number extends T["length"] | IRight
                ? number
                // T - RelIndex (-になる場合はundefined)
                : (T extends readonly unknown[]
                    ? T
                    : Repeat<unknown, T["length"]>
                ) extends [...Repeat<unknown, IRight>, ...infer V]
                    ? V["length"]
                    : undefined
            : I
        : never
);

type Lookup<T extends ArrayLike<unknown>, I> = (
    number extends T["length"] | I ? (I extends keyof T ? T[I] | undefined : never) // array
    : I extends keyof T ? T[I] // tuple
    : undefined
);

export type At<T extends ArrayLike<unknown>, I extends number> = Lookup<T, ToAbsIndex<T, I>>;

export const at = <T extends ArrayLike<unknown>, I extends number>(
    arrlike: T,
    index: I,
): At<T, I> => {
    const i = toAbsIndex(arrlike, index);
    if(i !== void 0) {
        return arrlike[i] as At<T, I>;
    }
    return void 0 as At<T, I>;
};

export const updateAt = <T extends WritableArrayLike<unknown>, I extends number>(
    arrlike: T,
    index: I,
    val: At<T, I>,
): void => {
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
