
/** @type {SymbolConstructor} */
let symbol;

if(typeof Symbol === "function")
    symbol = Symbol;
else {
    const registry = { forKeys: [], forSyms: [], all: [] };
    /**
     * @param {string | number} description
     * @return {symbol}
     */
    symbol = (description="") => {
        let str = `@@${description}`;
        do str += "\u200b";
        while(~registry.all.indexOf(str));
        registry.all.push(str);
        return str;
    };
    symbol.toStringTag = symbol("toStringTag");
    symbol.toPrimitive = symbol("toPrimitive");
    symbol.iterator = symbol("iterator");
    symbol.species = symbol("species");
    symbol.for = (key) => {
        const index = registry.forKeys.indexOf(key);
        if(~index) return registry.forSyms[index];
        const sym = symbol(key);
        registry.forKeys.push(key);
        registry.forSyms.push(sym);
        return sym;
    };
    symbol.keyFor = (sym) => {
        const index = registry.forSyms.indexOf(sym);
        return registry.forKeys[index] || null;
    };
}

export { symbol as Symbol };
