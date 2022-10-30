/**
 * Constraint type in template literal.
 *
 * @example
 * ```ts
 * type Foo<T extends TemplateLiteralConstraint> = `${T}`;
 * ```
 */
export type TemplateLiteralConstraint = string | number | bigint | boolean | null | undefined;

/**
 * @example
 * ```ts
 * type Type = SplitString<"foo,bar,baz", ",">;
 * // ["foo", "bar", "baz"]
 * ```
 */
export type SplitString<T extends string, Separator extends TemplateLiteralConstraint> = (
    T extends `${infer U}${Separator}${infer Rest}`
        ? [U, ...SplitString<Rest, Separator>]
        : [T]
);

/**
 * @example
 * ```ts
 * type Type = JoinString<["foo", "bar", "baz"], ",">;
 * // "foo,bar,baz"
 * ```
 */
export type JoinString<T extends readonly TemplateLiteralConstraint[], Separator extends TemplateLiteralConstraint> = (
    T extends readonly [
        infer U extends TemplateLiteralConstraint,
        ...infer Rest extends readonly TemplateLiteralConstraint[],
    ]
        ? Rest extends readonly [unknown, ...unknown[]]
            ? `${U}${Separator}${JoinString<Rest, Separator>}`
            : U
    : ""
);
