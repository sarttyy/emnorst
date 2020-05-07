
import env from "../../env";
import { isArrayLike, isFunction, isNull, isString } from "../is/index";

/**
 * 何でもループ`できるようにする`やつ
 * @template T
 * @param {Iterable<T>} iterable
 * @return {Iterator<T, null>}
 * @throws {TypeError}
 */
export const iterate = (iterable)=>{
    if(env.Symbol && isNull(iterable[Symbol.iterator])){
        const Symbol_iterator = iterable[Symbol.iterator]
            ? Symbol.iterator
            : "Symbol.iterator";
        return iterable[Symbol_iterator]();
    }
    if(!isArrayLike(iterable) && !isString(iterable)){
        if(isFunction(iterable["Symbol.iterator"]))
            // eslint-disable-next-line new-cap
            return iterable["Symbol.iterator"]();
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    let i = 0;
    return { next: ()=>(i >= iterable.length ? {
        done: true,
        value: null
    } : {
        done: false,
        value: iterable[i++]
    }) };
};
