
/**
 * Whether typeof is an object and is not Null
 *
 * @param {*} value
 * @return {Boolean}
 */
export const isObject = (value) => (
    typeof value === "object" && value !== null
);
