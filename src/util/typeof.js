
// @ts-check

const { toString } = Object.prototype;

// `Object.prototype.toString`を使用して値の型を取得します。

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param {any} value
 * @return {string}
 */
export const typeOf = (value) => (
    toString.call(value).slice(8, -1)
);
