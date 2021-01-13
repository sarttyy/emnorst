
import { table as primitiveTable } from "./primitive";

const { toString } = Object.prototype;

let prevInput: unknown = NaN, prevResult: string;

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param value Value to get the type
 * @return String of type
 */
export const typeOf = (value: unknown): string => {
    const inputType = typeof value;
    if(inputType in primitiveTable) {
        return primitiveTable[inputType as keyof typeof primitiveTable];
    }

    if(prevInput === value) return prevResult;

    prevInput = value;
    prevResult = toString.call(value).slice(8, -1);
    return prevResult;
};

/**
 * if typeOf(value) same "Object" and `value.constructor.name` isn't empty, return `value.constructor.name`.
 * else, same as typeOf.
 *
 * @see {@link typeOf}
 * @param value Value to get the type
 * @return String of type
 */
export const getType = (value: unknown): string => {
    const ctor = (
        typeOf(value) === "Object"
        && (value as object).constructor
    );
    return (ctor && ctor.name) || prevResult;
};

/**
 * if null, returns "null".
 * if primitive, use typeof operator to get the type.
 * else, same as typeOf.
 *
 * @see {@link typeOf}
 * @param value Value to get the type
 * @return String of type
 */
export const getTypeOf = (value: unknown): string => {
    if(value === null) return "null";

    const inputType = typeof value;
    return (inputType in primitiveTable
        ? inputType : typeOf(value)
    );
};
