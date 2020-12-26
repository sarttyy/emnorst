
import { base64Table } from "./table";

const MASK = 0x3f;

/**
 * Convert the data to base64.
 *
 * @param data
 * @return base64 string.
 */
export const base64Encode = (data: ArrayLike<number> | ArrayBufferLike): string => {
    const arr = new Uint8Array(data);
    const rest = arr.byteLength % 3;

    const limit = arr.byteLength - rest;
    let base64String = "", i = 0;
    while(i < limit) {
        const cluster = (arr[i++] << 16) | (arr[i++] << 8) | arr[i++];
        base64String += (
            base64Table[cluster >> 18 & MASK]
            + base64Table[cluster >> 12 & MASK]
            + base64Table[cluster >> 6 & MASK]
            + base64Table[cluster & MASK]
        );
    }

    if(rest === 1) {
        const cluster = arr[i];
        base64String += (
            base64Table[cluster >> 2 & MASK]
            + base64Table[cluster << 4 & MASK]
            + "=="
        );
    } else if(rest === 2) {
        const cluster = (arr[i++] << 8) | arr[i];
        base64String += (
            base64Table[cluster >> 10 & MASK]
            + base64Table[cluster >> 4 & MASK]
            + base64Table[cluster << 2 & MASK]
            + "="
        );
    }

    return base64String;
};
