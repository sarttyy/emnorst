
import {isArrayLike, isNumber} from "./is";

export const zip = (objects, getKeys=Object.keys)=>{
    const keys = getKeys(objects);
    const rootIsArray = isArrayLike(objects);
    const isArray = keys.every(key=>(
        isArrayLike(objects[key])
        && getKeys(objects[key]).every(isNumber)
    ));
    return keys.reduce((ziped, key)=>{
        getKeys(objects[key]).forEach(name=>{
            if(!ziped[name])ziped[name] = rootIsArray ? [] : {};
            ziped[name][key] = objects[key][name];
        });
        return ziped;
    }, isArray ? [] : {});
};
