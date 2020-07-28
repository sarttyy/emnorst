
import { isFunction } from "../other/function.js";
import { isObject } from "./object.js";

export const isObjectLike = (value) => (
    isObject(value) || isFunction(value)
);
