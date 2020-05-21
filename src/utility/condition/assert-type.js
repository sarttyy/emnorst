
// @ts-check

import { isArray } from "../is/index.js";
import { typeOf } from "../typeof.js";
import { callOrElse } from "./call-or-else.js";

/**
 * @param {*} value
 * @param {string | function | (string | function)[]} types
 * @param {function} typeGetter
 */
export const assertType = (value, types, typeGetter=typeOf)=>{
    if(!isArray(types))types = [types];
    const some = types.some((type) => callOrElse(type, false, value));
    if(some || types.includes(typeGetter(value)))
        return;
    throw new TypeError(`typeof value is not in ${types}`);
};
