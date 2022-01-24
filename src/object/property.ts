import { toPrimitive } from "~/util/primitive";

export const toPropertyKey = (value: unknown): string | symbol => {
    const key = toPrimitive(value, "string");
    return typeof key === "symbol" ? key : String(key);
};

const prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
const prototypePropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
const getPropNames = Object.getOwnPropertyNames;
const getPropSymbols = Object.getOwnPropertySymbols;

export const has = <T extends PropertyKey>(obj: unknown, key: T):
    obj is T extends unknown ? { [P in T]: unknown } : never =>
    obj != null && prototypeHasOwnProperty.call(obj, key);

/**
 * Returns enumerable properties of an object.
 *
 * @param obj Object to get properties.
 * @returns An array of enumerable properties containing symbols.
 */
export const getEnumerableKeys = (obj: object): (string | symbol)[] => {
    const keys: (string | symbol)[] = Object.keys(obj);
    const symbols = getPropSymbols(obj);
    for(let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];

        if(prototypePropertyIsEnumerable.call(obj, symbol)) {
            keys.push(symbol);
        }
    }
    return keys;
};

/**
 * Returns all properties of the object.
 *
 * @param obj Object to get properties.
 * @returns An array of all properties, including symbols and non-enumerable.
 */
export const getAllKeys = (obj: object): (string | symbol)[] =>
    (getPropNames(obj) as (string | symbol)[]).concat(getPropSymbols(obj));
