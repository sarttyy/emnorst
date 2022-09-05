import type { Repeat } from "~/util/types";

type PaddingIndex<Length extends number, State extends unknown[]> = (
    State["length"] extends Length
        ? State
        : PaddingIndex<Length, [...State, State["length"]]>
);

/**
 * Creates a union type of positive integers in the range T to U.
 *
 * ex. `Range<0, 2>` is `0 | 1 | 2`
 *
 * NOTE: Do not use large numbers as it takes time to calculate the type.
 */
export type Range<T extends number, U extends number> =
    [...PaddingIndex<U, Repeat<never, T>>, U][number];
