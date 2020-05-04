
import { isFunction, isNull } from "./is/index";
import { typeOf } from "./typeof";

// TODO: コールバック関数のthisを指定できる高階関数のthatの指定の仕方を変更。
// 高階関数自体のthisを継承する。
// f(that) => f.call(that)

/**
 * Executes the function if the value is a function, otherwise returns the value
 *
 * NOTE: tryCall
 * @param {*} value The value to be executed if it was a function
 * @param {*[]} [args] Argument when the value is a function
 * @return {*} The return value of the function if the value is a function, otherwise the value
 */
export const callorElse = function(value, ...args){
    return isFunction(value)
        ? value.apply(this, args)
        : value;
};

/**
 * Returns the first found value. If not found, it returns the last value.
 * \n値の中で最初に見つかった値を返します。見つからない場合、最後の値を返します。
 *
 * @param {*[]} values Value and alternate value. Higher priority to the left
 * @param {Function} evalFunc
 * A function that evaluates a value. Returning a true value is considered an invalid value.
 * 値を評価する関数。trulyな値を返すと無効な値とみなされる
 */
export const substitute = (values, evalFunc=isNull)=>(
    values.reduce((value, subValue)=>(
        evalFunc(value) ? subValue : value
    ), values.shift())
);

/**
 * Beta:
 * @param {*} value
 * @param {*} types
 * @param {*} sub
 * @param {*} typeGetter
 */
export const typeCheck = (value, types, sub, typeGetter=typeOf)=>{
    const type = typeGetter(value);
    if(types.includes(type))
        return value;
    return callorElse(sub, [type]);
};

/**
 * Beta:
 * @param {*} props
 * @param {*} defaultProps
 * @param {*} subFunc
 */
export const prop = (props, defaultProps, subFunc)=>(
    Object.entries(props).reduce((props_, [prop, key])=>{
        props_[key] = substitute([prop, defaultProps[key]], subFunc);
        return props_;
    })
);
