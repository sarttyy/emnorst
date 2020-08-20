
export const { keys } = Object;

const getPropNames = Object.getOwnPropertyNames || keys;

const getPropSymbols = Object.getOwnPropertySymbols;

export const getKeys = (obj) => {
    const keys$ = keys(obj);
    if(typeof getPropSymbols === "function") {
        const symbols = getPropSymbols(obj);
        for(let i = 0;i < symbols.length;i++) {
            const symbol = symbols[i];
            const propDesc = Object.getOwnPropertyDescriptor(obj, symbol);
            if(propDesc.enumerable) keys$.push(symbol);
        }
    }
    return keys$;
};

export const allKeys = (obj) => [
    ...getPropNames(obj),
    ...getPropSymbols(obj)
];
