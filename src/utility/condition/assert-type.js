
// @ts-check

import { isArray, isFunction } from "../../util/is/index.js";
import { typeOf } from "../../util/typeof.js";
import { callOrElse } from "./call-or-else.js";

/**
 * @param {*} value
 * @param {string | function | (string | function)[]} types
 * @param {function} typeGetter
 */
export const assertType = (value, types, typeGetter=typeOf)=>{
    if(!isArray(types))types = [types];
    const some = types.some((type) => callOrElse(type, false, value));
    const type = typeGetter(value);
    if(some || types.includes(type))
        return;
    throw new TypeError(`Type "${type}" is not included in ${types.map((type)=>(
        isFunction(type) ? type.name : type
    ))}`);
};
