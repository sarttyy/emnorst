
export const { keys } = Object;

const getPropNames = Object.getOwnPropertyNames;

const getSymbols = Object.getOwnPropertySymbols;

const { propertyIsEnumerable } = Object.prototype;

/**
 * Returns enumerable properties of an object.
 *
 * @param obj Object to get properties.
 * @return An array of enumerable properties containing symbols.
 */
export const getKeys = (obj: object): PropertyKey[] => {
    const keys$: PropertyKey[] = keys(obj);
    const symbols = getSymbols(obj);
    for(let i = 0;i < symbols.length;i++) {
        const symbol = symbols[i];
        if(propertyIsEnumerable.call(obj, symbol))
            keys$.push(symbol);
    }
    return keys$;
};

/**
 * IDEA: rename ownKeys
 * Returns all properties of the object.
 *
 * @param obj Object to get properties.
 * @return An array of all properties, including symbols and non-enumerable.
 */
export const allKeys = Reflect.ownKeys || ((obj: object): PropertyKey[] => (
    (getPropNames(obj) as PropertyKey[]).concat(getSymbols(obj))
));
