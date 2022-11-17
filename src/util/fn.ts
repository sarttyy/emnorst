export const noop = function(): void {};
export const identify = <T>(value: T): T => value;
export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;

/**
 * SameValueZero
 */
export const equals = <T>(left: T, right: T): boolean => {
    // eslint-disable-next-line no-self-compare
    if(left === left) {
        // `left` is not NaN
        return left === right;
    } else {
        // `left` is NaN
        // eslint-disable-next-line no-self-compare
        return right !== right;
    }
};
