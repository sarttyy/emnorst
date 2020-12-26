
import { base64Table } from "./table";

const MASK = 0xff;
const convert = base64Table.indexOf.bind(base64Table);

/**
 * Convert base64 to data.
 *
 * @param base64String base64 string.
 * @return
 */
export const base64Decode = (base64String: string): Uint8Array => {
    const length = base64String.length;
    const fill = base64String[length-2] === "=" ? 2
        : base64String[length-1] === "=" ? 1 : 0;
    const size = length - fill;
    const arr = new Uint8Array(size / 4 * 3);

    const limit = size ^ size & 3;
    let i = 0, j = 0;
    while(i < limit) {
        // 0b111111 * 4
        const cluster = (
            convert(base64String[i++]) << 18
            | convert(base64String[i++]) << 12
            | convert(base64String[i++]) << 6
            | convert(base64String[i++])
        );

        // 0b11111111 * 3
        arr[j++] = cluster >> 16 & MASK;
        arr[j++] = cluster >> 8 & MASK;
        arr[j++] = cluster & MASK;
    }

    if(fill === 1) {
        const cluster = (
            convert(base64String[i++]) << 12
            | convert(base64String[i++]) << 6
            | convert(base64String[i++])
        );
        arr[j++] = cluster >> 10 & MASK;
        arr[j++] = cluster >> 2 & MASK;
        arr[j++] = cluster & 0b11;
        // data[j++] = cluster << 6 & MASK;
    } else if(fill === 2) {
        const cluster = (
            convert(base64String[i++]) << 6
            | convert(base64String[i++])
        );
        arr[j++] = cluster >> 4 & MASK;
        arr[j++] = cluster & 0b1111;
        // data[j++] = cluster << 4 & MASK;
    }

    return arr;
};
