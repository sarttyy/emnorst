
import {isArrayLike, isNumber} from "./is";

export const zip = (objects, mapFunc, getKeys=Object.keys)=>{
    if(mapFunc)objects = objects.map(mapFunc);
    const keys = getKeys(objects);
    const rootIsArray = isArrayLike(objects);
    const isArray = keys.every(key=>isArrayLike(objects[key]));
    return keys.reduce((ziped, key)=>{
        const k = getKeys(objects[key]);
        // k.every(isNumber);
        k.forEach(name=>{
            if(!ziped[name])ziped[name] = rootIsArray ? [] : {};
            ziped[name][key] = objects[key][name];
        });
        return ziped;
    }, isArray ? [] : {});
};
