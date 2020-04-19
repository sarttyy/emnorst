

export const isNull = value=>value === null;
export const isUndefined = value=>value === void 0;
export const isNullorUndefined = value=>(
    isNull(value) || isUndefined(value)
);
export const isRegExp = obj=>(
    modules.typeof(obj) === "regexp"
);
export const isObject = value=>{
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
