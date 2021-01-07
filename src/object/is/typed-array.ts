
import { typeOf } from "util/standard/type-of";
import { TypedArray } from "../standard/typed-array";

const regexp = /^(?:Uin|In|Floa)t(?:8|16|32|64)(?:Clamped)?Array$/;

export const isTypedArray = (value: unknown): value is TypedArray => (
    regexp.test(typeOf(value))
);
