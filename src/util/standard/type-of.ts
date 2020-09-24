
import primitiveTypeTable from "./primitive-type-table.json";

const { toString } = Object.prototype;

let prev: any = NaN, result: string;

// `Object.prototype.toString`を使用して値の型を取得します。

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param value Value to get the type
 * @return String of type
 */
export const typeOf = (value: any): string => {
    if(prev === value)
        return result;

    const type = typeof value;
    result = (type in primitiveTypeTable
        ? primitiveTypeTable[type]
        : toString.call(value).slice(8, -1)
    );
    prev = value;

    return result;
};
