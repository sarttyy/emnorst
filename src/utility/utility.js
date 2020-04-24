
import {isNull} from "./is";

export const equals = (...values)=>{
    // SameValueZero
    let prev = values.shift();
    return values.every(value=>(
        Number.isNaN(prev)
            ? Number.isNaN(prev=value)
            : prev===(prev=value)
    ));
};

export const typeOf = object=>(
    Object.prototype.toString.call(object).slice(8, -1)
);

// TODO: require

export const tryCall = (value, args, that)=>(
    typeof value === "function"
        ? value.apply(that, args)
        : value
);

export const substitute = (values, checkFunk=isNull)=>(
    values.reduce((value, subValue)=>(
        checkFunk(value) ? subValue : value
    ), values.shift())
);

export const typeCheck = (value, types, sub, typeGetter=typeOf)=>{
    const type = typeGetter(value);
    if(types.includes(type))
        return value;
    return tryCall(sub, [type]);
};

export const debounce = (func, wait)=>{
    let id;
    return function(){
        clearTimeout(id);
        // eslint-disable-next-line
        id = setTimeout(func.apply, wait, this, arguments);
    };
};

export const prop = (props, defaultProps, subFunc)=>(
    Object.entries(props).reduce((props_, [prop, key])=>{
        props_[key] = substitute([prop, defaultProps[key]], subFunc);
        return props_;
    })
);

export const uniq = array=>{
    const existings = [];
    return array.filter(value=>{
        const existing = existings.includes(value);
        if(!existing)existings.push(value);
        return !existing;
    });
};
