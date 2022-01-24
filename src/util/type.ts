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
 * interface Emittable<T> {
 *     emit<U extends keyof T>(type: NonUnion<U>, x: T[NonUnion<U>]): void;
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
