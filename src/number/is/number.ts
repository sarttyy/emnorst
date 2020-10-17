
export const isNumber = (value: any): value is number | Number =>  (
    typeof value === "number" || value instanceof Number
) && value == +value; // eslint-disable-line no-self-compare
