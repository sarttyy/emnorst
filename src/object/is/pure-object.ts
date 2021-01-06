
import { typeOf } from "util/standard/type-of";

/**
 * @param value
 */
export const isPureObject = (value: unknown): boolean => (
    typeOf(value) === "Object" && value.constructor === Object
);
