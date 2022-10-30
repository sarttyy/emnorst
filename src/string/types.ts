/**
 * Constraint type in template literal.
 *
 * @example
 * ```ts
 * type Foo<T extends TemplateLiteralConstraint> = `${T}`;
 * ```
 */
export type TemplateLiteralConstraint = string | number | bigint | boolean | null | undefined;
