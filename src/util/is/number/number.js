
export const isNumber = (value) => (
    typeof value === "number" || value instanceof Number
) && value === value; // eslint-disable-line no-self-compare
