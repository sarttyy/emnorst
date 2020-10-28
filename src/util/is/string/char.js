
import { isString } from "./string.js";

export const isChar = (value) => (
    isString(value) && value.length === 1
);
