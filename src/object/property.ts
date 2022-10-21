import { toPrimitive } from "~/util/primitive";
import type { Intersection, Normalize, Union } from "~/util/types";

export const toPropertyKey = (value: unknown): string | symbol => {
    const key = toPrimitive(value, "string");
    return typeof key === "symbol" ? key : String(key);
};

export const isKey = (value: unknown): value is PropertyKey => {
    const type = typeof value;
    return type === "string"
        || type === "number"
        || type === "symbol";
};

const prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
const prototypePropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
const getPropNames = Object.getOwnPropertyNames;
const getPropSymbols = Object.getOwnPropertySymbols;

export type KeyOf<T> = (T extends unknown ? keyof T : never) | (string & {}) | (number & {}) | symbol;

export const has = <T, U extends KeyOf<T>>(obj: T, key: U):
    obj is Normalize<U extends unknown ? T & { [_ in U]: unknown } : never> =>
    obj != null && prototypeHasOwnProperty.call(obj, key);

export const isEnumerableProp = <T, U extends KeyOf<T>>(obj: T, key: U):
    obj is Normalize<U extends unknown ? T & { [_ in U]: unknown } : never> =>
    obj != null && prototypePropertyIsEnumerable.call(obj, key);

type Swapable<T, K extends keyof T> =
    {
        [_ in K]: Intersection<
            K extends unknown ? { x: T[K] } : never
        > extends { x: infer U } ? U : never;
    };

/**
 * @example
 * const obj = { a: 0, b: 1 };
 * swap(obj, "a", "b");
 * obj === { a: 1, b: 0 };
 */
export const swap = <T, K extends keyof T>(
    object: Normalize<T & Swapable<T, K>>,
    key1: Union<K>,
    key2: Union<K>,
) => {
    const temp = object[key1];
    object[key1] = object[key2];
    object[key2] = temp;
};

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
