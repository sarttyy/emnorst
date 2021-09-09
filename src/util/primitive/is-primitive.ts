import { Primitive, table } from "./base";

/**
 * Determine if the value type is string, number, bigint, boolean, symbol, null, undefined.
 */
export const isPrimitive = (value: unknown): value is Primitive =>
    value == null || typeof value in table;
