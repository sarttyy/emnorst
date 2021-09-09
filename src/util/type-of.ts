import type { WeekMeta } from "./meta-type";
import { table as primitiveTable } from "./primitive/base";

type StringTag = WeekMeta<string, "stringTag">;

type PrimitiveToStringTag<T> = (
    T extends string ? "String"
    : T extends number ? "Number"
    : T extends bigint ? "BigInt"
    : T extends boolean ? "Boolean"
    : T extends symbol ? "Symbol"
    : T extends null ? "Null"
    : T extends undefined | void ? "Undefined"
    : never
);

type ObjectToStringTag<T extends object> = (
    T extends readonly unknown[] ? "Array"
    : RegExp extends T ? "RegExp"
    : StringTag
);

// eslint-disable-next-line @typescript-eslint/unbound-method
const objectPrototypeToString: (this: unknown) => string = Object.prototype.toString;
let prevInput: unknown = NaN; // 最初の`===`の比較でfalseになるように。
let prevResult: string;

type ToStringTag<T> = object extends T ? StringTag // any | unknown
    : T extends object ? ObjectToStringTag<T>
    : PrimitiveToStringTag<T>;

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const toStringTag = <T>(value: T): ToStringTag<T> => {
    const inputType = typeof value;
    if(inputType in primitiveTable) {
        // プリミティブ型ならテーブルを使用
        return primitiveTable[inputType as keyof typeof primitiveTable] as ToStringTag<T>;
    }

    if(prevInput === value) return prevResult as ToStringTag<T>;

    prevInput = value;
    prevResult = objectPrototypeToString.call(value).slice(8, -1);
    return prevResult as ToStringTag<T>;
};

type TypeOf<T> = object extends T ? StringTag // any | unknown
    : T extends object ? ObjectToStringTag<T>
    : Lowercase<PrimitiveToStringTag<T>>;

/**
 * if null, returns "null".
 * if primitive, use typeof operator to get the type.
 * if {@link toStringTag}(value) same "Object" and `value.constructor.name` isn't empty,
 * return `value.constructor.name`.
 * else, same as toStringTag.
 *
 * @see {@link toStringTag}
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const typeOf = <T>(value: T): TypeOf<T> => {
    if(value === null) {
        return "null" as TypeOf<T>;
    }

    const inputType = typeof value;
    if(inputType in primitiveTable) {
        return inputType as TypeOf<T>;
    }

    const ctor = typeOf(value) === "Object"
        && (value as unknown as object).constructor;
    return ((ctor && ctor.name) || prevResult) as TypeOf<T>;
};
