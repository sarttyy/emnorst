type RecurseSub<T> =
    T extends { __rec: never } ? never
    : T extends { __rec: { __rec: infer U } } ? { __rec: RecurseSub<U> }
    : T extends { __rec: infer U } ? U
    : T;

export type Recurse<T> = T extends { __rec: unknown } ? Recurse<RecurseSub<T>> : T;

export type Repeat<T, U extends number, V extends unknown[] = []> =
    V["length"] extends U ? V : Repeat<T, U, [...V, T]>;
