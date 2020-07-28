
// SameValueZeroアルゴリズムを使用して、値がすべて等しいことを検証します。

/**
 * Validate that the values are all equal using the SameValueZero algorithm.
 * @param {...any} values
 * @return {boolean}
 */
export const equals = (...values) => {
    const first = values.shift();
    const equal = Number.isNaN(first)
        ? Number.isNaN
        : (next) => (first === next);
    return values.every(equal);
};
