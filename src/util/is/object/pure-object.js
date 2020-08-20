
import { typeOf } from "../../standard/type-of.js";

export const isPureObject = (value) => (
    typeOf(value) === "Object" && value.constructor === Object
);
