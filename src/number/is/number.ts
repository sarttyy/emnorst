
export const isNumber = (value: unknown): value is number | Number => (
    typeof value === "number" || value instanceof Number
) && value == +value; // eslint-disable-line eqeqeq
