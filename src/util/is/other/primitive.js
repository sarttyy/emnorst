
import { isNullLike } from "./null-like.js";

export const isPrimitive = (value) => {
    const type = typeof value;
    return isNullLike(value)
        || type === "string"
        || type === "number"
        || type === "boolean"
        || type === "bigint"
        || type === "symbol";
};
