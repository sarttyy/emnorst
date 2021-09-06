/**
 * Validate that the values are all equal using the SameValueZero algorithm.
 */
export const equals = (first: unknown, ...values: unknown[]): boolean => {
    const size = values.length;
    let i = 0;

    /* eslint-disable no-self-compare */
    if(first === first) {
        // check all values are same first
        while(first === values[i] && ++i < size);
    } else {
        // check all values are NaN
        while(values[i] !== values[i] && ++i < size);
    }
    /* eslint-enable no-self-compare */

    return i === size;
};
