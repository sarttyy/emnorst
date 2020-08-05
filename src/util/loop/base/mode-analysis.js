

import { has } from "../../../object/property/has.js";
import { isArrayLike } from "../../is/object/array-like.js";
import { isArray } from "../../is/object/array.js";
import { isObject } from "../../is/object/object.js";
import { isIterable } from "../../is/other/iterable.js";
import { nexts } from "./each-nexts.js";

export const modeAnalysis = (eachItems, mode) => {
    if(has(nexts, mode)) return mode;
    if(!isArray(mode))
        mode = ["arraylike", "iterable", "object"];
    for(let i = 0;i < mode.length;)
        switch(mode[i++]) {
        case "arraylike":
            if(isArrayLike(eachItems))
                return "arraylike";
            break;
        case "iterable":
            if(isIterable(eachItems))
                return "iterable";
            break;
        case "object":
            if(isObject(eachItems))
                return "object";
            break;
        }
    return null;
};
