
// @ts-check

import { each } from "./loop/each";
import { splice } from "./getIndex";

/**
 * @param {string} string
 * @param {*} placeholders
 * @param {[string, string]} affix
 * @example
 * format("{test}", { test: "value" });
 * // => "value"
 */
export const format = (string, placeholders, affix=["{", "}"])=>{
    each(placeholders, (value, key)=>{
        const str = splice(affix, 1, 0, key).join("");
        while(string.indexOf(str) !== -1)
            string = string.replace(str, value);
    });
    return string;
};
