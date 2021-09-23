/**
 * Use the SameValueZero algorithm to verify that the values are equal.
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
