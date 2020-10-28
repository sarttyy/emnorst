
import { typeOf } from "../../util/standard/type-of";

/**
 * @param value
 */
export const isPureObject = (value: any): boolean => (
    typeOf(value) === "Object" && value.constructor === Object
);
