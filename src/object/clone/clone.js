
const copyObject = (modules, object, cloneObject)=>{
    const propKeys = modules.getAllKeys(object);
    const prototype = Object.getPrototypeOf(object);
    object = propKeys.reduce((propertiesObject, propKey) => {
        const prop = Object.getOwnPropertyDescriptor(object, propKey);
        if (prop.hasOwnProperty("value"))
            prop.value = modules.cloneMod(prop.value, cloneObject);
        Object.defineProperty(propertiesObject, propKey, prop);
        return propertiesObject;
    }, Object.create(prototype));
    return object;
};
export const copy = cloneObject=>{
    console.log(`type: '${cloneObject.type}'`, [cloneObject.value]);
    let object = cloneObject.value;
    // primitive type, function
    if(typeof object !== "object")
        return cloneObject;
    switch(cloneObject.type){
    case "object": { // {}, new Object, new Foo etc...
        object = copyObject(modules, object, cloneObject);
        break;
    }
    case "array": // [], new Array
        object = object.map(value=>modules.cloneMod(value, cloneObject));
        break;
    case "number": // new Number
        return new Number(object);
    case "string": // new String
        return new String(object);
    case "boolean": // new Boolean
        return new Boolean(object);
    case "bigint": // Object(BigInt())
        return object.valueOf();
    case "regexp": // /regexp/, new RegExp
        return new RegExp(object);
    case "null": // null
        object = null;
        break;
    case "date": return new Date(object);
    case "map": {
        const map = new Map();
        for(const [key, value] of object)
            map.set(key, modules.clone(value));
        return map;
    }
    case "weakmap": {
        const map = new WeakMap();
        for(const [key, value] of object)
            map.set(key, modules.clone(value));
        return map;
    }
    case "set": return new Set(object);
    case "weakset": return new WeakSet(object);
    default:
        return null;
    }
    cloneObject.object = object;
    return cloneObject;
};
