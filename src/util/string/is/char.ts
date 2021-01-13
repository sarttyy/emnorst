
import type { Opaque } from "../../standard/opaque";
import { isString } from "./string";

export const isChar = (value: unknown): value is Opaque<string | String, {len:1}> => (
    isString(value) && value.length === 1
);
