import { isPrimitive } from "./primitive";
import type { WeakMeta } from "./types";

const PRIMITIVE_STRING_TAG_TABLE = {
    string: "String",
    number: "Number",
    bigint: "BigInt",
    boolean: "Boolean",
    symbol: "Symbol",
    undefined: "Undefined",
} as const;

type StringTag = WeakMeta<string, "stringTag">;

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

// プリミティブ型はキャッシュしないため空の状態でマッチすることはない。
let prevInput: unknown;
let prevResult: string;

export type ToStringTag<T> = object extends T ? StringTag // any | unknown
    : T extends object ? ObjectToStringTag<T>
    : PrimitiveToStringTag<T>;

/**
 * Use `Object.prototype.toString` to get the value type.
 *
 * @see {@link typeOf}
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const toStringTag = <T>(value: T): ToStringTag<T> => {
    const inputType = typeof value;
    if(inputType in PRIMITIVE_STRING_TAG_TABLE) {
        // プリミティブ型ならテーブルを使用
        return PRIMITIVE_STRING_TAG_TABLE[
            inputType as Exclude<typeof inputType, "object" | "function">
        ] as ToStringTag<T>;
    }

    if(prevInput === value) return prevResult as ToStringTag<T>;

    prevInput = value;
    prevResult = objectPrototypeToString.call(value).slice(8, -1);
    return prevResult as ToStringTag<T>;
};

export type TypeOf<T> = object extends T ? StringTag // any | unknown
    : T extends object ? ObjectToStringTag<T>
    : Lowercase<PrimitiveToStringTag<T>>;

/**
 * if null, returns "null".
 * if primitive, use typeof operator to get the type.
 * if {@link toStringTag}(value) same "Object" and `value.constructor.name` isn't empty,
 * return `value.constructor.name`.
 * else, same as {@link toStringTag}.
 *
 * @see {@link toStringTag}
 * @param value Value to get the type
 * @returns String of type of {@link value}
 */
export const typeOf = <T>(value: T): TypeOf<T> => {
    if(value === null) {
        return "null" as TypeOf<T>;
    }

    if(isPrimitive(value)) {
        return typeof value as TypeOf<T>;
    }

    if(toStringTag(value) === "Object") {
        const ctorName: unknown = (value as unknown as object).constructor?.name;
        if(typeof ctorName === "string" && ctorName) {
            return ctorName as TypeOf<T>;
        }
    }

    return prevResult as TypeOf<T>;
};
