import type { Repeat } from "~/util/types";

type PaddingIndexRec<Length extends number, State extends unknown[]> = (
    State["length"] extends Length
        ? State
        : PaddingIndexRec<Length, [...State, State["length"]]>
);

/**
 * Creates a union type of positive integers in the range T to U.
 *
 * ex. `Range<0, 2>` is `0 | 1 | 2`
 *
 * NOTE: Do not use large numbers as it takes time to calculate the type.
 */
export type Range<T extends number, U extends number> =
    PaddingIndexRec<U, Repeat<never, T>> extends (infer V)[] ? V | U : never;
