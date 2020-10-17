
export const isBoolean = (value: any): value is boolean | Boolean =>  (
    typeof value === "boolean" || value instanceof Boolean
);
