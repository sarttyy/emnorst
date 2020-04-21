
export const isUndefined = value=>(
    value === void 0
);
export const isNull = value=>(
    value === null || isUndefined(value)
);
export const isRegExp = obj=>(
    modules.typeof(obj) === "regexp"
);
export const isObject = obj=>{
    const type = typeof obj;
    return type === "function" || type === "object" && obj !== null;
};
export const isEmpty = value=>{
    if(typeof value === "string" || Array.isArray(value))
        return value.length === 0;
    if(typeof value === "object")
        return modules.allKeys(value).length === 0;
    return false;
};
export const isNegative = value=>{
    if(typeof value === "number")
        return value < 0;
    if(typeof value === "boolean")
        return !value;
    return false;
};
