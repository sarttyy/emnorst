
/**
 * @template T item
 * @template U direction
 */
export type Comparator<T=unknown, U=number> = (left: T, right: T) => U;

export type CompareOrder<T> = boolean | Comparator<T, number | boolean | null>;
