
export const { keys } = Object;

const getPropNames = Object.getOwnPropertyNames || keys;

const getPropSymbols = Object.getOwnPropertySymbols;

/**
 * Returns enumerable properties of an object.
 *
 * @param {object} obj Object to get properties.
 * @return {(string | symbol)[]} An array of enumerable properties containing symbols.
 */
export const getKeys = (obj) => {
    const keys$ = keys(obj);
    if(typeof getPropSymbols === "function") {
        const symbols = getPropSymbols(obj);
        for(let i = 0;i < symbols.length;i++) {
            const symbol = symbols[i];
            if(obj.propertyIsEnumerable(symbol))
                keys$.push(symbol);
        }
    }
    return keys$;
};

/**
 * Returns all properties of the object.
 *
 * @param {object} obj Object to get properties.
 * @return {(string | symbol)[]} An array of all properties, including symbols and non-enumerable.
 */
export const allKeys = (obj) => [
    ...getPropNames(obj),
    ...getPropSymbols(obj)
];
