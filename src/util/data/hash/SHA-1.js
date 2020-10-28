
// @ts-check

import { hashCore } from "./core.js";
import { fromBigEndian32, toBigEndian32, padding } from "./lib.js";

const K = [0x5a827999 , 0x6ed9eba1 , 0x8f1bbcdc , 0xca62c1d6];
const initState = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

const rotl = (v, s) => (v << s) | (v >>> (32 - s));

const $ = (data, state) => {
    const stateRef = [...state];
    for(let j = 16;j < 80;j++)
        data[j] = rotl(data[j-3] ^ data[j-8] ^ data[j-14] ^ data[j-16], 1);
    for(let index = 0;index < 80;index++) {
        const [s0, s1, s2, s3, s4] = state;
        const _1
            = index < 20 ? ((s1 & s2) ^ (~s1 & s3)) + K[0]
            : index < 40 ? (s1 ^ s2 ^ s3) + K[1]
            : index < 60 ? ((s1 & s2) ^ (s1 & s3) ^ (s2 & s3)) + K[2]
            : (s1 ^ s2 ^ s3) + K[3];
        state[1] = rotl(s1, 30);
        state.unshift(_1 + rotl(s0, 5) + data[index] + s4);
        state.pop();
    }
    for(let i = 0;i < 5;i++)
        state[i] += stateRef[i];
};

const hashSHA1 = (data) => {
    const { length } = data;
    padding(data);
    data.push(0, 0, 0, 0);
    fromBigEndian32([length * 8], data);
    const state = [...initState];
    for(let i = 0;i < data.length;i += 64)
        $(toBigEndian32(data, i), state);
    return fromBigEndian32(state);
};

/**
 * SHA-1
 * @param {string} data
 * @param {{format?: "hex" | "binary" | "dec"}} [props]
 */
export const sha1 = (data, props={}) => hashCore(hashSHA1, data, props);
