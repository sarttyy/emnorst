
// @ts-check

import { isObject } from "../../util/is/object/object.js";
import { isFunction } from "../../util/is/other/function.js";
import { Each } from "../../util/loop/base/each-class.js";
import { has } from "../property/has.js";
import { getKeys } from "../property/keys.js";

class DeepState {
    constructor(props) {
        this.existing = new WeakSet();
        this.path = [];
        this.exit = 0;
        this.props = props;
        this.reset();
        this.target = null;
    }
    reset() {
        this.skip = false;
    }
    current() {
        const state = this;
        // /** @type {import("./prop").State} */
        // { parent, depth, innermost }
        return {
            parent: this.target,
            depth: this.depth(),
            innermost: this.isDeepest(),
            deepest: this.isDeepest(),
            command(action) {
                switch(action) {
                case "exit":
                    state.exit++;
                    break;
                case "skip":
                    state.exit = -1;
                    break;
                }
            },
        };
    }
    depth() { return this.path.length; }
    isDeepest() { return this.depth() > this.props.depthLimit; }
    isExit() { return this.exit && this.exit--; }
    isDive() {
        return !this.isDeepest();
    }
}

const invokeHook = (hookName, props, propDesc) => {
    const hookfn = props[hookName];
    isFunction(hookfn)
        && hookfn(propDesc, [...props.state.path], props.state.current());
};

/**
 * ネストされたオブジェクトなどに対して処理を行います。
 * RC:
 * @param {*} target
 * @doc
 * #param {import("./prop").Props<DeepState>} props
 */
// eslint-disable-next-line max-statements
export const deepBase = (target, props={})=>{
    if(props.state instanceof DeepState) {
        props.state.target = target;
    }else {
        // entry root setting
        props = { ...props };
        if(!Number.isSafeInteger(props.depthLimit))
            props.depthLimit = Infinity;
        isFunction(props.keys)
            || (props.keys = getKeys);
        isFunction(props.isExplore)
            || (props.isExplore = isObject);
        props.state = new DeepState(props);
        props.state.target = props.root = target;
        props.eachProp = {
            mode: ["object", "arraylike"],
            keys: props.keys,
            after() {},
        };
    }
    const { state } = props;

    invokeHook("every", props, target);
    if(state.isExit()) return;

    if(!props.isExplore(target)) {
        // innermost
        return;
    }
    state.existing.add(target);

    for(const each = new Each(target, props.eachProp);each.continue();) {
        const { current } = each;
        const key = current.key || current.index;
        state.path.push(key);
        const propDesc = Object.getOwnPropertyDescriptor(target, key);

        const hasValue = propDesc && has(propDesc, "value");
        if(state.existing.has(propDesc.value)) {
            invokeHook("recursive", props, propDesc);
        }else {
            invokeHook("property", props, propDesc);
            if(state.isDive() && hasValue) {
                invokeHook("propertyWillDive", props, propDesc);
                deepBase(propDesc.value, props);
                invokeHook("propertyDidDive", props, propDesc);
            }
        }

        state.path.pop();
        if(state.isExit()) return;
    }
};
