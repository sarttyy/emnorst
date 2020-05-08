
import env from "../../env";
import { isArrayLike, isFunction, isNullable } from "../is/index";

/**
 * iterableなオブジェクトをiteratorに変換します。
 * @template T
 * @param {Iterable<T>} iterable
 * @return {Iterator<T, null>}
 * @throws {TypeError}
 */
export const iterate = (iterable)=>{
    if(env.Symbol && !isNullable(iterable[Symbol.iterator]))
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
