
import { typeOf } from "../../typeof.js";

export const isArray = (value) => (
    typeOf(value) === "Array"
);
