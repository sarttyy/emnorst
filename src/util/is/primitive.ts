
import { table as primitiveTypeTable, Primitive } from "../standard/primitive";

/**
 * Determine if the value type is string, number, bigint, boolean, symbol, null, undefined.
 * @param value
 */
export const isPrimitive = (value: unknown): value is Primitive => (
    value == null || typeof value in primitiveTypeTable
);
