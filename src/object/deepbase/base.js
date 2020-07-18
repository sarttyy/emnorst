
// @ts-check

import { isFunction, isNullLike, isObject } from "../../util/is/type.js";
import { eachBase } from "../../util/loop/each/each.js";
import { patch } from "../../utility/condition.js";
import { callOrElse } from "../../utility/condition/call-or-else.js";
import { forOf } from "../../utility/loop/for-of.js";
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
        /** @type {import("./prop").State} */
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
    });
    patch(props.methods, isFunction, {
        keys: getKeys,
        isExplore: isObject,
    });

    // exceeds depthLimit
    if(props.path.length > props.depthLimit)
        return;

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

    eachBase(target, ({ index, key=index, done }) => {
        if(!has(target, key))
            return;
        props.path.push(key);
        const propDesc = Object.getOwnPropertyDescriptor(target, key);
        const hasValue = has(propDesc || Object.create(null), "value");
        if(hasValue && props.existing.has(propDesc.value)) {
            // recursive
            if(hook("existing", props, propDesc, target)) {
                props.path.pop();
                props.exit = true;
                done();
                return;
            }
            return;
        }
        if(!hook("propBefore", props, propDesc, target) && hasValue)
            deepBase(propDesc.value, props);
        if(hook("propAfter", props, propDesc, target)) {
            props.exit = true;
            props.path.pop();
            done();
            return;
        }
        props.path.pop();
    }, {
        keys: props.methods.keys
    });
};
