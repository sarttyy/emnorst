
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

export const and = (...object)=>{
    deep([object]);
    object.reduce();
};
export const xor = (...arrays)=>{};

// const watchMap = new WeakMap();
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
