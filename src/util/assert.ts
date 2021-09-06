interface Asserts {
    type<T>(v: unknown): asserts v is T;
    nonNullable<T>(v: T): asserts v is NonNullable<T>;
}

export const assert: Asserts = {
    type() {
        // eslint-disable-next-line no-console
        console.assert(arguments.length === 1);
    },
    nonNullable(v) {
        // eslint-disable-next-line no-console
        console.assert(v != null, "%o", v);
    },
};
