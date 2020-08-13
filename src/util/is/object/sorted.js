
/*
比較関数の結果として期待される値。
指定しない場合、最初の結果が指定されます。
*/

/**
 * @template T
 * @template U
 * @param {T[]} array
 * @param {(T, T) => U} compare
 * @param {U} [direction] The value expected as the result of the comparison function.
 * If not specified, the first result is specified.
 */
export const isSorted = (array, compare, direction) => {
    if(array.length < (direction == null ? 3 : 2))
        return true;

    let prev = array[0];
    let result = compare(prev, prev = array[1]);

    if(direction == null) direction = result;

    let i = 1;
    // eslint-disable-next-line eqeqeq
    while(direction == result && ++i < array.length)
        result = compare(prev, prev = array[i]);

    return i === array.length;
};
