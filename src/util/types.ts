type RecurseSub<T, K extends string> =
    T extends { [P in K]: never } ? never
    : T extends { [P in K]: { [P in K]: infer U } } ? { [P in K]: RecurseSub<U, K> }
    : T extends { [P in K]: infer U } ? U
    : T;

export type Recurse<T, K extends string = "__rec"> =
    T extends { [P in K]: unknown } ? Recurse<RecurseSub<T, K>> : T;

export type Repeat<T, U extends number, V extends unknown[] = []> =
    V["length"] extends U ? V : Repeat<T, U, [...V, T]>;

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
export type NonUnion<T> = { x: T } extends { x: infer U }
    ? T extends unknown
        ? [U] extends [T] ? T : never
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

export type Callable = (...args: any) => unknown;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | { [key: string]: JsonValue } | JsonValue[];

export type HasMeta<B, M> = { "__?META": [B, M] };
export type Meta<Base, M> = Base & HasMeta<Base, M>;
export type WeakMeta<Base, M> = Base & Partial<HasMeta<Base, M>>;

interface Assert {
    as<T>(value: unknown): asserts value is T;
    nonNullable<T>(value: T): asserts value is NonNullable<T>;
}

export const assert: Assert = {
    as() {
        if(arguments.length === 0) {
            throw new TypeError("1 argument required, but only 0 present.");
        }
    },
    nonNullable(value) {
        if(value == null) {
            throw new TypeError(`nonNullable assertion failed. Must not be ${value}.`);
        }
    },
};
