
import { substitute } from "../utility/index";
import { deepBase } from "./deepbase/index";
import { has } from "./property";

/**
 * WIP:
 * @param {Object} object
 * @param {Number} depth
 */
export const clone_WIP = (object, depth)=>{
    const result = {};
    let temp = result;
    deepBase(object, {
        propFunc(o, propName){
            const prop = Object.getOwnPropertyDescriptor(o, propName);
            if(has(prop, "value"))prop.value = null;
            Object.defineProperty(temp, propName, prop);
        },
        propFuncIfObject(o, propName){
            const target = o[propName];
            const prototype = Object.getPrototypeOf(target);
            const __ = Object.create(prototype);
            temp[propName] = temp[propName] || __;
            temp = temp[propName];
        },
        structureCall(r){
            console.log(r);
        },
        depth: substitute([depth, Infinity])
    });
    console.log(object, "=>", result);
    return result;
};
