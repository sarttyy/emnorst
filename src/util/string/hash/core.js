
// @ts-check

import { isArray, isString } from "../../is/type.js";
import { foldLeft } from "../../../utility/loop/fold.js";

const unpack = (text) => {
    const result = new Array(text.length);
    for(let index = 0, n = 0;index < text.length;index++) {
        const charCode = text.charCodeAt(index);
        if(charCode > 0xff) {
            result[n++] = charCode >>> 8;
            result[n++] = charCode & 0xff;
        }else result[n++] = charCode;
    }
    return result;
};

/**
 * @param {function(number[]): number[]} hash
 * @param {string | number[]} data
 * @param {*} props
 */
export const hashCore = (hash, data, props={}) => {
    const temp
        = isArray(data) ? [...data]
        : isString(data) ? unpack(data)
        : [];
    const hashedData = hash(temp);
    switch(props.format) {
    default:
    case "hex":
        return foldLeft(hashedData, (hex, current)=>(
            hex + (current > 0xf ? "" : "0") + current.toString(16)
        ), "");
    case "bin":
        return String.fromCharCode(...hashedData);
    case "dec":
        return hashedData;
    }
};
