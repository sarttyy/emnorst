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

export type ToStringTag<T> = object extends T ? StringTag // any | unknown
    : T extends object ? ObjectToStringTag<T>
    : PrimitiveToStringTag<T>;

/**
 * Use `Object.prototype.toString` to get the value type.
 */
export const toStringTag = <T>(value: T): ToStringTag<T> => {
    const inputType = typeof value;
    if(inputType in PRIMITIVE_STRING_TAG_TABLE) {
        // プリミティブ型ならテーブルを使用
        return PRIMITIVE_STRING_TAG_TABLE[
            inputType as Exclude<typeof inputType, "object" | "function">
        ] as ToStringTag<T>;
    }

    return objectPrototypeToString.call(value)
        .slice(8, -1) as ToStringTag<T>;
};

/**
 * if null, return "null".
 * if primitive, use the `typeof` operator to get the type.
 * if {@link toStringTag}(value) is "Object" and `value.constructor.name` isn't empty,
 * return it.
 * otherwise, same as {@link toStringTag}.
 *
 * @see {@link toStringTag}
 */
export const typeOf = (value: unknown): string => {
    if(value === null) {
        return "null";
    }

    if(isPrimitive(value)) {
        return typeof value;
    }

    const stringTag = toStringTag(value);
    if(stringTag === "Object") {
        const ctorName: unknown = (value as unknown as object).constructor?.name;
        if(typeof ctorName === "string" && ctorName) {
            return ctorName;
        }
    }

    return stringTag;
};
