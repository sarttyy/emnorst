
// @ts-check

import { isArrayLike } from "../util/is/index.js";
import { forOf } from "../utility/loop/for-of.js";
import { copyType } from "./clone/copyType.js";

/*
オブジェクトを深さ0と1で反転します。

ターゲットオブジェクト。 このオブジェクトの子プロパティもオブジェクトである必要があります。

オブジェクトのキーを配列として返す関数。

深度が0と1で反転したオブジェクト。
*/

/**
 * Flip objects at depth 0 and 1.
 * @param {*} objects
 * The target object. The child properties of this object must also be objects.
 * @param {function(any): PropertyKey[]} getKeys
 * A function that returns the keys of the object as an array.
 * @return {object}
 * An object whose depth is inverted by 0 and 1.
 */
export const zip = (objects, getKeys=Object.keys, fromRight=false) => {
    const keys = getKeys(objects);
    const isArray = keys.every((key) => isArrayLike(objects[key]));
    return keys.reduce((ziped, key) => {
        forOf(getKeys(objects[key]), (name) => {
            if(!ziped[name]) ziped[name] = copyType(objects);
            ziped[name][key] = objects[key][name];
        });
        return ziped;
    }, isArray ? [] : {});
};
