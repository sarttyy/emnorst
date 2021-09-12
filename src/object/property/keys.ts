const getPropNames = Object.getOwnPropertyNames;
const getPropSymbols = Object.getOwnPropertySymbols;
const objectPrototypePropertyIsEnumerable: (this: Object, v: PropertyKey) => boolean =
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Object.prototype.propertyIsEnumerable;

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

        if(objectPrototypePropertyIsEnumerable.call(obj, symbol)) {
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
