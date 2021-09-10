import { toPrimitive } from "~/util/primitive";

export const toPropertyKey = (value: unknown): PropertyKey => {
    const key = toPrimitive(value, "string");
    return typeof key === "symbol" ? key : String(key);
};
