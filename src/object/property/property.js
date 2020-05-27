
// @ts-check

import { forOf } from "../../utility/index.js";
import { isObject } from "../../util/index.js";
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

export const structure = (baseObj={}, applyObj={})=>{
    forOf(allKeys(applyObj), (propName)=>{
        const applyProp = applyObj[propName];
        if(typeof applyProp === "object")
            structure(baseObj[propName], applyProp);
        else baseObj[propName] = applyProp;
    });
    return baseObj;
};
