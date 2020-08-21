
import { typeOf } from "../../standard/type-of.js";

export let isArray = Array.isArray;

if(typeof isArray !== "function") {
    isArray = (value) => typeOf(value) === "Array";
}
