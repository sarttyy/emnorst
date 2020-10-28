
// @ts-check

import { isString, isSymbol, isNumber } from "../../util/is/type.js";

const flat = (array, depth=1) => {
    const flattend = [];
    const flatCall = (array, depth) => {
        for(const el of array) {
            if (Array.isArray(el) && depth > 0)
                flatCall(el, depth - 1);
            else flattend.push(el);
        }
    };
    flatCall(array, Math.floor(depth));
    return flattend;
};

/**
 * @param {PropertyKey | PropertyKey[]} propKey
 * @return {PropertyKey[]}
 */
export const parsePropertyKey = (propKey=[]) => {
    // @ts-ignore
    if(propKey.parsed) return propKey;
    switch(typeof propKey) {
    case "string": {
        const temp = propKey.split(".");
        temp.parsed = true;
        return temp;
    }
    case "number":
    case "symbol": {
        const temp = [propKey];
        temp.parsed = true;
        return temp;
    }
    case "object": {
        const temp1 = propKey.map((key) => (
            typeof key === "string" ? key.split(".") : key
        ));
        const temp = flat(temp1);
        temp.parsed = true;
        return temp;
    }
    }
    return (
        isString(propKey) ? propKey.split(".")
        : isSymbol(propKey) || isNumber(propKey) ? [propKey]
        : flat(propKey.map((key)=>(
            typeof key === "string" ? key.split(".") : key
        )))
    );
};
