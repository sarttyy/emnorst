
import { Meta } from "util/standard/types";
import { typeOf } from "util/standard/type-of";

/**
 * @param value
 */
export const isPureObject = (value: unknown): value is Meta<object, {pure:true}> => (
    typeOf(value) === "Object" && (value as object).constructor === Object
);
