
// SameValueZeroアルゴリズムを使用して、値がすべて等しいことを検証します。

/**
 * Validate that the values are all equal using the SameValueZero algorithm.
 * @param first
 * @param values
 * @return
 */
export const equals = (first: any, ...values: any): boolean => {
    let i = 0;
    const size = values.length;
    if(first === first)
        while(first === values[i] && i < size) ++i;
    else while(values[i] !== values[i] && i < size) ++i;
    return i === size;
};
