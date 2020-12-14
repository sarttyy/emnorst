
// @ts-check

import { isString } from "../../string/is/string";
import { isArray } from "../../../object/is/array";

const foldLeft = (hashedData, hexFold, acc="") => {
    for(let i = 0;i < hashedData.length;i++)
        acc = hexFold(acc, hashedData[i]);
    return acc;
};

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

const hexFold = (hex, current) => (
    hex + (current > 0xf ? "" : "0") + current.toString(16)
);

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
        return foldLeft(hashedData, hexFold, "");
    case "bin":
        return String.fromCharCode(...hashedData);
    case "dec":
        return hashedData;
    }
};
