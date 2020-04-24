
import {isArrayLike} from "./is";

const own = value=>value;

export const gurop = (array, func=own)=>{
    const gurops = {};
    forOf(array, value=>{
        const temp = func(value);
        let key;
        if(isArrayLike(temp))
            [key, value=value] = temp;
        else key = temp;
        if(!gurops[key])gurops[key] = [];
        gurops[key].push(value);
    });
    return gurops;
};
// export const partition = (array, func)=>{};
// INFO: findのマッチした数版
export const count = (array, func)=>{
    let match = 0;
    for(const value of array)
        match += Boolean(func(value));
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
