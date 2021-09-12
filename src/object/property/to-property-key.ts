import { toPrimitive } from "~/util/primitive";

export const toPropertyKey = (value: unknown): string | symbol => {
    const key = toPrimitive(value, "string");
    return typeof key === "symbol" ? key : String(key);
};
