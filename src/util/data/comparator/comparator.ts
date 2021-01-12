
/**
 * @template T item
 * @template U direction
 */
export type BooleanComparator<T=unknown> = (left: T, right: T) => boolean;
export type NumberComparator<T=unknown> = (left: T, right: T) => number;
export type Comparator<T=unknown> = BooleanComparator<T> | NumberComparator<T>;

export const lessThan: BooleanComparator<number> = (left, right) => left < right;
export const lessEqual: BooleanComparator<number> = (left, right) => left <= right;
export const greaterThan: BooleanComparator<number> = (left, right) => left > right;
export const greaterEqual: BooleanComparator<number> = (left, right) => left >= right;
