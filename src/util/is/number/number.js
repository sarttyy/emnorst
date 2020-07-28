
export const isNumber = (value) => (
    typeof value === "number" || value instanceof Number
) && !isNaN(value);
