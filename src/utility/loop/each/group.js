
// @ts-check

import { isObject } from "../../../util/is/index.js";
import { each } from "../each.js";
import { foldLeft } from "../fold.js";

/**
 * @callback groupCB
 * @param {any} any
 * @return {PropertyKey | {[x: string]: any}}
 */

/**
 * @param {*} array
 * @param {groupCB} func
 */
export const group = function(array, func=(value)=>value){
    return foldLeft(array, (groups, value)=>{
        const entry = func.call(this, value);
        const entries = isObject(entry)
            ? entry : { [entry]: value };
        each(entries, (value, key)=>{
            (
                groups[key]
                || (groups[key] = [])
            ).push(value);
        });
    }, {});
};
