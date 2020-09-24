
import { base64Encode } from "./encode";
import { base64Decode } from "./decode";

export const BASE64 = {
    encode: base64Encode,
    decode: base64Decode,
    [Symbol.toStringTag]: "BASE64"
} as const;
