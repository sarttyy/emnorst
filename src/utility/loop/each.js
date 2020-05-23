
// @ts-check

import { isArrayLike, isNegative, isIterable } from "../../util/is/index.js";
import { forIndex } from "./for-index.js";
import { has } from "../../object/property/index.js";
import { forOf } from "./for-of.js";
import { loop } from "./loop.js";

/**
 * @typedef {Object} prop
 * @property {boolean} [fromRight]
 * @property {boolean} [fold]
 * @property {function(any): boolean} [isBreak]
 * @property {function(any): (string | symbol)[]} [keys]
 * @property {function} [frameWork]
 * @property {function} [engine]
 */

/**
 * TODO: +break
 * @param {*} items
 * @param {function} func
 * @param {prop} props
 */
export const each = function(items, func, props={}){
    const {
        fromRight = false,
        keys: getKeys = Object.keys,
        fold,
        frameWork = forOf,
        engine = ()=>{},
    } = props;
    if(isArrayLike(items)){
        const { length } = items;
        const limit = fromRight ? -length : length;
        forIndex(limit, (index)=>{
            has(items, index)
            && func.call(this, items[index], index, items);
        }, props.isBreak);
    }else if(isIterable(items)){
        forOf(items, ()=>{});
    }else{
        const keys = getKeys(Object(items));
        loop((index)=>{
            const key = keys[index];
            func.call(this, items[key], key, items);
        }, {
            limit: keys.length
        });
    }
};
