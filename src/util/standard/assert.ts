
export namespace assert {
    export declare function type<T>(v: unknown): asserts v is T;
    export declare function nonNullable<T>(v: T): asserts v is NonNullable<T>;
}
