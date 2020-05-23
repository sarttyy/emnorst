
// @ts-check

/**
 * @param {object} object
 * @param {PropertyKey} propName
 * @return {boolean}
 */
export const has = (object, propName)=>(
    Object.prototype.hasOwnProperty.call(object, propName)
);
