
// @ts-check

import { isObject, isSymbol } from "../utility/index";

export const has = (thisObject, propName)=>(
    Object.prototype.hasOwnProperty.call(thisObject, propName)
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
 * @param {Boolean} define 
 */
export const property = (obj, propKey, define=false)=>{
    if(typeof propKey === "string")
        propKey = propKey.split(".");
    else if(isSymbol(propKey))
        propKey = [propKey];
    else if(Array.isArray(propKey))
        propKey = propKey.flatMap(key=>(
            typeof key==="string" ? key.split(".") : key
        ));
    return propKey.reduce((object, key)=>{
        if(!has(object, key)){
            if(define)object[key] = {};
        }
        return object[key];
    }, obj);
};

export const structure = (baseObj={}, applyObj={})=>{
    for(const propName of allKeys(applyObj)){
        const applyProp = applyObj[propName];
        if(typeof applyProp === "object")
            structure(baseObj[propName], applyProp);
        else baseObj[propName] = applyProp;
    }
    return baseObj;
};
