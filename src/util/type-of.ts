import { table as primitiveTable } from "./primitive/base";

// eslint-disable-next-line @typescript-eslint/unbound-method
const objectPrototypeToString: (this: unknown) => string = Object.prototype.toString;
let prevInput: unknown = NaN;
let prevResult: string;

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const typeOf = (value: unknown): string => {
    const inputType = typeof value;
    if(inputType in primitiveTable) {
        return primitiveTable[inputType as keyof typeof primitiveTable];
    }

    if(prevInput === value) return prevResult;

    prevInput = value;
    prevResult = objectPrototypeToString.call(value).slice(8, -1);
    return prevResult;
};

/**
 * if null, returns "null".
 * if primitive, use typeof operator to get the type.
 * if typeOf(value) same "Object" and `value.constructor.name` isn't empty,
 * return `value.constructor.name`.
 * else, same as typeOf.
 *
 * @see {@link typeOf}
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const getType = (value: unknown): string => {
    if(value === null) return "null";

    const inputType = typeof value;
    if(inputType in primitiveTable) return inputType;

    const ctor = typeOf(value) === "Object"
        && (value as object).constructor;
    return (ctor && ctor.name) || prevResult;
};
