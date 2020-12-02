
import primitiveTable from "./primitive-type-table.json";

const { toString } = Object.prototype;

let prev: unknown = NaN, result: string;

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param value Value to get the type
 * @return String of type
 */
export const typeOf = (value: unknown): string => {
    const type = typeof value;
    if(type in primitiveTable) {
        return primitiveTable[type as keyof typeof primitiveTable];
    }

    if(prev === value) return result;

    prev = value;
    result = toString.call(value).slice(8, -1);
    return result;
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

    const type = typeof value;
    return (type in primitiveTable
        ? type : typeOf(value)
    );
};
