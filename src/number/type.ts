import type { Recurse, Repeat } from "~/util/type";

type PaddingIndexRec<Length extends number, State extends unknown[]> = (
    State["length"] extends Length
        ? State
        : {
            __rec: PaddingIndexRec<Length, [...State, State["length"]]>;
        }
);

/**
 * Creates a union type of positive integers in the range T to U.
 *
 * ex. `Range<0, 2>` is `0 | 1 | 2`
 *
 * NOTE: Do not use large numbers as it takes time to calculate the type.
 */
export type Range<T extends number, U extends number> =
    Recurse<PaddingIndexRec<U, Repeat<never, T>>> extends (infer V)[] ? V | U : never;
