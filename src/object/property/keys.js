
// @ts-check

import { has } from "./has.js";

/**
 * @param {object[]} objs
 * @return {string[]}
 */
export const getKeys = (...objs) => {
    const result = [];
    for(let i = 0;i < objs.length;i++) {
        for(const key in objs[i]) {
            has(objs[i], key)
            && ~result.indexOf(key)
            || result.push(key);
        }
    }
    return result;
};
