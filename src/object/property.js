
// @ts-check

import { isObject, isString, isSymbol, forOf } from "../utility/index";

/**
 * @param {Object} object
 * @param {String | Number | Symbol} propName
 * @return {Boolean}
 */
export const has = (object, propName)=>(
    Object.prototype.hasOwnProperty.call(object, propName)
);

/**
 * 受け取ったオブジェクトの全てのプロパティー名とSymbolを取得します。
 * @param  {...Object} object キーを取得するオブジェクトです。
 * @return {Array<String | Symbol>} オブジェクトのプロパティー名とSymbolの配列です。
 */
export const allKeys = object=>(
    !isObject(object) ? null : []
        .concat(Object.getOwnPropertyNames(object))
        .concat(Object.getOwnPropertySymbols(object))
);

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
        : propKey.flatMap(key=>(
            typeof key==="string" ? key.split(".") : key
        ));
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
