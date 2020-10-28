
import { isArrayLike } from "../is/array-like";

/*
比較関数の結果として期待される値。
指定しない場合、最初の結果が指定されます。
*/

/**
 * 
 *
 * @param arrayLike
 * @param compare
 * @param direction The value expected as the result of the comparison function.
 * If not specified, the first result is specified.
 */
export const isSorted = <T, U>(
    arrayLike: ArrayLike<T>,
    compare: (left: T, right: T) => U,
    direction?: U,
): boolean => {
    if(!isArrayLike(arrayLike))
        return false;

    if(arrayLike.length < (direction == null ? 3 : 2))
        return true;

    let prev = arrayLike[0];
    let result = compare(prev, prev = arrayLike[1]);

    if(direction == null) direction = result;

    let i = 1;
    while(direction === result && ++i < arrayLike.length)
        result = compare(prev, prev = arrayLike[i]);

    return i === arrayLike.length;
};
