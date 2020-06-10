
// @ts-check

import { callOrElse, forOf, patch } from "../../utility/index";
import { isObject, isFunction } from "../../util/is/type";
import { has } from "../property/has";
import { getKeys } from "../property/keys";

/**
 * ネストされたオブジェクトなどに対して処理を行います。
 * RC:
 * @param {*} target
 * @param {import("./prop").Props} props
 */
export const deepBase = (target, props={})=>{
    patch(props, {
        depthLimit: Infinity,
        existing: new WeakSet(),
        path: [],
        hooks: {},
        methods: {},
    });
    patch(props.methods, {
        keys: getKeys,
        isExplore: isObject,
    }, true, isFunction);
    if(props.path.length > props.depthLimit) {
        return;
    }
    callOrElse(props.hooks.every, null, target, [...props.path]);
    if(!props.methods.isExplore(target)) {
        return;
    }
    props.existing.add(target);
    forOf(props.methods.keys(target), (propName) => {
        props.path.push(propName);
        const propDesc = Object.getOwnPropertyDescriptor(target, propName);
        if(props.existing.has(propDesc.value)) {
            callOrElse(props.hooks.existing, null, propDesc, [...props.path], target);
            return;
        }
        callOrElse(props.hooks.propBefore, null, propDesc, [...props.path], target);
        if(has(propDesc, "value"))
            deepBase(propDesc.value, props);
        callOrElse(props.hooks.propAfter, null, propDesc, [...props.path], target);
        props.path.pop();
    });
};
