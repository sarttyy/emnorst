
// @ts-check

import { callOrElse, forOf } from "../../utility/index";
import { isObject } from "../../utility/is/index";
import { has } from "../property";
import { allocate } from "./allocate";
import { Props } from "./prop";

// * structureCall: Function;
// * propFuncIfObject: Function;
// * propFunc: Function;

/**
 * WIP: 開発中。
 * 汎用Deep関数
 * @param {Object} targetObject
 * @param {Props} props
 */
export const deepBase = (targetObject, props={})=>{
    ({
        depth:      props.depth = 0,
        depthLimit: props.depthLimit = Infinity,
        existing:   props.existing = new WeakSet(),
        hooks:      props.hooks = {},
        methods:    props.methods = {},
    } = props);
    if(props.depth > props.depthLimit){
        return;
    }
    callOrElse(props.hooks.every, null, targetObject, props.depth);
    if(props.methods.isObject(targetObject))
        forOf(props.methods.keys(targetObject), (propName)=>{
            /** @type {PropertyDescriptor} */
            const prop = Object.getOwnPropertyDescriptor(targetObject, propName);
            if(has(prop, "value")){
                callOrElse(props.hooks.property, null, prop);
                const terget = prop.value;
                deepBase(terget, {
                    ...props,
                    depth: props.depth + 1
                });
            }else{
                callOrElse(props.hooks.accessor, null, prop);
            }
        });
};
