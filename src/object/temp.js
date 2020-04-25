
export const has = Object.prototype.hasOwnProperty.call;

export const last = (array, index=1)=>(
    array[array.length - index]
);

export const first = (array, index=1)=>(
    array[index - 1]
);

export const spread = (target, ...sources)=>{
    switch(typeof target){
    case "object":
        if(Array.isArray(target))
            return target.concat(...sources);
        return Object.assign(target, ...sources);
    case "function":
        return target.apply({}, sources.flat());
    default:
        return target;
    }
};

// TODO: キーがかぶらないように合成
export const attach = (object, name)=>{};

export const allKeys = (...objects)=>{
    const keys = [];
    for(const object of objects){
        keys.push(Object.getOwnPropertyNames(object));
        keys.push(Object.getOwnPropertySymbols(object));
    }
    return keys.flat();
};

export const property = (obj, propKey)=>{
    if(typeof propKey === "string")
        propKey = propKey.split(".");
    else if(typeof propKey === "symbol")
        propKey = [propKey];
    else if(Array.isArray(propKey))
        propKey = propKey.flatMap(key=>(
            typeof key==="string" ? key.split(".") : key
        ));
    return propKey.reduce((object, key)=>{
        if(!has(object, key))object[key] = {};
        return object[key];
    }, obj);
};

export const structure = (baseObj={}, applyObj={})=>{
    for(const propName of allKeys(applyObj)){
        const applyProp = applyObj[propName];
        if(typeof applyProp === "object")
            structure(baseObj[propName], applyProp);
        else baseObj[propName] = applyProp;
    }
    return baseObj;
};

export const and = (...object)=>{
    deep([object]);
    object.reduce();
};
export const xor = (...arrays)=>{};

const watchMap = new WeakMap();
export const watch = (obj, propName, func)=>{
    const descriptors = watchMap.has(obj)
        ? watchMap.get(obj) : {};
    const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
    if(!descriptor.hasOwnProperty("value"))
        return;
    descriptors[propName] = descriptor;
    watchMap.set(obj, descriptors);
    let value = obj[propName];
    Object.defineProperty(obj, propName, {
        get: ()=>value,
        set: newValue=>{
            func(value, value = newValue);
        },
        enumerable: true,
        configurable: true
    });
};

export const watchStop = (obj, propName)=>{
    const descriptor = watchMap.get(obj)[propName];
    Object.defineProperty(obj, propName, {
        ...descriptor,
        value: obj[propName]
    });
};
