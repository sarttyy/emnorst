
// @ts-check

import { isFunction } from "../../is/index";
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
    assertType(size, "Number");
    let index = 0;
    return previous(Math.ceil(array.length / size), (result)=>{
        result.push(array.slice(index, (index += size)));
    }, []);
};

/**
 * @param {*} array
 * @param {*} count 幾つの塊に分けるか
 */
export const chunk2 = (array, count)=>{
    assertType(array, ["String", "Array"]);
    assertType(count, "Number");
    let index = 0;
    return previous(Math.ceil(array.length / count), (result)=>{
        result.push(array.slice(index, (index += count)));
    }, []);
};
