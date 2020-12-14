
export const isString = (value: unknown): value is string | String => (
    typeof value === "string" || value instanceof String
);
