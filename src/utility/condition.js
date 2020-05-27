
// @ts-check

import { isNullLike, isArray } from "../util/is/index.js";
import { typeOf } from "../util/typeof.js";
import { forOf } from "./loop/index.js";
import { has } from "../object/property/index.js";

// TODO: コールバック関数のthisを指定できる高階関数のthatの指定の仕方を変更。
// 高階関数自体のthisを継承する。
// f(cbFunc, that) => f.call(that, cbFunc)

/**
 * Returns the first found value. If not found, it returns the last value.
 *
 * 値の中で最初に見つかった値を返します。見つからない場合、最後の値を返します。
 *
 * @param {*[]} values Value and alternate value. Higher priority to the left
 * @param {function(any): boolean} evalFunc
 * A function that evaluates a value. Returning a true value is considered an invalid value.
 * 値を評価する関数。trulyな値を返すと無効な値とみなされる
 */
export const substitute = (values, evalFunc=isNullLike)=>(
    values.reduce((value, subValue)=>(
        evalFunc(value) ? subValue : value
    ), values.shift())
);

/**
 * Beta:
 * @param {*} value
 * @param {*} types
 * @param {*} sub
 * @param {*} typeGetter
 */
export const typeCheck = (value, types, sub, typeGetter=typeOf)=>{
    const type = typeGetter(value);
    if(types.includes(type))
        return value;
    return callOrElse(sub, [type]);
};

// IDEA: foldは参照型のオブジェクトはreturnいらず。
/**
 * Beta:
 * @param {*} origin
 * @param {*} patchObject
 * @param {boolean} toOrigin
 * @param {function(any): boolean} [subFunc]
 */
export const patch = (origin, patchObject, toOrigin=true, subFunc)=>{
    const target = toOrigin ? origin : {};
    forOf(Object.entries(patchObject), ([key, value])=>{
        target[key] = has(origin, key)
            ? substitute([origin[key], value], subFunc)
            : patchObject[key];
    });
    return target;
};
