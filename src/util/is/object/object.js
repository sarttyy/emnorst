
/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether typeof is an object and is not Null
 */
export const isObject = (value) => (
    typeof value === "object" && value !== null
);
