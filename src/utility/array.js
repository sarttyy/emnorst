
import { isObject } from "./is/index";
import { forOf } from "./loop/index";

const own = value=>value;

const bind = (func, ...args)=>arg=>func(arg, ...args);

export const gurop = (array, func=own)=>{
    const gurops = {};
    forOf(array, value=>{
        /*
        IDEA: fの返り値: {gurupName1:{value}}
        */
        const entry = func(value);
        const entries = isObject(entry)
            ? Object.entries(entry)
            : [[entry, value]];
        forOf(entries, ([key, value])=>{
            if(!gurops[key])gurops[key] = [];
            gurops[key].push(value);
        });
    });
    return gurops;
};
// export const partition = (array, func)=>{};
// INFO: findのマッチした数版
export const count = (array, func)=>{
    let match = 0;
    forOf(array, (value)=>{
        match += Boolean(func(value));
    });
    return match;
};

export const generate = (generator, func, that)=>{
    let done;
    do{
        const result = generator.next();
        ({done} = result);
        func.call(that, result.value);
    }while(!done);
};
export const generator = ()=>{};

export const reduce = (array, func, defaultValue, that)=>{
    // {value: undefined, done: false}
};

// export const map = (array, func)=>{
//     array.flatMap(value=>func([value]));
// };
