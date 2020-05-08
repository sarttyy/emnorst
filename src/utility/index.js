
export * from "./array";
export * from "./condition";
export * from "./generator";
export * from "./getIndex";
export * from "./is/index";
export * from "./loop/index";
export * from "./range";
export * from "./rondom";
export * from "./thinning";
export * from "./typeof";
export * from "./utility";
export * from "./zip";

import { forIndex } from "./loop/index";
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

export const memoize = (func, effective=Infinity)=>{
    const newFunc = function(){
        const prevResult = forOf(newFunc.memo, (fragment, result)=>{
            if(deepEquals(fragment))
                return result;
            return void 0;
        });
        if(isUndefined(prevResult))
            return prevResult;
        // eslint-disable-next-line prefer-rest-params
        const result = func.apply(this, arguments);
        newFunc.memo.set(arguments, result);
        return result;
    };
    if(Array.isArray(effective)){
        newFunc.memo = new Array(effective.length);
        forIndex(effective.length, i=>{
            newFunc.memo[i] = new Map(effective[i]);
        });
    }else{
        const length = substitute([effective,1], v=>!Number.isFinite(v));
        newFunc.memo = new Array(length);
        forIndex(length, i=>{
            newFunc.memo[i] = new Map();
        });
    }
    return newFunc;
};

export class MemoMap {
    constructor(initValue){
        this.map = new Map(initValue);
    }
}

// MEMO: ifs スタック
