
import type { Meta } from "../../standard/types";
import { isString } from "./string";

export const isChar = (value: unknown): value is Meta<string | String, {len:1}> => (
    isString(value) && value.length === 1
);
