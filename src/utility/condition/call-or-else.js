
// @ts-check

import { isFunction } from "../../util/is/type.js";

/**
 * NOTE: tryCall
 * @param {*} value
 * @param {*} subValue valueが関数ではなかった場合に返される値。
 * 指定されなかった場合はvalueが指定される。
 * @param  {...any} args valueが関数だった場合の引数
 */
export const callOrElse = function(value, subValue=value, ...args){
    return isFunction(value)
        ? value.apply(this, args)
        : subValue;
};
