
// @ts-check

import { callOrElse } from "../../utility/condition/call-or-else.js";
import { forOf } from "../../utility/loop/for-of.js";
import { patch } from "../../utility/condition.js";
import { isObject, isFunction, isNullLike } from "../../util/is/type.js";
import { has } from "../property/has.js";
import { getKeys } from "../property/keys.js";

/**
 * @param {string} name
 * @param {import("./prop").Props} props
 * @param {PropertyDescriptor} propDesc
 * @param {any} parent
 */
const hook = (name, props, propDesc, parent) => {
    const depth = props.path.length;
    const innermost = depth > props.depthLimit;
    const flag = callOrElse(
        props.hooks[name],
        null,
        propDesc,
        [...props.path],
        { parent, depth, innermost }
    );
    return !isNullLike(flag);
};

/**
 * ネストされたオブジェクトなどに対して処理を行います。
 * RC:
 * @param {*} target
 * @param {import("./prop").Props} props
 */
export const deepBase = (target, props={})=>{
    patch(props, isNullLike, {
        depthLimit: Infinity,
        existing: new WeakSet(),
        path: [],
        hooks: {},
        methods: {},
        exit: false,
    });
    patch(props.methods, isFunction, {
        keys: getKeys,
        isExplore: isObject,
    });
    if(props.path.length > props.depthLimit) {
        return;
    }
    const exitFlag = callOrElse(props.hooks.every, null, target, [...props.path]);
    if(!isNullLike(exitFlag)) {
        props.exit = true;
        return;
    }
    if(!props.methods.isExplore(target)) {
        // innermost
        return;
    }
    props.existing.add(target);
    forOf(props.methods.keys(target), (propName) => {
        if(!has(target, propName))
            return void 0;
        props.path.push(propName);
        const propDesc = Object.getOwnPropertyDescriptor(target, propName);
        const hasValue = has(propDesc || Object.create(null), "value");
        if(hasValue && props.existing.has(propDesc.value)) {
            if(hook("existing", props, propDesc, target)) {
                props.path.pop();
                props.exit = true;
                return "exit";
            }
            return void 0;
        }
        if(!hook("propBefore", props, propDesc, target) && hasValue)
            deepBase(propDesc.value, props);
        if(hook("propAfter", props, propDesc, target)) {
            props.exit = true;
            props.path.pop();
            return "exit";
        }
        props.path.pop();
        return void 0;
    });
};
