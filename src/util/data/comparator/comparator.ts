
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

interface _<T> {
    lessThan: T;
    equal: T;
    greaterThan: T;
    fn: T extends boolean ? BooleanComparator<number>
    : T extends number ? NumberComparator<number>
    : never;
    sorted: number[];
}
interface Comparators {
    booleanLessThan: _<boolean>;
    booleanLessThanFull: _<boolean>;
    numberLessThan: _<number>;
}
const comparators: Comparators = {
    booleanLessThan: {
        lessThan: true,
        equal: false,
        greaterThan: false,
        fn: lessThan,
        sorted: [0, 1, 2],
    },
    booleanLessThanFull: {
        lessThan: true,
        equal: null,
        greaterThan: false,
        fn: (left, right) => left === right ? null : left < right,
        sorted: [0, 1, 2],
    },
    // : これもしかしてgreaterThan?
    numberLessThan: {
        lessThan: +1,
        equal: 0,
        greaterThan: -1,
        fn: (left, right) => left > right ? +1 : left < right ? -1 : 0,
        sorted: [0, 1, 2],
    },
};
