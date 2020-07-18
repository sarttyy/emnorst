
// @ts-check

import { forOf } from "../../utility/loop/for-of.js";
import { isObject } from "../../util/is/type.js";
import { parsePropertyKey } from "./parsePropertyKey.js";
import { has } from "./has.js";


/**
 *
 * @param {Object} obj
 * @param {PropertyKey | PropertyKey[]} propKey
 * @param {*} [defineObj]
 */
export const property = (obj, propKey, defineObj)=>{
    const propKeys = parsePropertyKey(propKey);
    const define = isObject(defineObj);
    return propKeys.reduce((object, key)=>(
        define && !has(object, key)
            ? (object[key] = defineObj)
            : object[key]
    ), obj);
};
