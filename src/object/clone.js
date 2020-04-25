
import {deepBase} from "./deepBase";
import {substitute} from "../utility/index";

export const _ = (object, depth)=>{
    const result = {};
    let temp = result;
    let temp2 = object;
    deepBase(object, {
        propFunc(o, propName){
            temp[propName] = o[propName];
        },
        propStructure(o, propName){
            temp[propName] = temp[propName] || {};
            temp = temp[propName];
        },
        structureFunc(...r){
            console.log(r);
        },
        depth: substitute([depth, Infinity])
    });
    return result;
};
