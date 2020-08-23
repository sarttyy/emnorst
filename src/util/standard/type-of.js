
// @ts-check

const { toString } = Object.prototype;

let prev = NaN, result;

// `Object.prototype.toString`を使用して値の型を取得します。

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param {any} value Value to get the type
 * @return {string} String of type
 */
export const typeOf = (value) => {
    if(prev === value)
        return result;
    prev = value;
    result = toString.call(value).slice(8, -1);
    return result;
};
