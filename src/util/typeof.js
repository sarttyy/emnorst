
// @ts-check

const { toString } = Object.prototype;

/**
 * You can add the type by changing the "Symbol.toStringTag" property of the object.
 *
 * オブジェクトの"Symbol.toStringTag"プロパティーを変更することで、型を追加できます。
 * @param {*} value An object that determines the type
 * @return {string} object type
 */
export const typeOf = (value) => (
    toString.call(value).slice(8, -1)
);
