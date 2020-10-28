
/**
 * @param {*} func
 * @param  {...any} args
 * @return {(f) => any}
 * @example
 * const gethoge = later(property, "hoge");
 *
 * const hoge = gethoge({ hoge: "hello world!" });
 * // => "hello world!"
 */
export const later = function(func, ...args) {
    return (first) => func.call(this, first, ...args);
};
