
// @ts-check

import { each } from "../../utility/loop/each";
import { splice } from "../../utility/getIndex";

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
        if(~value.indexOf(str))return;
        while(~string.indexOf(str))
            string = string.replace(str, value);
    });
    return string;
};
