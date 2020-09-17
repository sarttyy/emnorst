
// @ts-check

import { deepExplore } from "../deep-explore/index.js";
import { has } from "../property/has";
import { getKeys } from "../property/keys";
import { property } from "../property/property.js";
import { forOf } from "../../utility/loop/for-of";
import { equals, equalsType } from "../equals.js";
import { isObject } from "./type";

/**
 * Beta: 循環参照非対応
 * @param {*} obj1
 * @param {*} obj2
 * @return {boolean}
 */
export const equalsDeep = (obj1, obj2) => {
    if(!isObject(obj1))
        return equals(obj1, obj2);
    let eq = equalsType(obj1, obj2) && obj1.constructor === obj2.constructor;
    eq && forOf(getKeys(obj1, obj2), (key) => {
        eq = has(obj1, key) && has(obj2, key)
            && equalsDeep(obj1[key], obj2[key]);
        if(!eq) return null;
    });
    return eq;
};

/**
 * Beta:
 * @param {*} obj1
 * @param {*} obj2
 * @return {boolean}
 */
export const isEquals = (obj1, obj2) => {
    if(!isObject(obj1))
        return equals(obj1, obj2);
    let eq = equalsType(obj1, obj2);
    eq && deepExplore(obj1, {
        every(value1, path) {
            const last = path.pop();
            const value2c = property(obj2, path);
            if(!has(value2c, last))
                return (eq = false);
            const value2 = value2c[last];
            if(isObject(value1)) {
                eq && (eq = equalsType(value1, value2));
                eq && (eq = value1.constructor === value2.constructor);
            }else eq && equals(value1, value2);
        }
    });
    eq && deepBase(obj2, {
        hooks: {
            every(value2, path) {
                const last = path.pop();
                const value1c = property(obj1, path);
                if(!has(value1c, last))
                    return (eq = false);
                const value1 = value1c[last];
                if(isObject(value2)) {
                    eq && (eq = equalsType(value1, value2));
                    eq && (eq = value1.constructor === value2.constructor);
                }else eq && equals(value1, value2);
            }
        }
    });
    return eq;
};
