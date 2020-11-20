
import { isString } from "./string";

export const isChar = (value: unknown): value is string | String => (
    isString(value) && value.length === 1
);
