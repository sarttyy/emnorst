
import { callorElse } from "../../utility/index";
import { isObject } from "../../utility/is/index";
import { deepBase } from "./base";

/**
 * deepBaseのプロパティー
 * @typedef {{
 * keys: Function;
 * depth: Number;
 * maxDepth: Number;
 * existing: Set | WeakSet;
 * structureCall: Function;
 * propFuncIfObject: Function;
 * propFunc: Function;
 * }} prop
 */

/**
 * @param {*} object
 * @param {String | Symbol} propName
 * @param {prop} props
 */
export const allocate = (object, propName, props={})=>{
    const target = Object.getOwnPropertyDescriptor(object, propName);
    if(isObject(target)){
        callorElse(props.propFuncIfObject, object, propName);
        if(!props.existing.has(target)){
            props.existing.add(target);
            deepBase(target, Object.assign({}, props, {
                depth: props.depth + 1,
            }));
        }
    }else{
        const prop = Object.getOwnPropertyDescriptor(object, propName);
        callorElse(props.propFunc, object, propName, prop);
    }
};
