
export * from "./is";
export * from "./loop";
export * from "./equals";
export * from "./generator";
import * as is from "./is";
// TEMP:
// export class ArrayLike extends Array {
//     constructor(){
//         super();
//         console.log(this);
//     }
// }
// export class Temp {
//     constructor(){
//         this.gen = this.gen.bind(this);
//         return this.gen;
//     }
//     gen(){
//         console.log(this);
//         return this.gen;
//     }
// }
// export class Memo {
//     constructor(func){
//         this.function = func;
//         this.existing = new Map();
//     }
//     execute(args){
//         if(this.existing.has(args))
//             return this.existing.get(args);
//         const result = execute(this.function, args);
//         this.existing.set(args, result);
//         return result;
//     }
// }
// String instruction
export const execute = (func, args)=>func.apply(null, args);
export const typeOf = object=>(
    Object.prototype.toString.call(object).slice(8, -1)
);
// TODO: require
export const substitute = (value, substitute)=>(
    is.isNull(value)
        ? substitute
        : value
);
export const tryCall = (value, args, that=null)=>(
    typeof value === "function"
        ? value.apply(that, args)
        : value
);
// export const and = (...arrays)=>{}
// export const xor = (...arrays)=>{}
export const debounce = (func, wait)=>{
    let id;
    return function(){
        clearTimeout(id);
        id = setTimeout(func.apply, wait, this, arguments);
    }
};
export const uniq = array=>{
    const existings = [];
    return array.filter(value=>{
        const existing = existings.includes(value);
        if(!existing)existings.push(value);
        return !existing;
    });
};
