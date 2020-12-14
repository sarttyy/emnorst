
const { hasOwnProperty } = Object.prototype;

export const has = (obj: object, propKey: PropertyKey): boolean => (
    obj != null && hasOwnProperty.call(obj, propKey)
);

import { Path, get, parseStringPath } from "./path";
import { isArray } from "../is/array";

export const HAS = (obj: object, path: Path): boolean => {
    if(typeof path === "string") path = parseStringPath(path);
    if(!isArray(path)) return has(obj, path);
    const last = path.pop();
    obj = get(obj, path, 1);
    return obj != null && has(obj, last!);
};

export const IN = (obj: object, path: Path): boolean => {
    if(typeof path === "string") path = parseStringPath(path);
    if(!isArray(path)) return path in obj;
    const last = path.pop();
    obj = get(obj, path, 0);
    return obj != null && last! in obj;
};
