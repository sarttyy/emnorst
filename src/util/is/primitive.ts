
import primitiveTypeTable from "../standard/primitive-type-table.json";

type Primitive = string | number | bigint | boolean | symbol | null | undefined;

export const isPrimitive = (value: any): value is Primitive => (
    value == null || typeof value in primitiveTypeTable
);
