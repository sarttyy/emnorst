
import { isFunction } from "../../util/is/other/function";
import { isObject } from "./object";

export const isObjectLike = (value: any): value is object => (
    isObject(value) || isFunction(value)
);
