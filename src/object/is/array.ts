
import { typeOf } from "../../util/standard/type-of";

export let isArray = Array.isArray;

if(typeof isArray !== "function") {
    isArray = (value): value is any[] => typeOf(value) === "Array";
}
