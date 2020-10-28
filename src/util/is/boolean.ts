
export const isBoolean = (value: unknown): value is boolean | Boolean => (
    typeof value === "boolean" || value instanceof Boolean
);
