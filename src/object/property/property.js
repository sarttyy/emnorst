
// @ts-check

import { forOf } from "../../utility/index.js";
import { isObject, isString, isSymbol } from "../../util/index.js";

const flat = (array, depth=1) => {
    const flattend = [];
    const flatCall = (array, depth) => {
        for(const el of array) {
            if (Array.isArray(el) && depth > 0)
                flatCall(el, depth - 1);
            else flattend.push(el);
        }
    };
    flatCall(array, Math.floor(depth));
    return flattend;
};

/**
 *
 * @param {Object} obj
 * @param {String|Symbol|Array<String|Symbol>} propKey
 * @param {Boolean} [defineObj]
 */
export const property = (obj, propKey, defineObj)=>{
    const propKeys
        = isString(propKey) ? propKey.split(".")
        : isSymbol(propKey) ? [propKey]
        : flat(propKey.map((key)=>(
            typeof key==="string" ? key.split(".") : key
        )));
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
