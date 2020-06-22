
// @ts-check

const { hasOwnProperty } = Object.prototype;

/**
 * @param {object} obj
 * @param {PropertyKey} propKey
 * @return {boolean}
 */
export const has = (obj, propKey)=>(
    hasOwnProperty.call(Object(obj), propKey)
);
