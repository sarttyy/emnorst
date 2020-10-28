
/**
 * Whether typeof is an object and is not Null
 */
export const isObject: {
    (value: Function): value is never;
    (value: unknown): value is object;
} = (value: unknown): value is never => (
    typeof value === "object" && value !== null
);
