
// @ts-check

import { has } from "./has";

/**
 * @param {object} obj
 * @return {string[]}
 */
export const getKeys = (obj) => {
    const result = [];
    for(const key in obj)
        has(obj, key) && result.push(key);
    return result;
};
