type RecurseSub<T, K extends string> =
    T extends { [P in K]: never } ? never
    : T extends { [P in K]: { [P in K]: infer U } } ? { [P in K]: RecurseSub<U, K> }
    : T extends { [P in K]: infer U } ? U
    : T;

export type Recurse<T, K extends string = "__rec"> =
    T extends { [P in K]: unknown } ? Recurse<RecurseSub<T, K>> : T;

export type Repeat<T, U extends number, V extends unknown[] = []> =
    V["length"] extends U ? V : Repeat<T, U, [...V, T]>;
