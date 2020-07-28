
import { typeOf } from "../../typeof.js";

export const isPureObject = (value) => (
    typeOf(value) === "Object" && value.constructor === Object
);
