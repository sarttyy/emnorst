
import { isString, isSymbol, isNumber } from "../../util/index.js";

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
export const parsePropertyKey = (propKey) => {
    switch(typeof propKey) {
    case "string":
        return propKey.split(".");
    case "number":
    case "symbol":
        return [propKey];
    case "object": {
        const temp = propKey.map((key) => (
            typeof key === "string" ? key.split(".") : key
        ));
        return flat(temp);
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
