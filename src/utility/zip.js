
// @ts-check

import { isArrayLike } from "./is/index.js";
import { forOf } from "./loop/for-of.js";

/**
 * Flip objects at depth 0 and 1.
 *
 * オブジェクトを深さ0と1で反転します。
 *
 * @param {*} objects
 * The target object. The child properties of this object must also be objects.
 *
 * ターゲットオブジェクト。 このオブジェクトの子プロパティもオブジェクトである必要があります。
 * @param {function(any): (string|symbol)[]} getKeys
 * A function that returns the keys of the object as an array.
 *
 * オブジェクトのキーを配列として返す関数。
 * {@link allKeys}などが指定できます
 * @return
 * An object whose depth is inverted by 0 and 1.
 *
 * 深度が0と1で反転したオブジェクト。
 */
export const zip = (objects, getKeys=Object.keys)=>{
    const keys = getKeys(objects);
    const rootIsArray = isArrayLike(objects);
    const isArray = keys.every((key)=>(
        isArrayLike(objects[key])
        // && getKeys(objects[key]).every((_)=>/\d/.test(_))
    ));
    return keys.reduce((ziped, key)=>{
        forOf(getKeys(objects[key]), (name)=>{
            if(!ziped[name])ziped[name] = rootIsArray ? [] : {};
            ziped[name][key] = objects[key][name];
        });
        return ziped;
    }, isArray ? [] : {});
};
