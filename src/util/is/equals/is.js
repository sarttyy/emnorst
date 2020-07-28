
// @ts-check

import { equals } from "./equals.js";

/**
 * Object.is
 * @param {*} value1
 * @param {*} value2
 */
export const is = (value1, value2) => (
    value1 === value2
        ? value1 !== 0 || 1 / value1 === 1 / value2
        : equals(value1, value2)
);
