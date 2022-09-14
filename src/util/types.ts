type DecimalDigitNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type DecimalDigitTimes<T, U extends DecimalDigitNumber> = {
    0: [];
    1: [T];
    2: [T, T];
    3: [T, T, T];
    4: [T, T, T, T];
    5: [T, T, T, T, T];
    6: [T, T, T, T, T, T];
    7: [T, T, T, T, T, T, T];
    8: [T, T, T, T, T, T, T, T];
    9: [T, T, T, T, T, T, T, T, T];
}[U];

type Repeat10<T extends unknown[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];

type RepeatInternal<T, U extends string, V extends T[]> = (
    U extends `${infer X extends DecimalDigitNumber}${infer Rest}`
        ? { x: [...Repeat10<V>, ...DecimalDigitTimes<T, X>] } extends { x: infer W extends T[] }
            ? Rest extends "" ? W : RepeatInternal<T, Rest, W>
            : never
        : never
);

export type Repeat<T, U extends number> = number extends U ? T[] : RepeatInternal<T, `${U}`, []>;

/**
 * @example
 * type Foo = NonAny<any>;
 * // Foo: never
 * type Bar = NonAny<any, AlternativeType>;
 * // Bar: AlternativeType
 *
 * type NonAnyType = // e.g. unknown, string, etc...
 * type Baz = NonAny<NonAnyType, AlternativeType>;
 * // Baz: NonAnyType
 */
export type NonAny<T, U = never> = [T extends never ? "any" : never] extends [never] ? T : U;

/**
 * @example
 * type Foo = NonNever<never>;
 * // Foo: unknown
 * type Bar = NonNever<never, AlternativeType>;
 * // Bar: AlternativeType
 *
 * type NonNeverType = // Any types except `never`.
 * type Baz = NonNever<NonNeverType, AlternativeType>;
 * // Baz: NonNeverType
 */
export type NonNever<T, U = unknown> = [T] extends [never] ? U : T;

/**
 * @example
 * interface Emittable<T> {
 *     emit<U extends keyof T>(type: NonUnion<U>, payload: T[NonUnion<U>]): void;
 * }
 * declare const emittable: Emittable<{ foo: string, bar: number }>;
 *
 * emittable.emit<"foo">("foo", "hello"); // ok
 * emittable.emit<"foo" | "bar">("foo", 1234); // error!!!
 */
export type NonUnion<T> = IfUnion<T, never, T>;
export type Union<T> = IfUnion<T, T, never>;

export type IfUnion<T, Then, Else> = { x: T } extends { x: infer U }
    ? T extends unknown
        ? [U] extends [T] ? Else : Then
        : never
    : never;

/**
 * @example
 * declare const x: Intersection<A | B | C>;
 * // x: A & B & C
 * @example
 * interface Emittable<T> {
 *     emit<U extends keyof T>(type: U, payload: Intersection<T[U]>): void;
 * }
 * declare const emittable: Emittable<{
 *     foo: { foo: string };
 *     bar: { bar: number };
 * }>;
 *
 * declare const fooOrBar: "foo" | "bar";
 * emittable.emit(fooOrBar, { foo: "hello", bar: 1234 });
 */
export type Intersection<T> = [T] extends [never] ? never :
    [T extends unknown ? (x: T) => void : never] extends [(x: infer U) => void]
        ? U : never;

/**
 * Make all properties in T writable
 */
export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};

/**
 * @example
 * type Foo = Nomalize<{ hoge: string } & { fuga: number }>;
 * // Foo: { hoge: string; fuga: number }
 */
export type Nomalize<T> = T extends unknown ? { [P in keyof T]: T[P] } : never;

/**
 * @example
 * type Foo = NomalizeDeep<{ foo: { hoge: string } } & { foo: { fuga: number } }>;
 * // Foo: { foo: { hoge: string; fuga: number } }
 */
export type NomalizeDeep<T> = T extends unknown ? { [P in keyof T]: NomalizeDeep<T[P]> } : never;

export type Callable = (...args: any) => unknown;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | { [key: string]: JsonValue } | JsonValue[];

interface HasMeta<T> {
    /** @deprecated */
    "__?META": T;
}

export type Meta<T, M> = T & HasMeta<M>;
export type WeakMeta<T, M> = T & (HasMeta<M> | { "__?WEAK_META"?: never });

interface Assert {
    as<T>(value: unknown): asserts value is T;
    nonNullable<T>(value: T): asserts value is NonNullable<T>;
    /**
     * @example
     * switch (action.type) {
     *   // ...
     *   default:
     *     assert.unreachable<typeof action>();
     * }
     */
    unreachable<_ extends never>(message?: string): never;
}

export const assert: Assert = {
    as() {
        if(arguments.length === 0) {
            throw new TypeError("1 argument required, but only 0 present.");
        }
    },
    nonNullable(value) {
        if(value == null) {
            throw new TypeError(`non-nullable assertion failed. Must not be ${value}.`);
        }
    },
    unreachable(message) {
        throw new Error(
            message == null
                ? "Unreachable code was reached."
                : "Unreachable: " + message
        );
    },
};
