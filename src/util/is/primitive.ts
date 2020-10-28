
import primitiveTypeTable from "../standard/primitive-type-table.json";

type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * Determine if the value type is string, number, bigint, boolean, symbol, null, undefined.
 * @param value
 */
export const isPrimitive = (value: unknown): value is Primitive => (
    value == null || typeof value in primitiveTypeTable
);
