
interface IsObject {
    (value: Function): value is never;
    (value: any): value is object;
}

/**
 * Whether typeof is an object and is not Null
 */
export const isObject: IsObject = (value: any): value is never => (
    typeof value === "object" && value !== null
);
