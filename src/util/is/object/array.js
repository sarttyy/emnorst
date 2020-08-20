
import { typeOf } from "../../standard/type-of.js";

let { isArray } = Array;

if(typeof isArray !== "function") {
    isArray = (value) => typeOf(value) === "Array";
}

export { isArray };
