
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
    if(prev === value) return result;

    const type = typeof value;
    result = (type in primitiveTable
        ? primitiveTable[type as keyof typeof primitiveTable]
        : toString.call(value).slice(8, -1)
    );
    prev = value;

    return result;
};


/**
 * if null, returns "null".
 * if primitive, use typeof to get the type.
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
