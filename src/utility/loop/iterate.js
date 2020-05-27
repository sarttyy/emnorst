
// @ts-check

import env from "../../env.js";
import { isArrayLike } from "../../util/is/util.js";
import { isNullLike } from "../../util/is/type.js";

/**
 * iterableなオブジェクトをiteratorに変換します。
 * @template T
 * @param {Iterable<T>} iterable
 * @return {Iterator<T, null>}
 * @throws {TypeError}
 */
export const iterate = (iterable)=>{
    if(env.Symbol && !isNullLike(iterable[Symbol.iterator]))
        return iterable[Symbol.iterator]();
    if(!isArrayLike(iterable))
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    let i = 0;
    return { next: ()=>(i >= iterable.length ? {
        done: true,
        value: null
    } : {
        done: false,
        value: iterable[i++]
    }) };
};

/**
 * @param {Iterable} iterable
 * @param {function} func
 */
const iterableMap = (iterable, func)=>{
    const iterator = iterate(iterable);
    return { [Symbol.iterator]:()=>({
        next(){
            const iterResult = iterator.next();
            if(!iterResult.done)
                iterResult.value = func(iterResult.value);
            return iterResult;
        }
    }) };
};
