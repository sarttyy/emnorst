
/* eslint-disable no-self-compare */

// SameValueZeroアルゴリズムを使用して、値がすべて等しいことを検証します。

/**
 * Validate that the values are all equal using the SameValueZero algorithm.
 * @param {any} first
 * @param {...any} values
 * @return {boolean}
 */
export const equals = (first, ...values) => {
    let i = 0;
    const size = values.length;
    if(first === first)
        while(first === values[i] && i < size) ++i;
    else while(values[i] !== values[i]) ++i;
    return i === size;
};
