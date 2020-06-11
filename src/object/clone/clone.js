
// @ts-check

import { deepBase } from "../deepbase/index";
import { has } from "../property/has.js";
import { property } from "../property/property.js";
import { copyType } from "./copyType.js";

/**
 * RC:
 * @param {*} target
 * @param {number} depth
 */
export const clone = (target, depth=10) => {
    const root = copyType(target);
    const map = new Map([[target, root]]);
    deepBase(target, {
        depthLimit: depth,
        hooks: {
            propBefore(propDesc, path) {
                if(has(propDesc, "value")) {
                    const { value } = propDesc;
                    propDesc = { ...propDesc, value: copyType(value) };
                    map.set(value, propDesc.value);
                }
                const last = path.pop();
                const context = property(root, path);
                Object.defineProperty(context, last, propDesc);
            },
            existing(propDesc, path) {
                const last = path.pop();
                const context = property(root, path);
                Object.defineProperty(context, last, {
                    ...propDesc,
                    value: map.get(propDesc.value)
                });
            },
        },
    });
    return root;
};
