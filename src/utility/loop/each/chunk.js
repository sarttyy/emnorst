
// @ts-check

import { isFunction } from "../../../util/is/type";
import { assertType } from "../../condition/index";
import { previous } from "../order";

const not = (value)=>(
    isFunction(value)
        ? function(){ return !value.apply(this, arguments); }
        : !value
);

/**
 * @param {string | any[]} array
 * @param {number} size 幾つごとに塊に分けるか
 */
export const chunk = (array, size)=>{
    assertType(array, ["String", "Array"]);
    assertType(size, Number.isSafeInteger);
    let index = 0;
    return previous(Math.ceil(array.length / size), (result)=>{
        result.push(array.slice(index, (index += size)));
    }, []);
};

/**
 * @param {*} array
 * @param {*} count 幾つの塊に分けるか
 */
export const split = (array, count)=>{
    assertType(array, ["String", "Array"]);
    assertType(count, Number.isSafeInteger);
    let extra = array.length % count, index = 0;
    const size = (array.length - extra) / count;
    return previous(count, (result)=>{
        const pad = Number(extra-- > 0);
        const _ = array.slice(index, (index += size + pad));
        result.push(_);
    }, []);
};
