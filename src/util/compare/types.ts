
/**
 * @template T item
 * @template U direction
 */
export type Comparator<T=unknown, U=number> = (left: T, right: T) => U;
