
import { Path, get, parseStringPath } from "./path";
import { isArray } from "../is/array";

/**
 *
 * @param obj
 * @param path
 */
export const property = (obj: object, path: Path): any => {
    if(typeof path === "string") path = parseStringPath(path);
    return isArray(path) ? get(obj, path, 0) : obj[path as never];
};
